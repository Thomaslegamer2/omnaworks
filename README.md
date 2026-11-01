# Omnaworks

Site maison de l'équipe derrière Audiova.

Audiova reste dans `convertube` (`audiova.site`). Ce dossier ne le remplace pas.

## Lancer

```powershell
cd $HOME\Desktop\mere
npm install
npm run dev
```

Ouvrir [http://localhost:3010](http://localhost:3010).

`NEXT_PUBLIC_SITE_URL` (voir `.env.example`) sert au canonical et au sitemap.

## Pages

- `/` accueil
- `/equipe` métiers de l'équipe
- `/produits`, `/produits/audiova`
- `/approche`
- `/contact` Discord + ticket Audiova
- `/mentions`

Logo : `public/brand/omnaworks-mark.svg`. Les prénoms se ajoutent dans `src/lib/studio.ts` (`people`).

## Vérifier

```powershell
npm run lint
npm run build
```
