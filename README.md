# Unai Guerra — Portfolio

Personal portfolio for Unai Guerra Matas, a cross-platform software developer. Built as a single-page, bilingual site with a game-world (`WORLD_01`) visual language: a HUD-style chrome, rarity-tagged skill cards, and a procedural ASCII mountain range that drifts behind the hero.

**Stack:** [Astro](https://astro.build) · [Tailwind CSS](https://tailwindcss.com) · React islands · TypeScript

## Features

- **Bilingual (ES/EN).** All copy lives in `src/i18n/strings.ts`. Spanish is served at `/`, English at `/en/`.
- **Signature ASCII terrain** (`src/components/AsciiTerrain.tsx`) — three parallax ridge layers driven by value noise, slow drift, a cursor equalizer that lifts ridges under the mouse, and a light/dark sun/moon with a twinkling star field. Pauses while offscreen; caps frame rate on mobile.
- **Game-world HUD** — HUD chrome, ASCII portrait, and rarity-tagged skill/system cards.
- **Light & dark themes**, toggled live via a `dark` class on `<html>`.
- **Responsive**, tuned for mobile (coarser ASCII grid, capped FPS).

## Project structure

```text
src/
├── assets/            # Images (optimized at build)
├── components/        # Astro sections + React islands (.tsx)
│   ├── AsciiTerrain.tsx    # Procedural ASCII mountains (canvas)
│   ├── AsciiPortrait.tsx   # ASCII portrait island
│   ├── GameSystems.tsx     # Rarity-tagged system cards
│   ├── Hero.astro / Hud.astro / World.astro ...
├── i18n/strings.ts    # All ES/EN copy
├── layouts/Layout.astro
├── pages/
│   ├── index.astro         # ES  → /
│   └── en/index.astro      # EN  → /en/
└── styles/global.css
```

## Commands

Run from the project root:

| Command           | Action                                    |
| :---------------- | :---------------------------------------- |
| `npm install`     | Install dependencies                      |
| `npm run dev`     | Dev server at `localhost:4321`            |
| `npm run build`   | Production build to `./dist/`             |
| `npm run preview` | Preview the production build locally      |

> **Note:** On this machine Node/npm live at `C:\Program Files\nodejs` and may not be on the shell `PATH`. Add it first, or call the binaries by full path.

## Adding or editing content

Change copy in `src/i18n/strings.ts` — the `es` and `en` objects mirror each other, so update both. Section layout lives in the matching `src/components/*.astro` files.
