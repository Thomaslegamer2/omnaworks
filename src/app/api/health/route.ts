import { NextResponse } from "next/server";

/** Réponse légère pour les health checks de l'hébergeur. */
export function GET() {
  return NextResponse.json({ ok: true, service: "omnaworks" }, { status: 200 });
}
