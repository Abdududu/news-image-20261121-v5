# The World in One Day — Saturday 21 November 2026

[![make.fun · news-image-20261121](https://make.fun/badge/news-image-20261121.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![make.fun · rank](https://make.fun/badge/news-image-20261121/Abdududu/news-image-20261121-v5/rank.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)
[![make.fun · reward](https://make.fun/badge/news-image-20261121/Abdududu/news-image-20261121-v5/reward.svg)](https://make.fun/bounty/news-image-20261121?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261121)

An entry for the [make.fun bounty "Sum up 21 November's world news in one image"](https://make.fun/bounty/news-image-20261121).

## What it is

A visually rich illustrated digest of Saturday 21 November 2026: **35 dated stories across 7 regions** on one page — not a wall of text, but a picture-led front page:

- A big masthead with the day's top threads, and a **stats strip** of six key numbers (COP31 day 13, 5 missiles down, quake 6.7, 146 safe, bitcoin $58,983, Rahul 124\*).
- **Three large illustrated hero cards** — COP31 overtime (globe, thermometer, clock), Saudi missiles (night skyline, missile trails), Peru quake 6.7 (seismograph, house) — each drawn as original inline SVG.
- **Ten smaller illustrated cards** — Kyiv, Hormuz, Iran, Trump AI tax, China–Japan, Davao, Canberra, Bitcoin, Russell P1, Rahul 124\* — each with its own small drawing.
- A **world map** ("Where it happened") with a numbered pin for every story.
- **"Also on Saturday 21 November 2026 · 22 more stories"** — the remaining stories, numbered and sourced.
- A **DATE CHECK** box that honestly lists what was left out and why (Friday's news, unagreed texts, unconfirmed claims).

Every story happened, or was first reported, on Saturday 21 November 2026, and is attributed to the outlet that reported it.

## How it works

- `data/news.json` holds the 35 stories (number, region, place, headline, summary, source, map position).
- `scripts/build-page.mjs` turns the data into `build/page.html`, with all illustrations drawn as inline SVG — no external images, no network.
- `scripts/render.mjs` renders the page to `assets/news.png` (1024×1024 PNG) with Playwright + Chromium.
- `main.ts` (Node 22, standard library only) copies `assets/news.png` to the output directory as `entry.png`, validating the PNG signature, the 1 MiB limit and the 1024×1024 size, and writes a small `manifest.json`. It is deterministic: running it twice writes identical bytes.

## Run it

```sh
node scripts/build-page.mjs
node scripts/render.mjs
MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
