import { canWriteHub, hubJson, hubOptions } from "@/lib/hub/http";
import {
  isHubSiteId,
  readHubConfig,
  resolveSite,
  writeHubSite,
} from "@/lib/hub/store";
import { isSiteTheme } from "@/lib/hub/themes";

export function OPTIONS() {
  return hubOptions();
}

type RouteContext = { params: Promise<{ id: string }> };

/** Config résolue d'un site produit — à consommer depuis Audiova / Videova. */
export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  if (!isHubSiteId(id)) {
    return hubJson({ error: "unknown-site", sites: ["omnaworks", "audiova", "videova"] }, { status: 404 });
  }
  const config = await readHubConfig();
  return hubJson(resolveSite(config, id));
}

/** Override ou flags pour un site. theme: null = revenir au thème global. */
export async function POST(request: Request, context: RouteContext) {
  if (!(await canWriteHub(request))) {
    return hubJson({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  if (!isHubSiteId(id)) {
    return hubJson({ error: "unknown-site" }, { status: 404 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return hubJson({ error: "invalid" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return hubJson({ error: "invalid" }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  const partial: {
    theme?: import("@/lib/hub/themes").SiteTheme | null;
    adsEnabled?: boolean;
    analyticsEnabled?: boolean;
    urlImportEnabled?: boolean;
    discordEnabled?: boolean;
  } = {};

  if ("theme" in record) {
    if (record.theme === null) {
      partial.theme = null;
    } else if (isSiteTheme(record.theme)) {
      partial.theme = record.theme;
    } else {
      return hubJson({ error: "theme-invalid" }, { status: 400 });
    }
  }
  if (typeof record.adsEnabled === "boolean") partial.adsEnabled = record.adsEnabled;
  if (typeof record.analyticsEnabled === "boolean") partial.analyticsEnabled = record.analyticsEnabled;
  if (typeof record.urlImportEnabled === "boolean") partial.urlImportEnabled = record.urlImportEnabled;
  if (typeof record.discordEnabled === "boolean") partial.discordEnabled = record.discordEnabled;

  const config = await writeHubSite(id, partial);
  return hubJson(resolveSite(config, id));
}
