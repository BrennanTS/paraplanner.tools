# Paraplanner.tools (beta)

A static site with industry updates and planning defaults for paraplanners. There's no build step and no dependencies.

- `index.html`: landing page and industry feed. Edit `assets/insights.js` to add items.
- `assumptions.html`: the team's default plan assumptions. Edit `assets/assumptions.js` to change them.

To refresh the 30-year CPI inflation figure from BLS, run `node scripts/update-cpi.mjs`.

To preview locally, run `npx serve .`. Deploys to Vercel with no config beyond `vercel.json`.
