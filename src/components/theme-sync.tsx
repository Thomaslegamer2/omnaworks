"use client";

import { useLayoutEffect } from "react";
import { isSiteTheme } from "@/lib/hub/themes";

const STORAGE_KEY = "omnaworks.site-theme";

function applyTheme(theme: string) {
  if (!isSiteTheme(theme)) {
    return;
  }
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // ignore
  }
}

export function ThemeSync() {
  useLayoutEffect(() => {
    let cancelled = false;

    try {
      const cached = window.localStorage.getItem(STORAGE_KEY);
      if (cached) {
        applyTheme(cached);
      }
    } catch {
      // ignore
    }

    (async () => {
      try {
        const response = await fetch(`/api/hub/sites/omnaworks?ts=${Date.now()}`, { cache: "no-store" });
        if (!response.ok || cancelled) {
          return;
        }
        const data: unknown = await response.json();
        if (
          data &&
          typeof data === "object" &&
          "theme" in data &&
          typeof (data as { theme: unknown }).theme === "string"
        ) {
          applyTheme((data as { theme: string }).theme);
        }
      } catch {
        // keep default
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
