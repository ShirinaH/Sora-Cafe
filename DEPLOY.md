# GitHub Pages deployment

## Quick deploy

```bash
npm install --save-dev gh-pages
npm run deploy
```

Update `package.json` `"build:gh-pages"` base path if your repo name differs from `momo-cafe-memory`.

Add homepage field (optional, for gh-pages CLI):

```json
"homepage": "https://YOUR_USERNAME.github.io/momo-cafe-memory"
```

## Vercel (alternative)

1. Push repo to GitHub
2. Import at vercel.com → Vite preset
3. Build: `npm run build` | Output: `dist`
4. No base path configuration required

## Post-deploy checklist

- [ ] Game loads at deployed URL
- [ ] All 5 levels playable
- [ ] Progress persists after refresh
- [ ] Link added to portfolio
- [ ] Link added to PDF report
