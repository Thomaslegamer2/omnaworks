import { assertSameOrigin, json } from "@/lib/auth/http";
import { USER_SESSION_COOKIE } from "@/lib/auth/session";

export async function POST(request: Request) {
  if (!assertSameOrigin(request)) {
    return json({ error: "forbidden" }, 403);
  }
  const response = json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `${USER_SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  );
  return response;
}
