import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-forms";
import { PageHeader } from "@/components/page-header";
import { authConfigured } from "@/lib/auth/clients";
import { getSessionPublicUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Inscription",
  description: "Créer un compte Omnaworks partagé.",
  robots: { index: false, follow: false },
};

function safeNext(value: string | undefined): string | undefined {
  if (!value || !value.startsWith("/") || value.startsWith("//")) {
    return undefined;
  }
  return value;
}

export default async function InscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = safeNext(params.next);
  const configured = authConfigured();
  const user = configured ? await getSessionPublicUser() : null;

  if (user) {
    redirect(nextPath ?? "/compte");
  }

  return (
    <main>
      <PageHeader
        kicker="Compte"
        title="Inscription"
        lede={
          configured
            ? "Créez un compte optionnel. Les convertisseurs restent utilisables sans connexion."
            : "Les comptes ne sont pas encore configurés (OW_AUTH_SECRET manquant)."
        }
      />
      {configured ? (
        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <AuthForm mode="register" nextPath={nextPath} />
        </section>
      ) : null}
    </main>
  );
}
