import Link from "next/link";
import { Logo } from "@/components/logo";
import { nav, studio } from "@/lib/studio";

export function Footer() {
  return (
    <footer className="border-t border-line bg-panel/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo size="footer" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-muted">{studio.description}</p>
        </div>
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Studio</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="text-ink hover:text-glow" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs tracking-[0.16em] text-muted uppercase">Ailleurs</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a className="text-ink hover:text-glow" href="https://audiova.site">
                Audiova
              </a>
            </li>
            <li>
              <a className="text-ink hover:text-glow" href={studio.discordUrl}>
                Discord
              </a>
            </li>
            <li>
              <Link className="text-ink hover:text-glow" href="/mentions">
                Mentions
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-muted sm:px-8">
          © {studio.year} {studio.name}. Équipe indépendante.
        </p>
      </div>
    </footer>
  );
}
