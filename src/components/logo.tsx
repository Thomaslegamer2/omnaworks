import Link from "next/link";
import { studio } from "@/lib/studio";

function Mark({ size, idPrefix }: { size: number; idPrefix: string }) {
  const strokeId = `${idPrefix}-stroke`;
  const coreId = `${idPrefix}-core`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className="shrink-0"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={strokeId} x1="6" y1="8" x2="58" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D600FF" />
          <stop offset="48%" stopColor="#8A2BE2" />
          <stop offset="100%" stopColor="#00D1FF" />
        </linearGradient>
        <linearGradient id={coreId} x1="24" y1="22" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E879FF" />
          <stop offset="100%" stopColor="#00D1FF" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="#050510" />
      <path
        d="M32 10 L48.5 19.5 V38.5 L32 48 L15.5 38.5 V19.5 Z"
        fill="none"
        stroke={`url(#${strokeId})`}
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="29" r="7.5" fill="none" stroke={`url(#${coreId})`} strokeWidth="2.6" />
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
  );
}

export function Logo({
  size = "nav",
}: {
  size?: "nav" | "footer";
}) {
  const dimension = size === "footer" ? 72 : 40;

  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label={studio.name}>
      <Mark size={dimension} idPrefix={size === "footer" ? "ow-foot" : "ow-nav"} />
      <span className="text-[15px] font-semibold tracking-tight">
        <span className="text-ink">Omna</span>
        <span className="gradient-text">works</span>
      </span>
    </Link>
  );
}
