import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusPill } from "@/components/status-pill";
import { productBySlug, products } from "@/lib/studio";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) {
    return { title: "Produit" };
  }
  return {
    title: product.name,
    description: product.lede,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <main>
      <header className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <p className="text-sm">
            <Link href="/produits" className="text-signal hover:text-ink">
              Produits
            </Link>
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <StatusPill status={product.status} />
            <p className="text-sm text-glow">{product.slogan}</p>
          </div>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.035em] sm:text-7xl">{product.name}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{product.lede}</p>
          {product.externalHref ? (
            <a
              href={product.externalHref}
              className="btn-brand mt-8 inline-flex h-12 items-center rounded-xl px-5 font-semibold"
            >
              {product.externalLabel}
            </a>
          ) : null}
        </div>
      </header>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <dl className="h-fit space-y-5 rounded-3xl border border-line bg-card/70 p-6">
          {product.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-xs tracking-[0.14em] text-muted uppercase">{fact.label}</dt>
              <dd className="mt-1 text-sm leading-6">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div className="space-y-12">
          {product.chapters.map((chapter) => (
            <section key={chapter.title}>
              <h2 className="text-3xl font-semibold tracking-tight">{chapter.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-7 text-muted">
                {chapter.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
