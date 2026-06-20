# Momo's Café Memory (ももカフェ)

A pastel Japanese café-themed **sequence recall** memory game for SEG3125 Assignment 3. Play as **Momo**, a cat barista at Sora Café, remembering customer orders across five shift levels.

## Play locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a GitHub repo named `momo-cafe-memory` (or update `--base` in `package.json` to match your repo name).
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Add to `package.json` under `"homepage"`: `"https://YOUR_USERNAME.github.io/momo-cafe-memory"`
4. Run: `npm run deploy`
5. Enable GitHub Pages from the `gh-pages` branch in repo Settings.

### Deploy to Vercel

1. Push the repo to GitHub.
2. Import the project at [vercel.com](https://vercel.com).
3. Framework preset: Vite. Build command: `npm run build`. Output: `dist`.
4. No base path changes needed for Vercel.

## Game features

- **5 levels** across Counter, Patio, and Rooftop zones
- **Configuration:** menu set (Sweets / Teaware / Full Café), Beginner/Advanced difficulty, sound on/off
- **Replay hint** (Beginner, once per level on eligible shifts)
- **Keyboard support:** number keys 1–9 select menu items during recall
- **Accessibility:** ARIA live regions, focus styles, semantic landmarks
- **Progress saved** in `localStorage`

## Report resources

See [REPORT_OUTLINE.md](./REPORT_OUTLINE.md) for persona definitions, Gestalt analysis notes, storyboard checklist, and GenAI acknowledgement template.

## Tech stack

- React 19 + Vite
- React Router
- CSS custom properties (design tokens)
