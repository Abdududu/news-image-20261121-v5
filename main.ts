// THE WORLD IN ONE DAY — Saturday 21 November 2026.
// A visually rich illustrated digest of the day's world news: 35 dated stories
// across 7 regions, drawn as one page. The image is pre-rendered into
// assets/news.png by scripts/build-page.mjs + scripts/render.mjs (Playwright);
// this entrypoint copies it to the output directory as entry.png.
// Offline, deterministic: the same input always writes the same bytes.
// The output directory comes from MAKEFUN_OUTPUT_DIR when the grader sets it;
// otherwise it defaults to ./out next to this file.
import { copyFileSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, 'assets', 'news.png');
const outDir = process.env.MAKEFUN_OUTPUT_DIR || join(root, 'out');
const out = join(outDir, 'entry.png');

// Validate the source image before copying.
const buf = readFileSync(src);
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!buf.subarray(0, 8).equals(PNG_SIG)) throw new Error('assets/news.png is not a PNG');
if (buf.length > 1024 * 1024) throw new Error('assets/news.png exceeds the 1 MiB limit');
const width = buf.readUInt32BE(16);
const height = buf.readUInt32BE(20);
if (width > 1024 || height > 1024) throw new Error('assets/news.png exceeds 1024x1024');

mkdirSync(outDir, { recursive: true });
copyFileSync(src, out);

// Write a small manifest describing the entry (deterministic content).
const manifest = {
  title: 'The World in One Day — Saturday 21 November 2026',
  stories: 35,
  regions: 7,
  image: 'entry.png',
  width,
  height,
  bytes: buf.length,
};
writeFileSync(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');

const written = statSync(out);
console.log(`wrote ${out} (${written.size} bytes, ${width}x${height})`);
