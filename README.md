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

## Production

```powershell
npm run build
npm start
```

Le build produit le mode `standalone`. `npm start` lance `node .next/standalone/server.js`.

Sur l'hébergeur (Hostinger / railpack), définir :

| Variable | Valeur |
| --- | --- |
| `HOSTNAME` | `0.0.0.0` |
| `PORT` | laisser celle de la plateforme (souvent `3000`) |
| `NEXT_PUBLIC_SITE_URL` | URL publique HTTPS, sans slash final |
| `OW_AUTH_SECRET` | secret ≥ 32 caractères |

Health check : `GET /api/health`. Le Dockerfile du dépôt force déjà `HOSTNAME=0.0.0.0` et le port `3000`.

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
