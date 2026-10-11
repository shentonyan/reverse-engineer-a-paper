# Changelog

All notable changes to this project are listed here. The format follows [Keep a Changelog](https://keepachangelog.com/).

## [1.1.0]

### Added
- Scene dot navigation on the right edge of the stage (click or keyboard to jump to a scene).
- Accessibility: a live region announcing the current scene, `aria-hidden` on inactive cards, a labelled canvas, higher-contrast muted text, and full `prefers-reduced-motion` support.
- Link-preview metadata (Open Graph and Twitter tags) and a 1200×630 social card.
- Favicon, `.nojekyll`, `.gitignore`.
- Smoke test (`npm test`, Playwright) with 26 checks, plus a GitHub Actions workflow that runs it on every push and pull request.
- `scripts/make-cover.py`: a dependency-free generator for the README banner and social card.
- `CONTRIBUTING.md` and this changelog.

### Changed
- Split the single `index.html` into `index.html`, `assets/style.css`, `assets/content.js` (all text and exercise data) and `assets/app.js` (canvas engine and exercises).
- The canvas now stops rendering when nothing is moving and when it is off screen, so an idle page uses almost no CPU.
- A new stacked layout for phones and portrait tablets, so cards no longer cover the squares.
- README rewritten for the new structure.

## [1.0.0]

- First public version: seven-scene scroll story, three exercises, English / 中文, light and dark themes.
