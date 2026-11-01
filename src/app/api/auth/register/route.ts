import { assertSameOrigin, json } from "@/lib/auth/http";
import { authConfigured } from "@/lib/auth/clients";
import { createUserSessionToken, USER_SESSION_COOKIE } from "@/lib/auth/session";
import { publicUser, registerUser } from "@/lib/auth/users";

export async function POST(request: Request) {
  if (!assertSameOrigin(request)) {
    return json({ error: "forbidden" }, 403);
  }
  if (!authConfigured()) {
    return json({ error: "not_configured", message: "Définissez OW_AUTH_SECRET (≥32)." }, 503);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const email = typeof record.email === "string" ? record.email : "";
  const password = typeof record.password === "string" ? record.password : "";
  const displayName = typeof record.displayName === "string" ? record.displayName : "";

  const result = await registerUser({ email, password, displayName });
  if (!result.ok) {
    const status = result.error === "exists" ? 409 : 400;
    return json({ error: result.error }, status);
  }

  const response = json({ ok: true, user: publicUser(result.user) });
  response.headers.append(
    "Set-Cookie",
    `${USER_SESSION_COOKIE}=${createUserSessionToken(result.user.id)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );
  return response;
}
