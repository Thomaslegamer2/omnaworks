import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { clientById, isAllowedRedirect, type ProductClientId } from "@/lib/auth/clients";

interface SsoCodeRecord {
  code: string;
  userId: string;
  clientId: ProductClientId;
  redirectUri: string;
  createdAt: number;
  used: boolean;
}

interface SsoStoreFile {
  codes: SsoCodeRecord[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const SSO_PATH = path.join(DATA_DIR, "sso-codes.json");
const CODE_TTL_MS = 5 * 60 * 1000;

async function readStore(): Promise<SsoStoreFile> {
  try {
    const raw = await readFile(SSO_PATH, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !Array.isArray((parsed as SsoStoreFile).codes)) {
      return { codes: [] };
    }
    return parsed as SsoStoreFile;
  } catch {
    return { codes: [] };
  }
}

async function writeStore(store: SsoStoreFile): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const now = Date.now();
  store.codes = store.codes.filter((item) => !item.used && now - item.createdAt < CODE_TTL_MS * 2);
  await writeFile(SSO_PATH, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

export async function issueSsoCode(input: {
  userId: string;
  clientId: string;
  redirectUri: string;
}): Promise<{ ok: true; code: string } | { ok: false; error: string }> {
  const client = clientById(input.clientId);
  if (!client) {
    return { ok: false, error: "unknown_client" };
  }
  if (!isAllowedRedirect(client, input.redirectUri)) {
    return { ok: false, error: "invalid_redirect" };
  }
  const store = await readStore();
  const code = randomBytes(24).toString("base64url");
  store.codes.push({
    code,
    userId: input.userId,
    clientId: client.id,
    redirectUri: input.redirectUri,
    createdAt: Date.now(),
    used: false,
  });
  await writeStore(store);
  return { ok: true, code };
}

export async function consumeSsoCode(input: {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}): Promise<{ ok: true; userId: string } | { ok: false; error: string }> {
  const client = clientById(input.clientId);
  if (!client || client.secret !== input.clientSecret) {
    return { ok: false, error: "invalid_client" };
  }
  const store = await readStore();
  const record = store.codes.find((item) => item.code === input.code);
  if (!record || record.used) {
    return { ok: false, error: "invalid_code" };
  }
  if (Date.now() - record.createdAt > CODE_TTL_MS) {
    return { ok: false, error: "expired_code" };
  }
  if (record.clientId !== client.id || record.redirectUri !== input.redirectUri) {
    return { ok: false, error: "mismatch" };
  }
  record.used = true;
  await writeStore(store);
  return { ok: true, userId: record.userId };
}
