"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { nav } from "@/lib/studio";

function isCurrent(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-canvas/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Logo />
        <nav aria-label="Navigation principale" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => {
            const current = isCurrent(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={
                  current
                    ? "text-sm font-semibold text-ink"
                    : "text-sm text-muted transition hover:text-ink"
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/compte"
            aria-current={isCurrent(pathname, "/compte") ? "page" : undefined}
            className={
              isCurrent(pathname, "/compte")
                ? "text-sm font-semibold text-ink"
                : "text-sm text-muted transition hover:text-ink"
            }
          >
            Compte
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/compte"
            className="inline-flex h-10 items-center rounded-xl border border-line px-3 text-sm font-medium text-ink"
          >
            Compte
          </Link>
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-xl border border-line px-4 text-sm font-medium text-ink"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Fermer" : "Menu"}
          </button>
        </div>
      </div>
      {open ? (
        <nav id="menu-mobile" aria-label="Navigation mobile" className="border-t border-line bg-panel/95 px-5 py-3 md:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => {
              const current = isCurrent(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className="block py-3 text-base text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
