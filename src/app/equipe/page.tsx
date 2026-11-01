import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { crafts, people } from "@/lib/studio";

export const metadata: Metadata = {
  title: "Équipe",
  description:
    "Petite équipe indépendante derrière Audiova. Produit, interface, audio et fiabilité.",
};

export default function EquipePage() {
  return (
    <main>
      <PageHeader
        kicker="Équipe"
        title="On construit, on dit ce qui est prêt."
        lede="Omnaworks est une petite équipe indépendante derrière Audiova. Les prénoms seront publiés ici quand l'équipe le voudra. En attendant, le travail se lit dans le produit."
      />
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        {people.length > 0 ? (
          <ul className="grid gap-6 md:grid-cols-2">
            {people.map((person) => (
              <li key={person.name} className="rounded-3xl border border-line bg-card/70 p-6">
                <h2 className="text-3xl font-semibold tracking-tight">{person.name}</h2>
                <p className="mt-2 text-sm font-semibold text-glow">{person.role}</p>
                <p className="mt-4 text-sm leading-7 text-muted">{person.focus}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-2xl text-lg leading-8 text-muted">
            Pas de portraits inventés, pas d&apos;organigramme d&apos;entreprise. Les rôles ci-dessous décrivent
            le travail réel : ce que l&apos;on décide, ce que l&apos;on dessine, ce que l&apos;on fait tourner.
          </p>
        )}
        <div className="mt-12 grid gap-6">
          {crafts.map((craft, index) => (
            <article
              key={craft.id}
              className="grid gap-4 rounded-3xl border border-line bg-card/70 p-6 sm:grid-cols-[8rem_1fr] sm:p-8"
            >
              <p className="font-mono text-3xl text-glow">0{index + 1}</p>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight">{craft.title}</h2>
                <p className="mt-2 font-medium text-ink">{craft.summary}</p>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">{craft.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="border-t border-line bg-panel/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight">Comment une décision se prend</h2>
            <p className="mt-4 text-sm leading-7 text-muted">
              On part de ce qu&apos;une personne peut faire aujourd&apos;hui. Si le chemin n&apos;existe pas encore,
              la page le dit. Audiova marque « bientôt » ce qui n&apos;encode pas encore.
            </p>
          </div>
          <ul className="space-y-4 text-sm leading-7">
            <li className="rounded-2xl border border-line bg-card/70 p-5">
              Un écran livré a un résultat vérifiable : un fichier téléchargé, un format choisi, une limite respectée.
            </li>
            <li className="rounded-2xl border border-line bg-card/70 p-5">
              Une limite est écrite avant l&apos;action : taille du fichier, nombre de fichiers, timeout de conversion.
            </li>
            <li className="rounded-2xl border border-line bg-card/70 p-5">
              Omnaworks n&apos;est pas le convertisseur. Le site explique l&apos;équipe, puis envoie vers Audiova.
            </li>
          </ul>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <Link href="/approche" className="text-sm font-semibold text-signal hover:text-ink">
            Lire l&apos;approche
          </Link>
        </div>
      </section>
    </main>
  );
}
