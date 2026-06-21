# GitHub Pages deployment

## Quick deploy

```bash
npm install --save-dev gh-pages
npm run deploy
```

Base path is set to `/Sora-Cafe/` for [github.com/ShirinaH/Sora-Cafe](https://github.com/ShirinaH/Sora-Cafe).

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
