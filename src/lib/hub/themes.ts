export const SITE_THEMES = [
  "default",
  "newyear",
  "valentine",
  "carnival",
  "stpatrick",
  "easter",
  "spring",
  "summer",
  "bastille",
  "backtoschool",
  "autumn",
  "halloween",
  "christmas",
  "winter",
] as const;

export type SiteTheme = (typeof SITE_THEMES)[number];

export interface ThemeMeta {
  id: SiteTheme;
  label: string;
  description: string;
  accent: string;
  when: string;
}

export const THEME_CATALOG: readonly ThemeMeta[] = [
  {
    id: "default",
    label: "Omnaworks",
    description: "Magenta et cyan néon, fond nuit — identité du groupe.",
    accent: "#c84bff",
    when: "Toute l'année",
  },
  {
    id: "newyear",
    label: "Nouvel An",
    description: "Feux d'artifice, champagne et confettis dorés.",
    accent: "#ffd700",
    when: "Décembre – janvier",
  },
  {
    id: "valentine",
    label: "Saint-Valentin",
    description: "Cœurs flottants, rose et rouge amoureux.",
    accent: "#ff4d6d",
    when: "14 février",
  },
  {
    id: "carnival",
    label: "Carnaval",
    description: "Masques, confettis et couleurs vives.",
    accent: "#ff6b35",
    when: "Février – mars",
  },
  {
    id: "stpatrick",
    label: "Saint-Patrick",
    description: "Trèfles, vert émeraude et pièces d'or.",
    accent: "#22c55e",
    when: "17 mars",
  },
  {
    id: "easter",
    label: "Pâques",
    description: "Œufs, poussins, lapins et pastel printanier.",
    accent: "#f9a8d4",
    when: "Mars – avril",
  },
  {
    id: "spring",
    label: "Printemps",
    description: "Fleurs, pollen et verdure douce.",
    accent: "#86efac",
    when: "Mars – mai",
  },
  {
    id: "summer",
    label: "Été",
    description: "Soleil, vagues, plage et citrons.",
    accent: "#38bdf8",
    when: "Juin – août",
  },
  {
    id: "bastille",
    label: "14 Juillet",
    description: "Bleu-blanc-rouge et feux d'artifice.",
    accent: "#ef4444",
    when: "14 juillet",
  },
  {
    id: "backtoschool",
    label: "Rentrée",
    description: "Crayons, cahiers et feuilles d'automne.",
    accent: "#f59e0b",
    when: "Septembre",
  },
  {
    id: "autumn",
    label: "Automne",
    description: "Feuilles mortes, orange et brun chaud.",
    accent: "#ea580c",
    when: "Septembre – novembre",
  },
  {
    id: "halloween",
    label: "Halloween",
    description: "Citrouilles, fantômes, toiles, chauves-souris.",
    accent: "#ff7a18",
    when: "31 octobre",
  },
  {
    id: "christmas",
    label: "Noël",
    description: "Sapins, cadeaux, guirlande, neige et boules.",
    accent: "#e63946",
    when: "Décembre",
  },
  {
    id: "winter",
    label: "Hiver",
    description: "Neige, froid bleuté et flocons sans Noël.",
    accent: "#7dd3fc",
    when: "Décembre – février",
  },
];

export function isSiteTheme(value: unknown): value is SiteTheme {
  return typeof value === "string" && (SITE_THEMES as readonly string[]).includes(value);
}

export function themeLabel(id: SiteTheme): string {
  return THEME_CATALOG.find((item) => item.id === id)?.label ?? id;
}
