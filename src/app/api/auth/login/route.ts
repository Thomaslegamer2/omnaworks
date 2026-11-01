import { assertSameOrigin, json } from "@/lib/auth/http";
import { authConfigured } from "@/lib/auth/clients";
import { createUserSessionToken, USER_SESSION_COOKIE } from "@/lib/auth/session";
import { authenticateUser, publicUser } from "@/lib/auth/users";

export async function POST(request: Request) {
  if (!assertSameOrigin(request)) {
    return json({ error: "forbidden" }, 403);
  }
  if (!authConfigured()) {
    return json({ error: "not_configured" }, 503);
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

  const user = await authenticateUser(email, password);
  if (!user) {
    return json({ error: "invalid_credentials" }, 401);
  }

  const response = json({ ok: true, user: publicUser(user) });
  response.headers.append(
    "Set-Cookie",
    `${USER_SESSION_COOKIE}=${createUserSessionToken(user.id)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );
  return response;
}
