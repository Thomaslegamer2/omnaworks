import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";

const PUBLIC_CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "no-store",
} as const;

export function hubJson(data: unknown, init?: { status?: number }) {
  return NextResponse.json(data, {
    status: init?.status ?? 200,
    headers: PUBLIC_CORS,
  });
}

export function hubOptions() {
  return new NextResponse(null, { status: 204, headers: PUBLIC_CORS });
}

function secretsMatch(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || a.length === 0) {
    return false;
  }
  return timingSafeEqual(a, b);
}

export function hubWriteSecret(): string {
  return process.env.OW_HUB_SECRET?.trim() || process.env.OW_AUTH_SECRET?.trim() || "";
}

/** Écriture autorisée : Bearer secret hub, ou session Omnaworks. */
export async function canWriteHub(request: Request): Promise<boolean> {
  const expected = hubWriteSecret();
  const header = request.headers.get("authorization")?.trim() ?? "";
  if (expected.length >= 32 && header.toLowerCase().startsWith("bearer ")) {
    const token = header.slice(7).trim();
    if (secretsMatch(token, expected)) {
      return true;
    }
  }

  const user = await getSessionUser();
  return Boolean(user);
}
