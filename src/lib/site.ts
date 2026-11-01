export function getSiteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (value && /^https?:\/\/[^\s]+$/.test(value)) {
    return value;
  }
  return "http://localhost:3010";
}
