# Claudia Al-Amir — Data Analyst Portfolio

An editorial, motion-led portfolio presenting Claudia Al-Amir's data analytics work across Excel, Power BI, SQL, Python, Tableau, Power Query, and DAX.

## Local development

Requirements: Node.js 20 or newer and npm.

```bash
npm ci
npm run dev
```

The development server uses the same `/little-starting-place/` base path as the production site.

## Quality checks

```bash
npm test
npm run lint
npx tsc --noEmit
npm run build
```

Preview the production build with:

```bash
npm run preview
```

## GitHub Pages deployment

The repository includes a GitHub Actions workflow that tests, builds, and deploys the static site. In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. A push to `main` then publishes the site at:

`https://bishoo11.github.io/little-starting-place/`

The Vite base path, router base path, static assets, and SPA fallback are configured for that project URL.
