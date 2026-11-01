import { NextResponse } from "next/server";
import { clientById, isAllowedRedirect } from "@/lib/auth/clients";
import { getSessionUser } from "@/lib/auth/session";
import { issueSsoCode } from "@/lib/auth/sso";
import { touchProduct } from "@/lib/auth/users";

/**
 * Démarre le SSO : si connecté, émet un code et redirige ;
 * sinon envoie vers /compte/connexion avec retour.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const clientId = url.searchParams.get("client_id") ?? "";
  const redirectUri = url.searchParams.get("redirect_uri") ?? "";
  const state = url.searchParams.get("state") ?? "";

  const client = clientById(clientId);
  if (!client || !isAllowedRedirect(client, redirectUri)) {
    return NextResponse.json({ error: "invalid_client_or_redirect" }, { status: 400 });
  }

  const user = await getSessionUser();
  if (!user) {
    const login = new URL("/compte/connexion", url.origin);
    login.searchParams.set("next", `/api/auth/sso/authorize?${url.searchParams.toString()}`);
    return NextResponse.redirect(login);
  }

  const issued = await issueSsoCode({
    userId: user.id,
    clientId: client.id,
    redirectUri,
  });
  if (!issued.ok) {
    return NextResponse.json({ error: issued.error }, { status: 400 });
  }

  await touchProduct(user.id, client.id);

  const target = new URL(redirectUri);
  target.searchParams.set("code", issued.code);
  if (state) {
    target.searchParams.set("state", state);
  }
  return NextResponse.redirect(target);
}
