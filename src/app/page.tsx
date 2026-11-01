import type { Metadata } from "next";
import Link from "next/link";
import { StatusPill } from "@/components/status-pill";
import { crafts, now, principles, products } from "@/lib/studio";

const audiova = products.find((product) => product.slug === "audiova") ?? products[0];
const videova = products.find((product) => product.slug === "videova");

export const metadata: Metadata = {
  title: "Omnaworks — le site de l'équipe",
  description:
    "Omnaworks présente l'équipe derrière Audiova et Videova, convertisseurs dans le navigateur.",
};

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-glow uppercase">Studio indépendant</p>
            <h1 className="mt-5 text-[3.1rem] leading-[0.92] font-semibold tracking-[-0.035em] text-ink sm:text-7xl">
              <span className="text-ink">Omna</span>
              <span className="gradient-text">works</span>
            </h1>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              La maison derrière Audiova et Videova.
            </p>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              On présente l&apos;équipe et les convertisseurs qui restent dans le navigateur.
              Un compte Omnaworks optionnel relie les sites.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://audiova.site"
                className="btn-brand inline-flex h-12 items-center justify-center rounded-xl px-5 font-semibold"
              >
                Ouvrir Audiova
              </a>
              <Link
                href="/compte"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-line px-5 font-semibold text-ink transition hover:border-glow/40 hover:bg-white/[0.03]"
              >
                Compte
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            <article className="rounded-3xl border border-line bg-card/80 p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Produit</p>
                <StatusPill status={audiova.status} />
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight">{audiova.name}</h2>
              <p className="mt-2 text-sm text-glow">{audiova.slogan}</p>
              <p className="mt-5 text-sm leading-7 text-muted">{audiova.lede}</p>
              <Link href={audiova.href} className="mt-6 inline-flex text-sm font-semibold text-signal hover:text-ink">
                Lire la fiche
              </Link>
            </article>
            {videova ? (
              <article className="rounded-3xl border border-line bg-card/80 p-7">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Produit</p>
                  <StatusPill status={videova.status} />
                </div>
                <h2 className="mt-5 text-3xl font-semibold tracking-tight">{videova.name}</h2>
                <p className="mt-2 text-sm text-glow">{videova.slogan}</p>
                <p className="mt-5 text-sm leading-7 text-muted">{videova.lede}</p>
                <Link href={videova.href} className="mt-6 inline-flex text-sm font-semibold text-signal hover:text-ink">
                  Lire la fiche
                </Link>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.18em] text-glow uppercase">Ce que l&apos;on fait</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Convertir localement. Dire ce qui est prêt.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {principles.map((item) => (
            <article key={item.title} className="rounded-3xl border border-line bg-card/60 p-6">
              <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-panel/40">
        <div className="mx-auto max-w-6xl space-y-14 px-5 py-20 sm:px-8">
          {[audiova, videova].filter(Boolean).map((product) =>
            product ? (
              <div key={product.slug}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs tracking-[0.18em] text-glow uppercase">Produit</p>
                    <h2 className="mt-3 text-4xl font-semibold tracking-tight">{product.name}</h2>
                  </div>
                  <StatusPill status={product.status} />
                </div>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{product.summary}</p>
                <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
                  <Link href={product.href} className="btn-brand inline-flex h-11 items-center rounded-xl px-5">
                    Fiche complète
                  </Link>
                  {product.externalHref ? (
                    <a
                      href={product.externalHref}
                      className="inline-flex h-11 items-center rounded-xl border border-line px-5 text-ink transition hover:border-glow/40"
                    >
                      {product.externalLabel}
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null,
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="font-mono text-xs tracking-[0.18em] text-glow uppercase">Équipe</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Quatre métiers, une petite équipe.
            </h2>
          </div>
          <Link href="/equipe" className="text-sm font-semibold text-signal hover:text-ink">
            Comment on travaille
          </Link>
        </div>
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {crafts.map((craft) => (
            <li key={craft.id} className="grid gap-2 py-5 sm:grid-cols-[12rem_1fr] sm:gap-8">
              <h3 className="font-semibold">{craft.title}</h3>
              <p className="text-muted">{craft.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <p className="font-mono text-xs tracking-[0.18em] text-glow uppercase">En ce moment</p>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {now.map((item) => (
              <li key={item.title} className="rounded-3xl border border-line bg-card/70 p-6">
                <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">{item.label}</p>
                <h3 className="mt-4 text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
