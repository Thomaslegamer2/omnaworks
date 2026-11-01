import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { StatusPill } from "@/components/status-pill";
import { products } from "@/lib/studio";

export const metadata: Metadata = {
  title: "Produits",
  description: "Audiova et Videova, convertisseurs dans le navigateur, produits d'Omnaworks.",
};

export default function ProduitsPage() {
  return (
    <main>
      <PageHeader
        kicker="Produits"
        title="Audio et vidéo, en ligne."
        lede="Deux convertisseurs du même groupe. Chaque fiche dit ce qui fonctionne, ce qui reste local, et ce qui n'est pas encore livré."
      />
      <section className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8">
        {products.map((product) => (
          <article key={product.slug} className="rounded-[2rem] border border-line bg-card/70 p-7 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-sm text-glow">{product.slogan}</p>
              <StatusPill status={product.status} />
            </div>
            <h2 className="mt-4 text-5xl font-semibold tracking-tight">{product.name}</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{product.lede}</p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {product.facts.slice(0, 4).map((fact) => (
                <div key={fact.label} className="rounded-2xl border border-line bg-panel/60 px-4 py-4">
                  <dt className="font-mono text-xs tracking-[0.14em] text-muted uppercase">{fact.label}</dt>
                  <dd className="mt-2 text-sm leading-6">{fact.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-semibold">
              <Link
                href={product.href}
                className="btn-brand inline-flex h-11 items-center rounded-xl px-5"
              >
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
          </article>
        ))}
      </section>
    </main>
  );
}
