# SEG3125 Assignment 3 — Report Outline

Use this outline when writing your PDF report. Fill in portfolio and GitHub links where indicated.

---

## 1. Game Concept

**Name:** Momo's Café Memory (ももカフェ)

**Type:** Sequence recall memory game (Simon-style, café-themed)

**Mechanic:** The game displays a customer order as a sequence of menu icons. After a study phase, the player reproduces the order by tapping items in the correct sequence. Momo the cat barista is the player avatar progressing through café shift levels.

**Memory tested:** Short-term / working memory for ordered sequences.

---

## 2. Inspiration

Document 2–3 links to inspiration (pastel UI, Japanese café aesthetics, memory games) and describe what you borrowed:

- Soft blue minimalist palettes (powder blue + cream)
- Kawaii café / lo-fi study aesthetic
- Sequence recall games (Simon Says) reframed as barista order-taking

---

## 3. Personas

### Persona A — Yuki (22, design student)

- **Characteristics:** Visual-oriented; short play sessions; values calm, polished UI
- **Technology:** Laptop user, comfortable with web apps
- **Goal:** Relax between classes with a cute, low-stress memory game

### Persona B — Mr. Tanaka (58, retiree)

- **Characteristics:** Patient; prefers clarity; mild interest in memory practice
- **Technology:** Tablet user; needs large tap targets
- **Goal:** Gentle daily memory exercise without time pressure (Beginner + sound off)

---

## 4. Storyboards (2 required — visually different)

Create in Figma. Each storyboard: level select → gameplay (success + fail) → end screen.

### Storyboard A — Minimal Sky (Yuki)

- Powder blue background `#E8F2FA`, wide whitespace
- Horizontal level cards, top breadcrumb navigation
- Centered order tray, menu grid below

### Storyboard B — Cozy Counter (Mr. Tanaka)

- Warm cream background `#FFF5EB`
- Left sidebar with large setup toggles
- Denser layout; prominent Retry button on fail screen

---

## 5. High-Fidelity Prototype Analysis

### Color theme

- Powder blue background, cream surfaces, soft indigo accents
- Pastel menu item colors group sweets vs. drinks (similarity)

### Typography

- Zen Maru Gothic — rounded, friendly, Japanese café feel
- Hierarchy: h1 level names > body descriptions > muted breadcrumbs

### Layout and negative space

- Centered max-width shell (960px)
- Generous padding on cards and order tray

### Gestalt principles applied

| Principle | Application |
|-----------|-------------|
| **Proximity** | Order slots grouped on one tray; level cards stacked as a shift list |
| **Similarity** | All menu buttons same size/shape; chips share pill styling |
| **Figure/Ground** | Cream tray on blue background; Momo as focal character |
| **Continuity** | Zone path (Counter → Patio → Rooftop) connects levels |
| **Closure** | Empty dashed slots imply incomplete order |

### Organization / Input / Navigation patterns

- **Hub:** Level map as home
- **Wizard:** Setup → Play → Results flow
- **Input:** Tap-to-select menu items; keyboard number shortcuts
- **Feedback:** Lives hearts, shake animation, ARIA live announcements

---

## 6. Links

- **Portfolio:** [YOUR PORTFOLIO URL]
- **Live game:** [YOUR DEPLOYED URL]
- **GitHub:** [YOUR REPO URL]

---

## 7. GenAI Acknowledgement

Describe how generative AI was used, for example:

- Brainstorming game concept and café theme with Cursor AI
- Scaffolding React components, game state hook, and CSS design tokens
- Drafting this report outline and persona descriptions

State which tools (e.g. Cursor, ChatGPT) and that you reviewed, edited, and tested all outputs.

---

## 8. Figma Storyboard Checklist

- [ ] Storyboard A: Level map mockup
- [ ] Storyboard A: Study phase + recall phase
- [ ] Storyboard A: Win screen with Momo celebrate
- [ ] Storyboard B: Setup with large toggles
- [ ] Storyboard B: Gameplay with sidebar layout
- [ ] Storyboard B: Fail state with gentle messaging
