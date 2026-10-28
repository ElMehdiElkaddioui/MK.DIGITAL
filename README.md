# MK DIGITAL — Site du studio

React 19 · Vite · TypeScript · Tailwind CSS 4 · GSAP / ScrollTrigger · Lenis. Site 100 % statique, prêt pour Netlify.

## Commandes

| | |
|---|---|
| `npm install` | installer les dépendances |
| `npm run dev` | serveur de développement |
| `npm run build` | vérification TypeScript + build de production dans `dist/` |
| `npm run preview` | servir `dist/` en local (http://localhost:4173) |
| `npm run images` | régénérer logos, favicons, image Open Graph et captures depuis `assets-src/` |

## Déployer sur Netlify

**Option A — dépôt Git (recommandé)**
1. Pousser ce dossier sur GitHub.
2. Netlify → *Add new site → Import an existing project* → choisir le dépôt.
3. Les réglages sont lus depuis `netlify.toml` (build `npm run build`, publication `dist`, Node 22).
4. L'URL canonique, `og:url`, `og:image` et `sitemap.xml` utilisent automatiquement l'URL Netlify du site.
5. Domaine personnalisé plus tard : ajouter la variable `VITE_SITE_URL=https://votre-domaine.ma` (*Site configuration → Environment variables*) puis redéployer.

**Option B — glisser-déposer**
Construire avec l'URL finale pour que le SEO soit correct, puis déposer `dist/` sur https://app.netlify.com/drop :
```bash
VITE_SITE_URL=https://votre-site.netlify.app npm run build
```

### Formulaire de contact (Netlify Forms)
- Le formulaire `contact` est détecté au déploiement grâce à la copie statique dans `index.html`.
- Vérifier que la détection est activée : *Site configuration → Forms → Enable form detection*, puis redéployer.
- Les messages arrivent dans *Forms*. Pour les recevoir par email : *Forms → Form notifications → Email notification* → `mkdigitalweb7@gmail.com`.
- Anti-spam : champ « honeypot » `bot-field` (+ filtre Akismet de Netlify).
- En local (`npm run preview`), l'envoi affiche le message d'erreur avec les boutons WhatsApp / email de secours : c'est normal, le formulaire ne fonctionne qu'une fois déployé.

## Où modifier quoi

- **Coordonnées, liens, texte d'avertissement** → `src/data/site.ts`
- **Projets** (textes, technologies, statut, liens) → `src/data/projects.ts`
  - `relation: 'client' | 'demo' | 'concept'` pilote l'étiquette affichée. N'utiliser `'client'` que pour une relation confirmée.
- **Titres et descriptions SEO** → `src/data/seo.ts`
- **Services, atouts, étapes du process** → en tête de `src/sections/Services.tsx`, `Why.tsx`, `Process.tsx`
- **Couleurs, typographies, boutons** → `src/index.css`

## Images

- `assets-src/logos/` — les trois logos fournis (originaux).
- `assets-src/shots/` — captures des sites en ligne (bureau 1440 px @1,5x, mobile 390 px @2x).
- `public/brand/`, `public/work/`, favicons, `og-image.jpg` — générés par `npm run images` (WebP, plusieurs tailles). Les logos sont détourés sans être redessinés.

Pour ajouter un projet : déposer `nom-d1.png`, `nom-d2.png`, `nom-d3.png`, `nom-m1.png` dans `assets-src/shots/`, lancer `npm run images`, puis ajouter l'entrée dans `src/data/projects.ts` (les pages `/projets/<slug>` et le sitemap sont générés au build).

## Notes techniques

- Pages d'étude de cas pré-générées (`dist/projets/<slug>/index.html`) avec leurs propres titre, description et canonical ; repli SPA pour le reste (page 404 intégrée).
- Animations désactivées avec `prefers-reduced-motion` ; curseur personnalisé et effets magnétiques uniquement sur souris.
- L'introduction animée ne joue qu'une fois par session ; le logo est affiché dès le HTML (avant le JavaScript).
