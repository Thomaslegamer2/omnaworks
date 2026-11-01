import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { studio } from "@/lib/studio";

export const metadata: Metadata = {
  title: "Contact",
  description: "Écrire à Omnaworks : ticket Audiova pour le convertisseur, Discord pour le studio.",
};

export default function ContactPage() {
  return (
    <main>
      <PageHeader
        kicker="Contact"
        title="Deux portes, selon le sujet."
        lede="Le convertisseur a son propre ticket. Le studio passe par Discord. Il n'y a pas d'adresse e-mail publique configurée pour Omnaworks."
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:px-8 md:grid-cols-2">
        <article className="rounded-3xl border border-line bg-card/70 p-7">
          <p className="font-mono text-xs tracking-[0.16em] text-glow uppercase">Audiova</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Un fichier, un format, un ticket</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Question sur une conversion, un format refusé ou un lien qui ne se récupère pas : le ticket
            d&apos;Audiova arrive dans la console du produit. La conversation reste liée à l&apos;appareil.
          </p>
          <a
            href="https://audiova.site/contact"
            className="btn-brand mt-6 inline-flex h-11 items-center rounded-xl px-5 text-sm font-semibold"
          >
            Ouvrir le contact Audiova
          </a>
        </article>
        <article className="rounded-3xl border border-line bg-card/70 p-7">
          <p className="font-mono text-xs tracking-[0.16em] text-glow uppercase">Studio</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Discord</h2>
          <p className="mt-4 text-sm leading-7 text-muted">
            Pour parler de l&apos;équipe, d&apos;une idée ou d&apos;une suite possible autour d&apos;Audiova, le
            salon Discord est le canal ouvert.
          </p>
          <a
            href={studio.discordUrl}
            className="btn-brand mt-6 inline-flex h-11 items-center rounded-xl px-5 text-sm font-semibold"
          >
            Rejoindre Discord
          </a>
        </article>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">Avant d&apos;écrire</h2>
        <ul className="mt-6 grid gap-4 text-sm leading-7 text-muted md:grid-cols-3">
          <li className="rounded-2xl border border-line bg-panel/60 p-5">
            Un fichier au-delà de 100 Mo est arrêté avant la conversion.
          </li>
          <li className="rounded-2xl border border-line bg-panel/60 p-5">
            Un format hors liste n&apos;est pas pris en charge. La FAQ d&apos;Audiova détaille les cas courants.
          </li>
          <li className="rounded-2xl border border-line bg-panel/60 p-5">
            Omnaworks ne vend pas d&apos;espace publicitaire et ne collecte pas de message sur ce site.
          </li>
        </ul>
      </section>
    </main>
  );
}
