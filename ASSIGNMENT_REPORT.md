# SEG3125 Assignment 3 Report

## 1. Designer

**Name:** [YOUR NAME]  
**Student Number:** [YOUR STUDENT NUMBER]

---

## 2. Game

### a. Name and type

**Sora Café (空カフェ)** is a sequence recall memory game. The player works café shifts and must remember customer orders shown as a sequence of menu icons, then tap the same items in the correct order during a recall phase. The game tests short-term and working memory for ordered sequences across five café shift levels.

### b. Inspiration

| Source | Link | How it was used |
|--------|------|-----------------|
| Pastel / lo-fi café aesthetic | https://www.pinterest.com/search/pins/?q=japanese%20cafe%20aesthetic | Warm cream surfaces, soft rose accents, cozy mood |
| Minimal UI references | https://dribbble.com/tags/minimal-ui | Clean cards, generous spacing, calm color hierarchy |
| Simon-style memory games | https://en.wikipedia.org/wiki/Simon_(game) | Core mechanic reframed as barista order-taking instead of colored buttons |

---

## 3. Storyboard with mockups

### a. Personas

Insert `assignment-images/personas/persona-yuki.png` and `assignment-images/personas/persona-tanaka.png` in your PDF.

**Persona A: Yuki Tanabe (22, design student)**  
Visual-oriented, plays in short 5-10 minute sessions, prefers calm polished UI. Comfortable with web apps on a laptop. Goal: relax between classes with a cute, low-stress memory game.

**Persona B: Mr. Kenji Tanaka (58, retired office worker)**  
Patient and methodical, values clarity over flashy animation, mild interest in memory practice. Uses a tablet and needs large tap targets. Goal: gentle daily memory exercise in Beginner mode with sound off.

### b. Storyboards (one per persona, visually different)

**Storyboard A: Minimal Sky (Yuki)**  
Powder blue theme (`#E8F2FA`), phone-style frames, horizontal level cards, chip-based setup, centered order tray with menu grid below.

| Step | File |
|------|------|
| Level and options | `assignment-images/storyboard-a/01-level-and-options.png` |
| Gameplay and feedback | `assignment-images/storyboard-a/02-gameplay-feedback.png` |
| End of game | `assignment-images/storyboard-a/03-end-of-game.png` |

**Storyboard B: Cozy Counter (Mr. Tanaka)**  
Warm cream theme (`#FFF5EB`), wide desktop-style panels, numbered level list, large sidebar setup toggles, sidebar shift info during play, gentle fail messaging on end screen.

| Step | File |
|------|------|
| Level and options | `assignment-images/storyboard-b/01-level-and-options.png` |
| Gameplay and feedback | `assignment-images/storyboard-b/02-gameplay-feedback.png` |
| End of game | `assignment-images/storyboard-b/03-end-of-game.png` |

**Design differences explored:** color theme (sky blue vs warm cream), layout (dual phone frames vs single wide panel with sidebar), information display (compact chips vs large stacked toggles), interaction model (tap grid below tray vs large menu buttons with sidebar lives and hints).

---

## 4. High-fidelity prototype

### a. Visual design choices

**Color theme:** Cream background (`#f5ebe0`), parchment surfaces, rose and brown accents. Pastel menu item colors group sweets, drinks, and teaware by similarity.

**Typography:** Zen Maru Gothic for a rounded, friendly Japanese café feel. Level titles use larger weight; breadcrumbs and hints use muted brown text.

**Layout and negative space:** Content is centered in a max-width shell with generous padding on cards, the order tray, and level map. Vintage frame borders add structure without crowding the play area.

**Gestalt principles:**

| Principle | Application |
|-----------|-------------|
| Proximity | Order slots grouped on one tray; level cards stacked as a shift list |
| Similarity | Menu buttons share size and shape; setup options use matching pill styling |
| Figure/ground | Cream tray and cards stand out against the soft background; café scenes are the focal visual |
| Continuity | Counter, Patio, and Rooftop zones connect levels in a path |
| Closure | Empty dashed slots suggest an incomplete order before the player fills them |

The live prototype combines Storyboard A's calm card flow with Storyboard B's readable setup toggles and large tap targets.

### b. Portfolio link

**Portfolio:** [YOUR PORTFOLIO URL]  
**Live game (also linked from portfolio):** [YOUR DEPLOYED URL]

---

## 5. Code

**GitHub repository:** https://github.com/ShirinaH/Sora-Cafe

---

## 6. Generative AI acknowledgement

| Area | Tool | Role |
|------|------|------|
| Mockups (personas and storyboards) | Cursor AI + Python/Pillow script | Generated PNG mockup cards and storyboard frames; text and layout were reviewed and edited |
| High-fidelity prototype | Cursor AI | Scaffolded React components, game logic, CSS tokens, and accessibility patterns; all code was tested locally |
| Report | Cursor AI | Drafted outline and report sections; I filled in personal details, links, and final wording |

All AI output was reviewed, edited, and tested before submission.
