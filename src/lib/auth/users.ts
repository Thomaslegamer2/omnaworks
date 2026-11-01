import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomBytes } from "node:crypto";
import { hashPassword, isStrongPassword, verifyPassword } from "@/lib/auth/password";

export interface UserRecord {
  id: string;
  email: string;
  displayName: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
  /** Produits déjà utilisés (méta, pas de droits factices). */
  products: string[];
}

interface UserStoreFile {
  users: UserRecord[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_PATH = path.join(DATA_DIR, "users.json");

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 180;
}

async function readStore(): Promise<UserStoreFile> {
  try {
    const raw = await readFile(USERS_PATH, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !("users" in parsed) || !Array.isArray((parsed as UserStoreFile).users)) {
      return { users: [] };
    }
    return parsed as UserStoreFile;
  } catch {
    return { users: [] };
  }
}

async function writeStore(store: UserStoreFile): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(USERS_PATH, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

export function publicUser(user: UserRecord) {
  return {
    id: user.id,
    email: user.email,
    displayName: user.displayName,
    createdAt: user.createdAt,
    products: user.products,
  };
}

export async function findUserByEmail(email: string): Promise<UserRecord | null> {
  const store = await readStore();
  const normalized = normalizeEmail(email);
  return store.users.find((user) => user.email === normalized) ?? null;
}

export async function findUserById(id: string): Promise<UserRecord | null> {
  const store = await readStore();
  return store.users.find((user) => user.id === id) ?? null;
}

export async function registerUser(input: {
  email: string;
  password: string;
  displayName: string;
}): Promise<{ ok: true; user: UserRecord } | { ok: false; error: "invalid" | "weak" | "exists" }> {
  const email = normalizeEmail(input.email);
  const displayName = input.displayName.trim().slice(0, 80);
  if (!isValidEmail(email) || displayName.length < 2) {
    return { ok: false, error: "invalid" };
  }
  if (!isStrongPassword(input.password)) {
    return { ok: false, error: "weak" };
  }
  const store = await readStore();
  if (store.users.some((user) => user.email === email)) {
    return { ok: false, error: "exists" };
  }
  const now = new Date().toISOString();
  const user: UserRecord = {
    id: randomBytes(16).toString("hex"),
    email,
    displayName,
    passwordHash: hashPassword(input.password),
    createdAt: now,
    updatedAt: now,
    products: ["mere"],
  };
  store.users.push(user);
  await writeStore(store);
  return { ok: true, user };
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<UserRecord | null> {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }
  if (!verifyPassword(password, user.passwordHash)) {
    return null;
  }
  return user;
}

export async function touchProduct(userId: string, product: string): Promise<void> {
  const store = await readStore();
  const user = store.users.find((item) => item.id === userId);
  if (!user) {
    return;
  }
  if (!user.products.includes(product)) {
    user.products.push(product);
    user.updatedAt = new Date().toISOString();
    await writeStore(store);
  }
}
