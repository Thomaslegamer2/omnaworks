export const studio = {
  name: "Omnaworks",
  year: 2026,
  discordUrl: "https://discord.gg/hWgakkRBcc",
  description:
    "Omnaworks est la maison derrière Audiova et Videova. Le site présente l'équipe, les convertisseurs et la façon dont on travaille.",
};

export const nav = [
  { href: "/equipe", label: "Équipe" },
  { href: "/produits", label: "Produits" },
  { href: "/approche", label: "Approche" },
  { href: "/contact", label: "Contact" },
] as const;

export interface Person {
  name: string;
  role: string;
  focus: string;
}

/** Renseigner ici les prénoms quand l'équipe veut les publier. Vide = page collective. */
export const people: Person[] = [];

export const crafts = [
  {
    id: "produit",
    title: "Produit",
    summary: "Décider ce qui est livré, et l'écrire tel quel.",
    body: "Une fonction est en ligne seulement si une personne peut l'utiliser. Le reste reste marqué comme à venir. Audiova liste les formats réellement lus et marque clairement les outils encore prévus.",
  },
  {
    id: "interface",
    title: "Interface",
    summary: "Des écrans calmes, lisibles sur téléphone comme sur grand écran.",
    body: "Un état vide, une erreur et une limite doivent se comprendre sans mode d'emploi. Le convertisseur garde les actions utiles et rien d'autre.",
  },
  {
    id: "audio",
    title: "Audio",
    summary: "Convertir dans le navigateur, avec les réglages utiles.",
    body: "FFmpeg.wasm encode sur l'appareil. Le débit et la fréquence se règlent selon le format. Les métadonnées sont recopiées quand le moteur le permet. Un lien, lui, passe brièvement par le serveur, puis le fichier temporaire est effacé.",
  },
  {
    id: "fiabilite",
    title: "Fiabilité",
    summary: "Les limites sont écrites avant le bouton.",
    body: "Cent mégaoctets, cinq fichiers, une conversion à la fois, quinze minutes maximum. Ces règles sont testées, pas seulement dessinées.",
  },
] as const;

export const principles = [
  {
    title: "Le navigateur d'abord",
    body: "Audiova et Videova encodent sur l'appareil. Le fichier choisi n'est pas envoyé pour être converti. Le moteur WebAssembly se charge une fois, puis le travail reste local.",
  },
  {
    title: "Des outils que l'on quitte",
    body: "Pas de compte obligatoire. On ouvre le convertisseur, on choisit un format, on télécharge le résultat. Un compte Omnaworks optionnel relie les sites du groupe.",
  },
  {
    title: "Une promesse à la hauteur du code",
    body: "Pas de chiffres d'audience inventés, pas de société fictive, pas de fonction présentée comme prête alors qu'elle est encore fermée.",
  },
] as const;

export interface Product {
  slug: "audiova" | "videova";
  name: string;
  slogan: string;
  status: "En ligne" | "En chantier";
  href: string;
  externalHref?: string;
  externalLabel?: string;
  lede: string;
  summary: string;
  facts: { label: string; value: string }[];
  chapters: { title: string; paragraphs: string[] }[];
}

export const products: Product[] = [
  {
    slug: "audiova",
    name: "Audiova",
    slogan: "Your audio. Your format. Your freedom.",
    status: "En ligne",
    href: "/produits/audiova",
    externalHref: "https://audiova.site",
    externalLabel: "Ouvrir audiova.site",
    lede: "Convertisseur audio dans le navigateur. Le fichier choisi sur l'appareil reste local.",
    summary:
      "MP3, WAV, FLAC, AAC, OGG et M4A, avec débit et fréquence selon le format. Sept langues. Un lien vidéo ou audio peut être importé : le serveur récupère le média un instant, la conversion reste dans le navigateur.",
    facts: [
      { label: "Adresse", value: "audiova.site" },
      { label: "Conversion", value: "Navigateur, FFmpeg.wasm" },
      { label: "Sorties", value: "MP3, WAV, FLAC, AAC, OGG, M4A" },
      { label: "Entrées audio", value: "MP3, WAV, FLAC, OGG, Opus, AAC, M4A, AIFF, CAF, WMA, ALAC" },
      { label: "Vidéo", value: "MP4, MOV, WebM, MKV — l'image est ignorée" },
      { label: "Limites", value: "100 Mo, 5 fichiers, une conversion à la fois" },
      { label: "Langues", value: "Français, anglais, espagnol, allemand, italien, portugais, néerlandais" },
    ],
    chapters: [
      {
        title: "Ce qui se passe vraiment",
        paragraphs: [
          "On dépose un fichier, on choisit le format, on télécharge le résultat. Le moteur, environ 32 Mo, se charge depuis le site à la première conversion. C'est le programme qui voyage, pas l'audio.",
          "Le titre et l'artiste peuvent être conservés. La pochette n'est pas garantie. WAV et FLAC sont sans perte : le débit ne s'y applique pas.",
        ],
      },
      {
        title: "L'import depuis un lien",
        paragraphs: [
          "Coller une adresse est l'exception. Le serveur télécharge temporairement le média avec yt-dlp, le renvoie au navigateur, puis efface le fichier. La conversion qui suit reste locale.",
          "Cela concerne des contenus que l'on a le droit de récupérer. Audiova ne vérifie pas la titularité et n'accorde aucune autorisation.",
        ],
      },
      {
        title: "Déjà là, et pas encore",
        paragraphs: [
          "Les pages d'outils couvrent le convertisseur MP3, WAV vers MP3, MP4 vers MP3, FLAC vers MP3, M4A vers MP3 et l'extraction vidéo vers audio.",
          "Le découpeur, la fusion de pistes et l'éditeur de métadonnées avancé sont prévus. Ils ne sont pas présentés comme disponibles.",
        ],
      },
    ],
  },
  {
    slug: "videova",
    name: "Videova",
    slogan: "Your video. Your format. Your freedom.",
    status: "En ligne",
    href: "/produits/videova",
    externalHref: "http://localhost:3000",
    externalLabel: "Ouvrir Videova",
    lede: "Convertisseur vidéo dans le navigateur. Même famille qu'Audiova, dédié à l'image animée.",
    summary:
      "MP4, WebM, MOV, MKV et plus : conversion, compression, redimensionnement, GIF, découpe, rotation et extraction d'images. Traitement local via FFmpeg.wasm. Compte Omnaworks optionnel.",
    facts: [
      { label: "Adresse", value: "localhost:3000 (dev)" },
      { label: "Conversion", value: "Navigateur, FFmpeg.wasm" },
      { label: "Sorties", value: "MP4, WebM, MOV, MKV, GIF…" },
      { label: "Outils", value: "Convertir, compresser, redimensionner, découper, pivoter, frames" },
      { label: "Compte", value: "Optionnel, via Omnaworks SSO" },
      { label: "Langues", value: "Français, anglais, espagnol, allemand, italien, portugais, néerlandais" },
    ],
    chapters: [
      {
        title: "Vidéo seulement",
        paragraphs: [
          "Videova ne remplace pas Audiova. Ici, on convertit et on transforme de la vidéo. Pour l'audio, le produit du groupe reste Audiova.",
          "Les fichiers choisis sur l'appareil sont traités localement. Le moteur WebAssembly se charge depuis le site à la première conversion.",
        ],
      },
      {
        title: "Compte partagé",
        paragraphs: [
          "Un compte créé sur Omnaworks peut ouvrir une session sur Videova et Audiova via SSO. Ce n'est pas obligatoire pour convertir.",
        ],
      },
    ],
  },
];

export const now = [
  {
    label: "En ligne",
    title: "Audiova",
    body: "Le convertisseur audio est public sur audiova.site. Fichiers locaux, formats listés, import de lien temporaire.",
  },
  {
    label: "En ligne",
    title: "Videova",
    body: "Le convertisseur vidéo est disponible en local. Même thème, outils vidéo réels, compte Omnaworks optionnel.",
  },
  {
    label: "Nouveau",
    title: "Compte Omnaworks",
    body: "Inscription sur le site maison, connexion partagée vers Audiova et Videova.",
  },
] as const;

export function productBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
