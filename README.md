<div align="center">

<img src="docs/img/banner.svg" alt="Reverse-Engineer a Paper" width="100%">

<br>

**English** · [中文](README.zh-CN.md)

[![Live demo](https://img.shields.io/badge/live%20demo-open-2f7d5a?style=for-the-badge)](https://shentonyan.github.io/reverse-engineer-a-paper/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
![No build step](https://img.shields.io/badge/build-none-lightgrey?style=for-the-badge)
![HTML · CSS · JS](https://img.shields.io/badge/HTML%20·%20CSS%20·%20JS-single%20file-f2b45e?style=for-the-badge)

</div>

A single-page, scroll-driven explainer about the *reverse-engineering* approach to writing science papers. Each watercolour-style square stands for one sentence of a paper. As you scroll, the squares regroup to show how a paper is organised, what each sentence is for, and how to learn the pattern from articles in your own field. Three small exercises follow.

The page is bilingual (English / 中文), follows your light or dark system theme, and works on phones.

<p align="center">
  <img src="docs/img/scene-hourglass.png" alt="The hourglass shape of a paper: title and abstract on top, introduction narrowing to results, discussion opening back out" width="86%">
</p>

## Contents

- [What you can do on the page](#what-you-can-do-on-the-page)
- [The six scenes](#the-six-scenes)
- [Run it](#run-it)
- [Put it online with GitHub Pages](#put-it-online-with-github-pages)
- [Make it yours](#make-it-yours)
- [Repository layout](#repository-layout)
- [Sources and credits](#sources-and-credits)
- [License](#license)

## What you can do on the page

| | |
|---|---|
| **Scroll** | Six scenes on one sticky canvas. Squares fly from one arrangement to the next. |
| **Exercise 1** | Pick the job of each sentence in an invented introduction (background, problem, gap, aim, value, roadmap), then check your answers. |
| **Exercise 2** | Switch a verb between past, present and modal and see how the same claim reads. |
| **Exercise 3** | Tick an eight-question checklist for your own draft. Ticks are kept in the browser's local storage. |
| **Language** | EN / 中文 toggle in the header. Your choice is remembered. |

<table>
<tr>
<td width="50%"><img src="docs/img/scene-sentences.png" alt="Six sentences of one introduction, each with a labelled job"></td>
<td width="50%"><img src="docs/img/exercise.png" alt="Exercise 1: label the job of each sentence and check the answers"></td>
</tr>
<tr>
<td align="center"><sub>Six sentences, six jobs</sub></td>
<td align="center"><sub>Exercise 1 with answers checked</sub></td>
</tr>
</table>

## The six scenes

| # | Scene | What the squares show |
|---|---|---|
| 1 | A paper is made of sentences | A full sheet of squares, one per sentence (illustration, not real data). |
| 2 | Each part has a job | Colours by section: introduction, methods, results, discussion, conclusion. |
| 3 | Zoom in on one introduction | Six sentences from an invented introduction, each labelled with its job. |
| 4 | A paper has a shape | An hourglass: wide introduction, narrow results, wide discussion. |
| 5 | Copy the method, not the text | A four-step loop: model, mine, master, update. |
| 6 | Now your own paper | Back to the sheet, with a short recipe to try on your own field. |

## Run it

There is no build step and no dependency. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

The page loads two fonts (Newsreader and Hanken Grotesk) from Google Fonts. Without network access it falls back to system fonts.

## Put it online with GitHub Pages

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then `main` and `/ (root)`.
4. After a minute or two the page is live at `https://<your-username>.github.io/<repository-name>/`.

## Make it yours

Everything lives in `index.html`.

- **Text and translations**: elements carry their Chinese text in a `data-zh` attribute; the English text is the element's own content. The exercise data (`SENT`, `TENSES`, `CHECK`) and the canvas captions (`CAP`, `HG`, `LOOP`) are plain arrays near the top of the script.
- **Colours**: the page palette is a set of CSS variables on `:root` (with dark values below). The square colours are in the `PAL` object in the script.
- **Shapes**: each scene is built in the `build()` function. A scene is a list of target positions, sizes and colours for the squares, so a new arrangement is a new block there.
- **Scroll length**: the sticky area is `.tall`; its height is set by the scene count.

## Repository layout

```
.
├── index.html          the whole page (HTML, CSS and JS in one file)
├── docs/img/           banner and screenshots used in this README
├── README.md           this file
├── README.zh-CN.md     中文说明
└── LICENSE             MIT
```

## Sources and credits

- The wording and examples are original. The sample introduction is invented for the demo and is not from a real study.
- The method is inspired by Hilary Glasman-Deal, *Science Research Writing for Native and Non-native Speakers of English*, 2nd ed., World Scientific, 2020. This repository does not contain or reproduce the book. Read it for the full writing models, language lists and exercises.
- The visual approach (a full-page canvas of squares with small floating cards) was inspired by Anthropic's "Scenarios for our Economic Future" explainer. No code, fonts or assets from that page are used here.
- Fonts: [Newsreader](https://fonts.google.com/specimen/Newsreader) and [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk), both under the SIL Open Font License, served by Google Fonts.

## License

[MIT](LICENSE)
