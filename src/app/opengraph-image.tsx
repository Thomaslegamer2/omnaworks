import { ImageResponse } from "next/og";

export const alt = "Omnaworks, le site de l'équipe derrière Audiova";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#050510",
          color: "#ffffff",
          padding: "72px",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: "0.18em", color: "#e879ff" }}>STUDIO</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
            <svg width="88" height="88" viewBox="0 0 64 64">
              <defs>
                <linearGradient id="g" x1="6" y1="8" x2="58" y2="56">
                  <stop offset="0%" stopColor="#D600FF" />
                  <stop offset="48%" stopColor="#8A2BE2" />
                  <stop offset="100%" stopColor="#00D1FF" />
                </linearGradient>
              </defs>
              <rect width="64" height="64" rx="14" fill="#0b0c1a" />
              <path
                d="M32 10 L48.5 19.5 V38.5 L32 48 L15.5 38.5 V19.5 Z"
                fill="none"
                stroke="url(#g)"
                strokeWidth="3.2"
                strokeLinejoin="round"
              />
              <circle cx="32" cy="29" r="7.5" fill="none" stroke="url(#g)" strokeWidth="2.6" />
              <path
                d="M32 24.2 V29 L35.8 31.4"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="32" cy="41.5" r="1.7" fill="#00D1FF" />
            </svg>
            <div style={{ fontSize: 92, lineHeight: 0.9, fontWeight: 600 }}>Omnaworks</div>
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: "#9aa0b8", maxWidth: 820 }}>
            Maison derrière Audiova. Convertisseur audio dans le navigateur.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
