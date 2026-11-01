import { json } from "@/lib/auth/http";
import { consumeSsoCode } from "@/lib/auth/sso";
import { findUserById, publicUser } from "@/lib/auth/users";

/**
 * Échange code SSO → profil utilisateur (appel serveur-à-serveur).
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const record = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const code = typeof record.code === "string" ? record.code : "";
  const clientId = typeof record.client_id === "string" ? record.client_id : "";
  const clientSecret = typeof record.client_secret === "string" ? record.client_secret : "";
  const redirectUri = typeof record.redirect_uri === "string" ? record.redirect_uri : "";

  const consumed = await consumeSsoCode({ code, clientId, clientSecret, redirectUri });
  if (!consumed.ok) {
    return json({ error: consumed.error }, 400);
  }

  const user = await findUserById(consumed.userId);
  if (!user) {
    return json({ error: "user_missing" }, 404);
  }

  return json({
    ok: true,
    user: publicUser(user),
    /** Jeton opaque pour que le site produit crée sa propre session locale. */
    subject: user.id,
  });
}
