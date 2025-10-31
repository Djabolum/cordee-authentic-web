# Cordée Authentique — Site web

> Landing page Next.js pour le projet « Cordée Authentique ». Ce dépôt contient une petite application Next.js (React 18) avec un écran de splash animé (trois variantes : WebSocket-driven rope, fixed rope, et Lottie) et un tableau de monitoring minimal.

## Contenu important

- Framework : Next.js (v14+)
- Langage : TypeScript / React
- Animations : `framer-motion`, `lottie-react`
- Styling : Tailwind CSS (config minimale fournie)

## Prérequis

- Node.js 18+ recommandé
- npm (ou pnpm/yarn — les commandes ci-dessous utilisent npm)

## Installation (locale)

1. Cloner le dépôt et se placer dans le dossier :

```bash
git clone <repo-url>
cd cordee-authentic-web
```

2. Installer les dépendances :

```bash
npm install
```

3. Démarrer en mode développement :

```bash
npm run dev
# ouvre http://localhost:3000
```

4. Construire pour production (vérification) :

```bash
npm run build
npm run start   # démarre le serveur de production
```

## Scripts utiles (package.json)

- `dev` — lance Next en dev (fast refresh)
- `build` — construit l’app pour production
- `start` — sert la version buildée
- `lint` — lance le linter (si configuré)

## Tailwind CSS

Le projet contient une configuration minimale Tailwind (`tailwind.config.js`) et `styles/globals.css` avec les directives `@tailwind`. J’ai ajouté `tailwindcss` et `postcss` dans `devDependencies` et activé `tailwindcss` + `autoprefixer` dans `postcss.config.js`.

Remarques :

- Si votre environnement signale `Unknown at rule @tailwind` dans l’éditeur, exécutez `npm install` et redémarrez le serveur/éditeur pour que les extensions/linters reconnaissent Tailwind.
- Si vous préférez une version différente de Tailwind, mettez à jour `package.json` et réexécutez `npm install`.

## Composants principaux

- `components/Splash.tsx` — version client WebSocket-driven : se connecte au backend WS (champ `resonance`) et anime une corde via requestAnimationFrame. Gère `connected` et `pulse` (halo visuel).
- `components/SplashFixed.tsx` — variante fixe de la corde (utilisable sans WS).
- `components/SplashLottie.tsx` — wrapper Lottie (utilise `lottie-react`). Peut recevoir `animationData` ou `src` (URL) pour charger l’animation.
- `components/ManifestCard.tsx` — carte utilitaire (présente dans le dossier components).

## Configuration runtime / endpoints

Le projet peut consommer deux endpoints externes :


Si vous avez un backend différent, mettez à jour les URL directement dans `app/page.tsx` ou dans `components/Splash.tsx`.

Pour rendre ceci configurable (recommandé), les variables suivantes sont utilisées par l'application et peuvent être définies dans un fichier `.env.local` à la racine du projet :

- `NEXT_PUBLIC_FIELD_REST_URL` — URL REST publique qui retourne la dernière valeur du champ (JSON attendu avec `resonance` et `intent`).
- `NEXT_PUBLIC_FIELD_WS_URL` — URL WebSocket (préfixe `wss://`) utilisée par le `Splash` pour les mises à jour en temps réel.

Un fichier d'exemple a été ajouté : `.env.local.example`. Copiez-le en `.env.local` et ajustez les valeurs locales. Le fichier `.env.local` est ignoré par Git (ajouté à `.gitignore`) pour éviter de committer des valeurs spécifiques à l'environnement.

Exemple minimal (dans `.env.local`):

```
NEXT_PUBLIC_FIELD_REST_URL=https://field.ton-domaine.fr/field/last
NEXT_PUBLIC_FIELD_WS_URL=wss://cordee-authentic-productions.up.railway.app/ws/field
```

Ces variables sont préfixées par `NEXT_PUBLIC_` pour être accessibles côté client dans les composants React (Next.js inline les valeurs à la build).

## Déploiement (Vercel recommandé)

Option A — Dashboard Vercel (recommandé pour CI/CD) :

1. Crée un projet sur vercel.com et connecte ton repo GitHub/GitLab/Bitbucket.
2. Vercel détecte Next.js et propose une configuration par défaut. Déploie.

Option B — Vercel CLI (déploiement manuel depuis la machine) :

```bash
npx vercel login
npx vercel --prod
```

Notes :

- Le CLI demandera une authentification interactive la première fois.
- Assure-toi que les variables d’environnement (si utilisées) sont configurées dans le dashboard Vercel.

## Résolution de problèmes courants

- Erreur `Your custom PostCSS configuration must export a 'plugins' key.` : vérifier `postcss.config.js` — il doit exporter `plugins` (le dépôt contient un fichier minimal avec `tailwindcss` et `autoprefixer`).
- Erreurs liées à `@tailwind` inconnues dans l’éditeur : exécuter `npm install` et redémarrer l’IDE/extension Tailwind.
- Erreurs de build dues à fichiers corrompus/concaténés (symptômes : `import`/`export` dupliqués, `Unexpected token`) : remplacer le fichier par une version propre (je peux m'en charger si tu fournis le détail).
- Erreurs de typings (framer-motion) : si TypeScript signale des types manquants, installer `@types` nécessaires ou adapter les usages (j’ai déjà appliqué quelques ajustements dans le repo pour éviter des blocages de build).

## Tests

Il n’y a pas de tests automatisés inclus pour l’instant. Si tu veux, je peux ajouter :

- tests unitaires (Vitest / Jest) pour composants critiques
- tests d’intégration légers pour les pages Next

## Contribution

Si tu veux que j’ajoute :

- extraction des endpoints dans `.env.local` (facilite déploiement),
- script de déploiement automatisé vers Vercel,
- inclusion d’un fichier `public/splash.json` Lottie et insertion automatique dans la page,
  dis-moi et je l’implémente.

## Licence

Ajoute ici la licence que tu souhaites (ex. MIT). Par défaut, aucun fichier LICENSE n’est inclus.

---

Si tu veux que j’ajoute un exemple d’`animation.json` Lottie dans `public/` et que j’oriente `SplashLottie` dessus, dis-le et je m’en occupe. Voulez‑tu que je pousse ce README dans la branche `main` maintenant (je l’ai déjà ajouté localement) ?
