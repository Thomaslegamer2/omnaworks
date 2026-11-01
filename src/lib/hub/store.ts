import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { studio } from "@/lib/studio";
import { isSiteTheme, THEME_CATALOG, type SiteTheme } from "@/lib/hub/themes";

export const HUB_SITE_IDS = ["omnaworks", "audiova", "videova"] as const;
export type HubSiteId = (typeof HUB_SITE_IDS)[number];

export interface HubSiteFlags {
  /** null = hérite du thème global */
  theme: SiteTheme | null;
  adsEnabled: boolean;
  analyticsEnabled: boolean;
  urlImportEnabled: boolean;
  discordEnabled: boolean;
}

export interface HubConfig {
  version: 1;
  updatedAt: string | null;
  theme: SiteTheme;
  discordUrl: string;
  sites: Record<HubSiteId, HubSiteFlags>;
}

export interface ResolvedSiteConfig {
  id: HubSiteId;
  theme: SiteTheme;
  themeSource: "global" | "site";
  adsEnabled: boolean;
  analyticsEnabled: boolean;
  urlImportEnabled: boolean;
  discordEnabled: boolean;
  discordUrl: string;
  updatedAt: string | null;
}

const DATA_DIR = path.join(process.cwd(), "data");
const HUB_PATH = path.join(DATA_DIR, "hub-config.json");
const PUBLIC_MIRROR = path.join(process.cwd(), "public", "hub-theme.json");

function defaultSite(): HubSiteFlags {
  return {
    theme: null,
    adsEnabled: false,
    analyticsEnabled: true,
    urlImportEnabled: true,
    discordEnabled: true,
  };
}

export const DEFAULT_HUB_CONFIG: HubConfig = {
  version: 1,
  updatedAt: null,
  theme: "default",
  discordUrl: studio.discordUrl,
  sites: {
    omnaworks: defaultSite(),
    audiova: defaultSite(),
    videova: defaultSite(),
  },
};

export function isHubSiteId(value: unknown): value is HubSiteId {
  return typeof value === "string" && (HUB_SITE_IDS as readonly string[]).includes(value);
}

function parseSiteFlags(raw: unknown): HubSiteFlags {
  const base = defaultSite();
  if (!raw || typeof raw !== "object") {
    return base;
  }
  const record = raw as Record<string, unknown>;
  return {
    theme: record.theme === null ? null : isSiteTheme(record.theme) ? record.theme : null,
    adsEnabled: record.adsEnabled === true,
    analyticsEnabled: record.analyticsEnabled !== false,
    urlImportEnabled: record.urlImportEnabled !== false,
    discordEnabled: record.discordEnabled !== false,
  };
}

export function parseHubConfig(raw: string | null): HubConfig {
  if (!raw) {
    return structuredClone(DEFAULT_HUB_CONFIG);
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return structuredClone(DEFAULT_HUB_CONFIG);
    }
    const record = parsed as Record<string, unknown>;
    const sitesRaw =
      record.sites && typeof record.sites === "object" ? (record.sites as Record<string, unknown>) : {};
    return {
      version: 1,
      updatedAt: typeof record.updatedAt === "string" ? record.updatedAt : null,
      theme: isSiteTheme(record.theme) ? record.theme : "default",
      discordUrl:
        typeof record.discordUrl === "string" && record.discordUrl.startsWith("http")
          ? record.discordUrl
          : studio.discordUrl,
      sites: {
        omnaworks: parseSiteFlags(sitesRaw.omnaworks),
        audiova: parseSiteFlags(sitesRaw.audiova),
        videova: parseSiteFlags(sitesRaw.videova),
      },
    };
  } catch {
    return structuredClone(DEFAULT_HUB_CONFIG);
  }
}

export async function readHubConfig(): Promise<HubConfig> {
  try {
    const raw = await readFile(HUB_PATH, "utf8");
    return parseHubConfig(raw);
  } catch {
    return structuredClone(DEFAULT_HUB_CONFIG);
  }
}

async function persist(config: HubConfig): Promise<HubConfig> {
  const next: HubConfig = { ...config, version: 1, updatedAt: new Date().toISOString() };
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(HUB_PATH, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  await writeFile(
    PUBLIC_MIRROR,
    `${JSON.stringify({
      theme: next.theme,
      updatedAt: next.updatedAt,
      discordUrl: next.discordUrl,
      sites: Object.fromEntries(
        HUB_SITE_IDS.map((id) => {
          const resolved = resolveSite(next, id);
          return [
            id,
            {
              theme: resolved.theme,
              themeSource: resolved.themeSource,
              adsEnabled: resolved.adsEnabled,
              analyticsEnabled: resolved.analyticsEnabled,
              urlImportEnabled: resolved.urlImportEnabled,
              discordEnabled: resolved.discordEnabled,
            },
          ];
        }),
      ),
    })}\n`,
    "utf8",
  );
  return next;
}

export function resolveSite(config: HubConfig, id: HubSiteId): ResolvedSiteConfig {
  const site = config.sites[id] ?? defaultSite();
  const theme = site.theme ?? config.theme;
  return {
    id,
    theme,
    themeSource: site.theme ? "site" : "global",
    adsEnabled: site.adsEnabled,
    analyticsEnabled: site.analyticsEnabled,
    urlImportEnabled: site.urlImportEnabled,
    discordEnabled: site.discordEnabled,
    discordUrl: config.discordUrl,
    updatedAt: config.updatedAt,
  };
}

export async function writeHubTheme(theme: SiteTheme): Promise<HubConfig> {
  const current = await readHubConfig();
  return persist({ ...current, theme });
}

export async function writeHubSite(
  id: HubSiteId,
  partial: Partial<HubSiteFlags>,
): Promise<HubConfig> {
  const current = await readHubConfig();
  const previous = current.sites[id] ?? defaultSite();
  const nextSite: HubSiteFlags = {
    ...previous,
    ...partial,
    theme:
      partial.theme === null
        ? null
        : partial.theme !== undefined
          ? isSiteTheme(partial.theme)
            ? partial.theme
            : previous.theme
          : previous.theme,
  };
  return persist({
    ...current,
    sites: { ...current.sites, [id]: nextSite },
  });
}

export async function writeHubDiscord(discordUrl: string): Promise<HubConfig> {
  const current = await readHubConfig();
  return persist({ ...current, discordUrl });
}

export function hubSnapshot(config: HubConfig) {
  const sites = {
    omnaworks: resolveSite(config, "omnaworks"),
    audiova: resolveSite(config, "audiova"),
    videova: resolveSite(config, "videova"),
  } as const satisfies Record<HubSiteId, ResolvedSiteConfig>;

  return {
    version: config.version as 1,
    updatedAt: config.updatedAt,
    theme: config.theme,
    discordUrl: config.discordUrl,
    catalog: THEME_CATALOG,
    sites,
  };
}
