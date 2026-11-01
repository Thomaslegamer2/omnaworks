import Link from "next/link";

export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
}) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-xs tracking-[0.18em] text-glow uppercase">{kicker}</p>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[0.95] font-semibold tracking-[-0.035em] text-ink sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{lede}</p>
        <p className="mt-8 text-sm">
          <Link href="/" className="text-signal hover:text-ink">
            Retour à l&apos;accueil
          </Link>
        </p>
      </div>
    </header>
  );
}
