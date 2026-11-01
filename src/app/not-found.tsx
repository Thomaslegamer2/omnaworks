import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-5 py-20">
      <p className="font-mono text-xs tracking-[0.18em] text-glow uppercase">404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight">Cette page n&apos;existe pas</h1>
      <p className="mt-4 text-lg leading-8 text-muted">Le lien ne correspond à aucune page d&apos;Omnaworks.</p>
      <Link
        href="/"
        className="btn-brand mt-8 inline-flex h-12 w-fit items-center rounded-xl px-5 font-semibold"
      >
        Retour à l&apos;accueil
      </Link>
    </main>
  );
}
