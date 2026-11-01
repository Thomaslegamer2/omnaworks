import type { Metadata } from "next";
import Link from "next/link";
import { LogoutButton } from "@/components/auth-forms";
import { PageHeader } from "@/components/page-header";
import { authConfigured } from "@/lib/auth/clients";
import { getSessionPublicUser } from "@/lib/auth/session";
import { products } from "@/lib/studio";

export const metadata: Metadata = {
  title: "Compte",
  description: "Compte Omnaworks partagé entre Audiova, Videova et le site maison.",
  robots: { index: false, follow: false },
};

const productLabels: Record<string, string> = {
  mere: "Omnaworks",
  audiova: "Audiova",
  videova: "Videova",
};

export default async function ComptePage() {
  const configured = authConfigured();
  const user = configured ? await getSessionPublicUser() : null;

  if (!configured) {
    return (
      <main>
        <PageHeader
          kicker="Compte"
          title="Comptes bientôt prêts."
          lede="Le serveur n’a pas encore de secret OW_AUTH_SECRET. Les outils restent utilisables sans compte."
        />
      </main>
    );
  }

  if (!user) {
    return (
      <main>
        <PageHeader
          kicker="Compte"
          title="Un compte pour tous les sites."
          lede="Créez un compte Omnaworks pour Audiova, Videova et ce site. Optionnel : les convertisseurs restent utilisables sans connexion."
        />
        <section className="mx-auto flex max-w-6xl flex-wrap gap-4 px-5 py-12 sm:px-8">
          <Link href="/compte/inscription" className="btn-brand inline-flex h-12 items-center rounded-xl px-5 font-semibold">
            Créer un compte
          </Link>
          <Link
            href="/compte/connexion"
            className="inline-flex h-12 items-center rounded-xl border border-line px-5 font-semibold text-ink transition hover:border-glow/40"
          >
            Se connecter
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main>
      <PageHeader
        kicker="Compte"
        title={`Bonjour, ${user.displayName}.`}
        lede="Ce compte Omnaworks fonctionne sur le site maison et les convertisseurs du groupe."
      />
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-4 rounded-3xl border border-line bg-card/70 p-7">
          <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Profil</p>
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-muted">Nom</dt>
              <dd className="mt-1 font-semibold">{user.displayName}</dd>
            </div>
            <div>
              <dt className="text-muted">E-mail</dt>
              <dd className="mt-1 font-semibold">{user.email}</dd>
            </div>
            <div>
              <dt className="text-muted">Créé le</dt>
              <dd className="mt-1">
                {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "Europe/Paris",
                })}
              </dd>
            </div>
          </dl>
          <div className="pt-2">
            <LogoutButton />
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-line bg-card/70 p-7">
          <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Sites du groupe</p>
          <ul className="space-y-3">
            {products.map((product) => (
              <li key={product.slug} className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3 last:border-b-0">
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="text-sm text-muted">
                    {user.products.includes(product.slug) ? "Déjà utilisé avec ce compte" : "Disponible via SSO"}
                  </p>
                </div>
                {product.externalHref ? (
                  <a href={product.externalHref} className="text-sm font-semibold text-signal hover:text-ink">
                    Ouvrir
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="text-xs leading-6 text-muted">
            Produits liés :{" "}
            {user.products.map((id) => productLabels[id] ?? id).join(", ") || "aucun pour l’instant"}.
          </p>
        </div>
      </section>
    </main>
  );
}
