<div align="center">

<img src="docs/img/banner.svg" alt="Reverse-Engineer a Paper" width="100%">

<br>

[English](README.md) · **中文**

[![在线演示](https://img.shields.io/badge/在线演示-打开-2f7d5a?style=for-the-badge)](https://shentonyan.github.io/reverse-engineer-a-paper/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
![无需构建](https://img.shields.io/badge/构建-无需-lightgrey?style=for-the-badge)
![HTML · CSS · JS](https://img.shields.io/badge/HTML%20·%20CSS%20·%20JS-单文件-f2b45e?style=for-the-badge)

</div>

一个单页、随滚动展开的讲解页，介绍用“逆向工程”方法写科研论文。每个水彩质感的方块代表论文里的一句话。滚动时，方块重新排列，展示论文是怎样组织的、每句话有什么作用，以及怎样从自己领域的文章里学到这套写法。后面附三个小练习。

页面支持中英双语，跟随系统的浅色 / 深色主题，手机上也能用。

<p align="center">
  <img src="docs/img/scene-hourglass.png" alt="论文的沙漏形状：标题和摘要在上，引言收窄到结果，讨论再向外打开" width="86%">
</p>

## 目录

- [页面里能做什么](#页面里能做什么)
- [六个场景](#六个场景)
- [本地运行](#本地运行)
- [用 GitHub Pages 上线](#用-github-pages-上线)
- [改成你自己的](#改成你自己的)
- [仓库结构](#仓库结构)
- [来源与致谢](#来源与致谢)
- [许可证](#许可证)

## 页面里能做什么

| | |
|---|---|
| **滚动** | 一块固定的画布上有六个场景，方块从一种排列飞向下一种。 |
| **练习一** | 为一段虚构引言里的每句话选功能（背景、问题、研究空白、目的、价值、文章结构），再检查答案。 |
| **练习二** | 把动词在过去时、现在时和情态动词之间切换，看同一个论断读起来有什么不同。 |
| **练习三** | 为自己的草稿勾选八个问题的清单，勾选状态保存在浏览器本地。 |
| **语言** | 顶部可切换 EN / 中文，会记住你的选择。 |

<table>
<tr>
<td width="50%"><img src="docs/img/scene-sentences.png" alt="一段引言的六句话，每句标出功能"></td>
<td width="50%"><img src="docs/img/exercise.png" alt="练习一：为每句话标功能并检查答案"></td>
</tr>
<tr>
<td align="center"><sub>六句话，六种功能</sub></td>
<td align="center"><sub>练习一，已检查答案</sub></td>
</tr>
</table>

## 六个场景

| # | 场景 | 方块展示的内容 |
|---|---|---|
| 1 | 论文由句子构成 | 铺满整张纸的方块，一个方块一句话（示意，非真实数据）。 |
| 2 | 每个部分各有职责 | 按引言、方法、结果、讨论、结论分色。 |
| 3 | 拿一篇引言放大看 | 虚构引言里的六句话，各自标出功能。 |
| 4 | 论文是有形状的 | 沙漏：引言宽，结果窄，讨论再变宽。 |
| 5 | 学方法，而不是抄文字 | 四步循环：建模、挖词、掌握、更新。 |
| 6 | 轮到你的论文了 | 回到整张纸，附一个可在自己领域试用的简短做法。 |

## 本地运行

无需构建，也没有依赖。用浏览器直接打开 `index.html`，或者起一个本地服务：

```bash
python -m http.server 8000
# 然后访问 http://localhost:8000
```

页面会从 Google Fonts 加载两款字体（Newsreader 和 Hanken Grotesk）。没有网络时会回退到系统字体。

## 用 GitHub Pages 上线

1. 把仓库推送到 GitHub。
2. 打开 **Settings → Pages**。
3. 在 **Build and deployment** 下选择 **Deploy from a branch**，分支选 `main`，目录选 `/ (root)`。
4. 一两分钟后即可通过 `https://<你的用户名>.github.io/<仓库名>/` 访问。

## 改成你自己的

所有内容都在 `index.html` 里。

- **文字与翻译**：元素的英文是它本身的内容，中文放在 `data-zh` 属性里。练习的数据（`SENT`、`TENSES`、`CHECK`）和画布上的标注（`CAP`、`HG`、`LOOP`）是脚本开头附近的普通数组。
- **颜色**：页面配色是 `:root` 上的一组 CSS 变量（深色值在其后）。方块的颜色在脚本里的 `PAL` 对象中。
- **形状**：每个场景都在 `build()` 函数里生成。一个场景就是一组方块的目标位置、大小和颜色，新增排列只需新增一段。
- **滚动长度**：固定画布的外层是 `.tall`，高度由场景数量决定。

## 仓库结构

```
.
├── index.html          整个页面（HTML、CSS、JS 在同一个文件里）
├── docs/img/           README 里用到的横幅和截图
├── README.md           英文说明
├── README.zh-CN.md     本文件
└── LICENSE             MIT
```

## 来源与致谢

- 文字和示例均为原创，示例引言是为演示而虚构的，并非来自真实研究。
- 方法灵感来自 Hilary Glasman-Deal，《Science Research Writing for Native and Non-native Speakers of English》第 2 版，World Scientific，2020。本仓库不包含也不复刻该书内容，完整的写作模型、词汇清单和练习请阅读原书。
- 视觉思路（满屏方块画布加小型浮动卡片）受 Anthropic 的 “Scenarios for our Economic Future” 页面启发，没有使用该页面的任何代码、字体或素材。
- 字体：[Newsreader](https://fonts.google.com/specimen/Newsreader) 和 [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk)，均为 SIL 开源字体许可，由 Google Fonts 提供。

## 许可证

[MIT](LICENSE)
