import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Mentions",
  description: "Éditeur, hébergement et liens d'Omnaworks et Audiova.",
};

const sections = [
  {
    title: "Éditeur",
    paragraphs: [
      "Omnaworks est le site d'une équipe indépendante. Aucune société, aucune adresse et aucun numéro d'immatriculation ne sont indiqués, parce qu'ils ne sont pas constitués pour ce projet.",
      "Audiova est publié de la même façon : outil personnel et indépendant. Ses mentions détaillées sont sur audiova.site/legal.",
    ],
  },
  {
    title: "Hébergement",
    paragraphs: [
      "L'hébergement dépend de l'endroit où chaque site est déployé. Omnaworks n'impose pas d'hébergeur. Audiova est accessible sur audiova.site.",
    ],
  },
  {
    title: "Ce site",
    paragraphs: [
      "Omnaworks ne crée pas de compte, ne pose pas de mesure d'audience et n'affiche pas de publicité. Les pages décrivent l'équipe et Audiova.",
      "Les liens vers Discord et vers Audiova quittent ce site. Leur fonctionnement leur appartient.",
    ],
  },
  {
    title: "Logiciels",
    paragraphs: [
      "La conversion Audiova repose sur FFmpeg compilé pour WebAssembly, via @ffmpeg/core, sous licence GPL, notamment à cause de libmp3lame. FFmpeg est une marque du projet FFmpeg. L'import de lien utilise yt-dlp.",
      "Omnaworks s'appuie sur Next.js et React pour présenter le studio.",
    ],
  },
];

export default function MentionsPage() {
  return (
    <main>
      <PageHeader
        kicker="Mentions"
        title="Ce que ce site est, et ce qu'il n'invente pas."
        lede="Pas de dénomination sociale fictive. Audiova garde ses propres pages légales."
      />
      <section className="mx-auto max-w-3xl space-y-12 px-5 py-16 sm:px-8">
        {sections.map((section) => (
          <article key={section.title}>
            <h2 className="text-3xl font-semibold tracking-tight">{section.title}</h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-muted">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
        <p className="text-sm">
          <a className="font-semibold text-signal hover:text-ink" href="https://audiova.site/legal">
            Mentions d&apos;Audiova
          </a>
          <span className="text-muted"> · </span>
          <a className="font-semibold text-signal hover:text-ink" href="https://audiova.site/privacy">
            Confidentialité d&apos;Audiova
          </a>
        </p>
      </section>
    </main>
  );
}
