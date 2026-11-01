import { hubJson, hubOptions } from "@/lib/hub/http";
import { hubSnapshot, readHubConfig } from "@/lib/hub/store";

export function OPTIONS() {
  return hubOptions();
}

/** Snapshot public : thème global, sites résolus, catalogue. */
export async function GET() {
  const config = await readHubConfig();
  return hubJson(hubSnapshot(config));
}
