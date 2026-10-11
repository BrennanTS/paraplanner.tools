# Paraplanner.tools (beta)

A static site with planning assumptions, resources and tools for building high-quality financial plans. There's no build step and no dependencies.

- `index.html`: home page.
- `assumptions.html`: the team's default plan assumptions. Edit `assets/assumptions.js` to change them.
- `resources.html`: directory of official sources. Edit `assets/resources.js` to add links.
- `calculators.html`, `paraplanneros.html`: coming-soon pages.

To refresh the 30-year CPI inflation figure from BLS, run `node scripts/update-cpi.mjs`.

The whole site is behind a password gate (`middleware.js`). The password is the `SITE_PASSWORD` environment variable in Vercel, not in this repo.

To preview locally, run `npx serve .`. Deploys to Vercel with no config beyond `vercel.json`.
