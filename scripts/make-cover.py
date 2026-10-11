#!/usr/bin/env python3
"""Generate a README cover: watercolour-style squares on graph paper, as a single SVG.

Standard library only. Examples:

  python scripts/make-cover.py --title "Reverse-Engineer a Paper" \
      --subtitle "A scroll-driven explainer" --shape hourglass --out docs/img/banner.svg
  python scripts/make-cover.py --title "My Project" --shape ring --size 1200x630 --out cover.svg

Shapes: hourglass, ring, pyramid, scatter. Palette: sky, violet, amber, coral, teal, oat, green.
To get a PNG (for social previews), open the SVG in a browser and take a screenshot,
or convert it with any SVG tool.
"""
import argparse, math, random

COLORS = {'sky': '#82b2e6', 'violet': '#ac9fe4', 'amber': '#f2b45e', 'coral': '#ee928a',
          'teal': '#52b09c', 'oat': '#dcd5c2', 'green': '#55a883'}
PAPER, INK, MUTE = '#f9f7f1', '#1d1c19', '#6a665d'


def shape_cells(name, h, s, gap, cx, rnd):
    """Return a list of (x, y, colour) centres for the chosen shape."""
    step = s + gap
    cells = []
    if name == 'hourglass':
        rows = [('coral', 3), ('teal', 5), ('sky', 11), ('sky', 9), ('sky', 7), ('oat', 5), ('oat', 4),
                ('green', 3), ('green', 2), ('violet', 4), ('violet', 6), ('violet', 8), ('amber', 10)]
        y0 = (h - len(rows) * step) / 2 + s / 2
        for i, (c, n) in enumerate(rows):
            cells += [(cx + (k - (n - 1) / 2) * step, y0 + i * step, c) for k in range(n)]
    elif name == 'pyramid':
        n_rows = 9
        y0 = (h - n_rows * step) / 2 + s / 2
        palette = ['sky', 'violet', 'amber', 'coral', 'teal', 'green', 'oat', 'sky', 'violet']
        for i in range(n_rows):
            n = i * 2 + 1
            cells += [(cx + (k - (n - 1) / 2) * step, y0 + i * step, palette[i]) for k in range(n)]
    elif name == 'ring':
        n = 44
        r = min(h * 0.38, 150)
        names = ['sky', 'violet', 'coral', 'green']
        for k in range(n):
            a = -math.pi / 2 + k * 2 * math.pi / n
            cells.append((cx + r * math.cos(a), h / 2 + r * math.sin(a), names[int(k / n * 4)]))
    else:  # scatter
        names = list(COLORS)
        for _ in range(60):
            cells.append((cx + rnd.uniform(-230, 230), rnd.uniform(s, h - s), rnd.choice(names)))
    return cells


def build(title, subtitle, note, shape, w, h, seed):
    rnd = random.Random(seed)
    s, gap = (22, 3) if h <= 420 else (28, 4)
    cx = w * 0.75
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{title}">', '<defs>']
    for k, c in COLORS.items():
        out.append(f'<linearGradient id="g{k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{c}"/>'
                   f'<stop offset="1" stop-color="{c}" stop-opacity=".62"/></linearGradient>')
    out.append('</defs>')
    out.append(f'<rect width="{w}" height="{h}" fill="{PAPER}"/>')
    for x in range(0, w + 1, 32):
        major = x % 128 == 0
        out.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{h}" stroke="#50422a" stroke-opacity="{.16 if major else .07}" stroke-width="{1 if major else .6}"/>')
    for y in range(0, h + 1, 32):
        major = y % 128 == 0
        out.append(f'<line x1="0" y1="{y}" x2="{w}" y2="{y}" stroke="#50422a" stroke-opacity="{.16 if major else .07}" stroke-width="{1 if major else .6}"/>')
    j = lambda: rnd.uniform(-1.2, 1.2)
    for x, y, c in shape_cells(shape, h, s, gap, cx, rnd):
        x0, y0 = x - s / 2, y - s / 2
        pts = [(x0 + j(), y0 + j()), (x0 + s / 2 + j(), y0 + j()), (x0 + s + j(), y0 + j()), (x0 + s + j(), y0 + s / 2 + j()),
               (x0 + s + j(), y0 + s + j()), (x0 + s / 2 + j(), y0 + s + j()), (x0 + j(), y0 + s + j()), (x0 + j(), y0 + s / 2 + j())]
        d = ' '.join(f'{a:.1f},{b:.1f}' for a, b in pts)
        out.append(f'<polygon points="{d}" fill="url(#g{c})" stroke="#000" stroke-opacity=".18" stroke-width="1"/>')
    # title: split on the first space after half the length so two lines balance
    words, lines, cur = title.split(), [], ''
    for wd in words:
        if cur and len(cur) + len(wd) > 16:
            lines.append(cur); cur = wd
        else:
            cur = (cur + ' ' + wd).strip()
    lines.append(cur)
    fs = 54 if h <= 420 else 64
    y = h / 2 - (len(lines) - 1) * fs * 0.55 - (30 if subtitle else 0)
    out.append(f'<g font-family="Georgia, \'Times New Roman\', serif" fill="{INK}">')
    for i, ln in enumerate(lines):
        out.append(f'<text x="70" y="{y + i * fs * 1.12:.0f}" font-size="{fs}">{ln}</text>')
    out.append('</g>')
    ty = y + (len(lines) - 1) * fs * 1.12 + 52
    out.append(f'<g font-family="Helvetica, Arial, sans-serif" fill="{MUTE}" font-size="18">')
    if subtitle:
        out.append(f'<text x="72" y="{ty:.0f}">{subtitle}</text>')
    if note:
        out.append(f'<text x="72" y="{ty + 28:.0f}">{note}</text>')
    out.append('</g></svg>')
    return '\n'.join(out)


if __name__ == '__main__':
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--title', required=True)
    ap.add_argument('--subtitle', default='')
    ap.add_argument('--note', default='')
    ap.add_argument('--shape', choices=['hourglass', 'ring', 'pyramid', 'scatter'], default='hourglass')
    ap.add_argument('--size', default='1200x400', help='WIDTHxHEIGHT, e.g. 1200x400 (README) or 1200x630 (social card)')
    ap.add_argument('--seed', type=int, default=4)
    ap.add_argument('--out', required=True)
    a = ap.parse_args()
    w, h = (int(v) for v in a.size.lower().split('x'))
    with open(a.out, 'w', encoding='utf-8') as f:
        f.write(build(a.title, a.subtitle, a.note, a.shape, w, h, a.seed))
    print('wrote', a.out)
