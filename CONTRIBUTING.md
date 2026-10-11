# Contributing

Thanks for taking a look. This is a small static site, so changes are easy to try.

## Set up

```bash
npm install                      # only needed for the tests (Playwright)
npm start                        # serves the folder at http://127.0.0.1:8000
npx playwright install chromium  # once, for the tests
npm test                         # runs the smoke test (26 checks)
```

If Chromium is installed somewhere else, set `CHROMIUM_PATH` to its executable.

## Where things live

| File | What it holds |
|---|---|
| `index.html` | Page structure and the head metadata |
| `assets/style.css` | Colour tokens (light and dark), layout, the `.stacked` responsive rules |
| `assets/content.js` | All text that is data: exercises, captions, checklist. Each item is `{en, zh}` |
| `assets/app.js` | The canvas engine, the seven scenes in `build()`, exercises, language and theme |
| `tests/` | Static server and the Playwright smoke test |
| `scripts/make-cover.py` | Generates the README banner and social card |

## Guidelines

- **Original wording only.** Do not paste text from the book this project is inspired by, or from any other copyrighted source.
- **Keep both languages in step.** Every visible string needs an English and a 中文 version.
- **Keep it dependency-free at runtime.** The page should keep working when opened straight from disk.
- **Check three sizes** before opening a pull request: a wide desktop, a phone, and a portrait tablet. The test covers overflow at all three, but look at it too.
- **Run `npm test`.** CI runs the same command.

## Adding a scene

1. Add a card in `index.html` with the next `data-s` number, and update the scene count in `.tall` (`style.css`).
2. Add a branch for it in `build()` in `assets/app.js`: a list of target positions, sizes and colours.
3. Add its captions to `assets/content.js`.
4. Update the scene count in `tests/smoke.mjs`.

## Commit messages

Short, present tense, one change per commit ("Add dot navigation", "Fix tablet overlap").
