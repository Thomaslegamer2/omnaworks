import { canWriteHub, hubJson, hubOptions } from "@/lib/hub/http";
import { readHubConfig, writeHubTheme } from "@/lib/hub/store";
import { isSiteTheme } from "@/lib/hub/themes";

export function OPTIONS() {
  return hubOptions();
}

export async function GET() {
  const config = await readHubConfig();
  return hubJson({
    theme: config.theme,
    updatedAt: config.updatedAt,
    discordUrl: config.discordUrl,
  });
}

/** Applique un thème global pour tous les sites (sauf override site). */
export async function POST(request: Request) {
  if (!(await canWriteHub(request))) {
    return hubJson({ error: "unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return hubJson({ error: "invalid" }, { status: 400 });
  }

  const theme =
    body && typeof body === "object" && "theme" in body
      ? (body as { theme: unknown }).theme
      : null;

  if (!isSiteTheme(theme)) {
    return hubJson({ error: "theme-invalid" }, { status: 400 });
  }

  const config = await writeHubTheme(theme);
  return hubJson({
    theme: config.theme,
    updatedAt: config.updatedAt,
    discordUrl: config.discordUrl,
  });
}
