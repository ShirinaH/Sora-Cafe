# Sora Café (空カフェ)

A pastel Japanese café-themed **sequence recall** memory game for SEG3125 Assignment 3. Remember customer orders across five shift levels at Sora Café.

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

1. Repo name: [Sora-Cafe](https://github.com/ShirinaH/Sora-Cafe)
2. Install gh-pages: `npm install --save-dev gh-pages`
3. Run: `npm run deploy`
4. Enable GitHub Pages from the `gh-pages` branch in repo Settings.

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

See [REPORT_OUTLINE.md](./REPORT_OUTLINE.md) and [ASSIGNMENT_REPORT.md](./ASSIGNMENT_REPORT.md).

## Tech stack

- React 19 + Vite
- React Router
- CSS custom properties (design tokens)
