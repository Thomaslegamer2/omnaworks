/**
 * Clients SSO Omnaworks (sites produit).
 * Secrets et redirect URIs via variables d’environnement.
 */
export type ProductClientId = "videova" | "audiova" | "mere";

export interface ProductClient {
  id: ProductClientId;
  name: string;
  secret: string;
  redirectUris: string[];
}

function parseList(raw: string | undefined): string[] {
  if (!raw?.trim()) {
    return [];
  }
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function authConfigured(): boolean {
  return (process.env.OW_AUTH_SECRET?.trim().length ?? 0) >= 32;
}

export function authSecret(): string {
  return process.env.OW_AUTH_SECRET?.trim() ?? "";
}

export function publicAuthUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.OW_PUBLIC_URL ?? "http://localhost:3010").replace(
    /\/$/,
    "",
  );
}

function clientFromEnv(id: ProductClientId, name: string): ProductClient | null {
  const secret = process.env[`OW_SSO_${id.toUpperCase()}_SECRET`]?.trim() ?? "";
  const redirects = parseList(process.env[`OW_SSO_${id.toUpperCase()}_REDIRECTS`]);
  if (secret.length < 16 || redirects.length === 0) {
    return null;
  }
  return { id, name, secret, redirectUris: redirects };
}

/** Clients enregistrés (secrets manquants = client désactivé). */
export function registeredClients(): ProductClient[] {
  const defaults: Array<{ id: ProductClientId; name: string; fallbackRedirects: string[] }> = [
    {
      id: "videova",
      name: "Videova",
      fallbackRedirects: ["http://localhost:3000/api/auth/callback"],
    },
    {
      id: "audiova",
      name: "Audiova",
      fallbackRedirects: ["http://localhost:3001/api/auth/callback"],
    },
    {
      id: "mere",
      name: "Omnaworks",
      fallbackRedirects: [`${publicAuthUrl()}/compte`],
    },
  ];

  const out: ProductClient[] = [];
  for (const item of defaults) {
    const fromEnv = clientFromEnv(item.id, item.name);
    if (fromEnv) {
      out.push(fromEnv);
      continue;
    }
    // Dev local : secret dérivé si OW_AUTH_SECRET est défini
    if (authConfigured()) {
      out.push({
        id: item.id,
        name: item.name,
        secret: `${authSecret().slice(0, 24)}.${item.id}`,
        redirectUris: item.fallbackRedirects,
      });
    }
  }
  return out;
}

export function clientById(id: string): ProductClient | null {
  return registeredClients().find((client) => client.id === id) ?? null;
}

export function isAllowedRedirect(client: ProductClient, redirectUri: string): boolean {
  return client.redirectUris.includes(redirectUri);
}
