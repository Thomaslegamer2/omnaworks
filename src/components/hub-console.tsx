"use client";

import { useEffect, useState } from "react";
import type { HubSiteId, ResolvedSiteConfig } from "@/lib/hub/store";
import type { SiteTheme, ThemeMeta } from "@/lib/hub/themes";

interface HubSnapshot {
  theme: SiteTheme;
  updatedAt: string | null;
  discordUrl: string;
  catalog: readonly ThemeMeta[];
  sites: Record<HubSiteId, ResolvedSiteConfig>;
}

export function HubConsole({ initial }: { initial: HubSnapshot }) {
  const [data, setData] = useState(initial);
  const [busy, setBusy] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = data.theme;
  }, [data.theme]);

  const applyGlobal = async (theme: SiteTheme) => {
    setBusy(theme);
    setMessage(null);
    setError(null);
    try {
      const response = await fetch("/api/hub/theme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });
      if (!response.ok) {
        setError(response.status === 401 ? "Connecte-toi sur /compte pour changer le thème." : "Échec.");
        return;
      }
      const refresh = await fetch("/api/hub", { cache: "no-store" });
      if (refresh.ok) {
        setData((await refresh.json()) as HubSnapshot);
      }
      setMessage(`Thème global « ${theme} » appliqué.`);
    } catch {
      setError("Réseau indisponible.");
    } finally {
      setBusy(null);
    }
  };

  const clearOverride = async (id: HubSiteId) => {
    setBusy(id);
    setError(null);
    try {
      const response = await fetch(`/api/hub/sites/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme: null }),
      });
      if (!response.ok) {
        setError(response.status === 401 ? "Connecte-toi sur /compte." : "Échec.");
        return;
      }
      const refresh = await fetch("/api/hub", { cache: "no-store" });
      if (refresh.ok) {
        setData((await refresh.json()) as HubSnapshot);
      }
      setMessage(`Override retiré pour ${id}.`);
    } catch {
      setError("Réseau indisponible.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="space-y-12">
      <section className="rounded-3xl border border-line bg-card/70 p-6 sm:p-8">
        <p className="font-mono text-xs tracking-[0.16em] text-glow uppercase">État</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">Thème global : {data.theme}</h2>
        <p className="mt-3 text-sm text-muted">
          Mis à jour : {data.updatedAt ? new Date(data.updatedAt).toLocaleString("fr-FR") : "jamais"}
        </p>
        <p className="mt-2 text-sm text-muted">Discord : {data.discordUrl}</p>
        {message ? <p className="mt-4 text-sm text-ok">{message}</p> : null}
        {error ? <p className="mt-4 text-sm text-danger">{error}</p> : null}
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Choisir un thème pour tous les sites</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Audiova, Videova et Omnaworks lisent cette valeur. Un site peut garder un override local si besoin.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.catalog.map((item) => {
            const active = data.theme === item.id;
            return (
              <button
                key={item.id}
                type="button"
                disabled={busy !== null}
                onClick={() => applyGlobal(item.id)}
                className={
                  active
                    ? "rounded-2xl border border-glow/50 bg-panel p-4 text-left"
                    : "rounded-2xl border border-line bg-card/50 p-4 text-left transition hover:border-glow/30"
                }
              >
                <span className="inline-block size-2.5 rounded-full" style={{ background: item.accent }} />
                <p className="mt-3 font-semibold">{item.label}</p>
                <p className="mt-1 text-xs text-muted">{item.when}</p>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
                <p className="mt-3 text-xs font-semibold text-signal">
                  {busy === item.id ? "Application…" : active ? "Actif" : "Appliquer"}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold tracking-tight">Sites</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {(Object.keys(data.sites) as HubSiteId[]).map((id) => {
            const site = data.sites[id];
            return (
              <li key={id} className="rounded-2xl border border-line bg-card/60 p-5">
                <p className="font-mono text-xs tracking-[0.14em] text-muted uppercase">{id}</p>
                <p className="mt-3 text-lg font-semibold">{site.theme}</p>
                <p className="mt-1 text-sm text-muted">
                  {site.themeSource === "global" ? "Hérite du global" : "Override site"}
                </p>
                <ul className="mt-4 space-y-1 text-xs text-muted">
                  <li>Ads : {site.adsEnabled ? "on" : "off"}</li>
                  <li>Analytics : {site.analyticsEnabled ? "on" : "off"}</li>
                  <li>Import URL : {site.urlImportEnabled ? "on" : "off"}</li>
                  <li>Discord : {site.discordEnabled ? "on" : "off"}</li>
                </ul>
                {site.themeSource === "site" ? (
                  <button
                    type="button"
                    disabled={busy !== null}
                    onClick={() => clearOverride(id)}
                    className="mt-4 text-sm font-semibold text-signal hover:text-ink"
                  >
                    {busy === id ? "…" : "Revenir au global"}
                  </button>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rounded-3xl border border-line bg-panel/50 p-6">
        <h2 className="text-xl font-semibold">Endpoints pour les autres sites</h2>
        <ul className="mt-4 space-y-2 font-mono text-sm text-muted">
          <li>GET /api/hub</li>
          <li>GET /api/hub/theme</li>
          <li>GET /api/hub/sites/audiova</li>
          <li>GET /api/hub/sites/videova</li>
          <li>GET /hub-theme.json</li>
        </ul>
      </section>
    </div>
  );
}
