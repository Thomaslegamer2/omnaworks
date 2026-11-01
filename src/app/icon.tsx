import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#050510",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
        }}
      >
        <svg width="22" height="22" viewBox="0 0 64 64">
          <defs>
            <linearGradient id="g" x1="6" y1="8" x2="58" y2="56">
              <stop offset="0%" stopColor="#D600FF" />
              <stop offset="48%" stopColor="#8A2BE2" />
              <stop offset="100%" stopColor="#00D1FF" />
            </linearGradient>
          </defs>
          <path
            d="M32 10 L48.5 19.5 V38.5 L32 48 L15.5 38.5 V19.5 Z"
            fill="none"
            stroke="url(#g)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="29" r="7.5" fill="none" stroke="url(#g)" strokeWidth="3.2" />
          <path
            d="M32 24.2 V29 L35.8 31.4"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="41.5" r="2" fill="#00D1FF" />
        </svg>
      </div>
    ),
    size,
  );
}
