import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { authConfigured, authSecret } from "@/lib/auth/clients";
import { findUserById, publicUser, type UserRecord } from "@/lib/auth/users";

export const USER_SESSION_COOKIE = "ow_user_session";
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

function sign(payload: string): string {
  return createHmac("sha256", authSecret()).update(payload).digest("base64url");
}

export function createUserSessionToken(userId: string, now = Date.now()): string {
  const nonce = randomBytes(12).toString("base64url");
  const payload = `u.${userId}.${now}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyUserSessionToken(token: string | undefined, now = Date.now()): string | null {
  if (!token || !authConfigured()) {
    return null;
  }
  const parts = token.split(".");
  if (parts.length !== 5 || parts[0] !== "u") {
    return null;
  }
  const userId = parts[1] ?? "";
  const stamp = Number(parts[2]);
  const nonce = parts[3] ?? "";
  const provided = parts[4] ?? "";
  if (!userId || !nonce || !Number.isFinite(stamp)) {
    return null;
  }
  if (now - stamp > SESSION_TTL_MS || stamp > now + 60_000) {
    return null;
  }
  const payload = `u.${userId}.${stamp}.${nonce}`;
  const expected = sign(payload);
  if (expected.length !== provided.length) {
    return null;
  }
  try {
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(provided))) {
      return null;
    }
  } catch {
    return null;
  }
  return userId;
}

export function sessionCookieOptions(maxAgeSeconds = SESSION_TTL_MS / 1000) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: Math.floor(maxAgeSeconds),
  };
}

export async function getSessionUser(): Promise<UserRecord | null> {
  if (!authConfigured()) {
    return null;
  }
  const jar = await cookies();
  const token = jar.get(USER_SESSION_COOKIE)?.value;
  const userId = verifyUserSessionToken(token);
  if (!userId) {
    return null;
  }
  return findUserById(userId);
}

export async function getSessionPublicUser() {
  const user = await getSessionUser();
  return user ? publicUser(user) : null;
}
