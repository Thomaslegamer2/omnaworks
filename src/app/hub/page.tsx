import type { Metadata } from "next";
import Link from "next/link";
import { HubConsole } from "@/components/hub-console";
import { PageHeader } from "@/components/page-header";
import { hubSnapshot, readHubConfig } from "@/lib/hub/store";

export const metadata: Metadata = {
  title: "Hub",
  description: "Configuration centrale Omnaworks : thèmes et options partagés par Audiova et Videova.",
  robots: { index: false, follow: false },
};

export default async function HubPage() {
  const snapshot = hubSnapshot(await readHubConfig());

  return (
    <main>
      <PageHeader
        kicker="Hub"
        title="Une API pour tous les sites."
        lede="Change le thème ici : Audiova, Videova et Omnaworks le lisent. Connecte-toi via /compte pour enregistrer."
      />
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <p className="mb-8 text-sm text-muted">
          Pas encore connecté ?{" "}
          <Link href="/compte/connexion" className="font-semibold text-signal hover:text-ink">
            Ouvrir une session
          </Link>
          .
        </p>
        <HubConsole initial={snapshot} />
      </section>
    </main>
  );
}
