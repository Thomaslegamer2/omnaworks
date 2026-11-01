import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Approche",
  description:
    "Comment Omnaworks conçoit Audiova : conversion dans le navigateur, limites écrites, formats réellement pris en charge.",
};

const blocks = [
  {
    title: "Rester dans le navigateur",
    paragraphs: [
      "Audiova encode sur l'appareil. Le fichier choisi n'est pas envoyé pour être converti. Le moteur WebAssembly se télécharge une fois, puis le travail se fait localement.",
      "L'import d'un lien est l'exception écrite : beaucoup de sites empêchent un téléchargement direct depuis la page. Le serveur récupère le média, le remet au navigateur, et supprime le temporaire.",
    ],
  },
  {
    title: "Écrire la limite avant le bouton",
    paragraphs: [
      "Cent mégaoctets, cinq fichiers, une conversion à la fois, quinze minutes maximum. Ces plafonds sont visibles et appliqués.",
      "Un format absent de la liste n'est pas promis. Un outil prévu apparaît comme « bientôt », pas comme disponible.",
    ],
  },
  {
    title: "Parler la langue de la personne",
    paragraphs: [
      "Audiova parle français, anglais, espagnol, allemand, italien, portugais et néerlandais.",
      "Omnaworks, le site maison, est en français. C'est la langue dans laquelle l'équipe décrit son travail aujourd'hui.",
    ],
  },
  {
    title: "Garder Omnaworks et Audiova distincts",
    paragraphs: [
      "Le convertisseur n'a pas besoin de compte. On l'ouvre, on convertit, on part.",
      "Omnaworks explique l'équipe et le produit. Audiova fait la conversion. Les deux partagent le même langage visuel, pas la même mission.",
    ],
  },
];

export default function ApprochePage() {
  return (
    <main>
      <PageHeader
        kicker="Approche"
        title="Clair sur le geste, clair sur la limite."
        lede="On construit un convertisseur que l'on peut expliquer sans brochure. Le geste est simple. La limite est dite. Le reste attend."
      />
      <section className="mx-auto max-w-3xl space-y-14 px-5 py-16 sm:px-8">
        {blocks.map((block, index) => (
          <article key={block.title}>
            <p className="font-mono text-xs tracking-[0.16em] text-glow">0{index + 1}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{block.title}</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-muted">
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
        <p>
          <Link href="/produits" className="text-sm font-semibold text-signal hover:text-ink">
            Voir comment cela se traduit dans Audiova
          </Link>
        </p>
      </section>
    </main>
  );
}
