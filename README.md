# Paraplanner.tools (beta)

A static site with planning assumptions, resources and tools for building high-quality financial plans. There's no build step and no dependencies.

- `index.html`: home page.
- `assumptions.html`: the team's default plan assumptions. Edit `assets/assumptions.js` to change them.
- `resources.html`: directory of official sources. Edit `assets/resources.js` to add links.

To refresh the 30-year CPI inflation figure from BLS, run `node scripts/update-cpi.mjs`.

To preview locally, run `npx serve .`. Deploys to Vercel with no config beyond `vercel.json`.
