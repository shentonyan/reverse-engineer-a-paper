# Reverse-Engineer a Paper

A single-page, scroll-driven explainer (English / 中文) about the reverse-engineering approach to writing science papers. Watercolour-style squares stand for the sentences of a paper and rearrange as you scroll, followed by three small exercises.

一个单页、随滚动展开的讲解页（英文 / 中文），介绍用“逆向工程”方法写科研论文。水彩质感的方块代表论文里的句子，随滚动重新排列，后面附三个小练习。

## What is in the page

- A sticky canvas with six scenes: a sheet of sentences, the parts of a paper, the jobs of six sentences in one introduction, the hourglass shape of a paper, the four-step loop (model, mine, master, update), and a closing prompt.
- Exercise 1: label the job of each sentence in an invented introduction.
- Exercise 2: switch a verb between past, present and modal and see how the claim reads.
- Exercise 3: an eight-question checklist for your own draft (ticks are kept in the browser's local storage).
- Light and dark themes follow the system setting. EN / 中文 toggle in the header.

## Run it

No build step and no dependencies. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

It loads two fonts (Newsreader, Hanken Grotesk) from Google Fonts. Without network access the page falls back to system fonts.

To host it on GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root.

## Notes on sources

- The wording and examples are original. The sample introduction is invented for the demo and is not from a real study.
- The method is inspired by Hilary Glasman-Deal, *Science Research Writing for Native and Non-native Speakers of English*, 2nd ed., World Scientific, 2020. This repository does not contain or reproduce the book; read it for the full writing models, language lists and exercises.
- The visual approach (full-page canvas of squares, small floating cards) was inspired by Anthropic's "Scenarios for our Economic Future" explainer. No code, fonts or assets from that page are used here.

## License

MIT, see `LICENSE`.
