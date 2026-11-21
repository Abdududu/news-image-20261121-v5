// Build the v5 illustrated digest page from data/news.json.
// Writes build/page.html (1024x1024). All illustrations are inline SVG drawn
// programmatically — no external images, no network, fully deterministic.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const data = JSON.parse(readFileSync(new URL('../data/news.json', import.meta.url), 'utf8'));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ---------- SVG illustrations (flat, bold, readable at small size) ----------
function art(name, w, h) {
  const open = `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">`;
  const close = '</svg>';
  switch (name) {
    case 'cop31': // globe + thermometer + clock on pale green
      return open + `<rect width="${w}" height="${h}" fill="#e6f2e8"/>
        <circle cx="${w * 0.30}" cy="${h * 0.52}" r="${h * 0.34}" fill="#2e7d32"/>
        <path d="M ${w * 0.16} ${h * 0.42} Q ${w * 0.28} ${h * 0.30} ${w * 0.38} ${h * 0.44} Q ${w * 0.34} ${h * 0.60} ${w * 0.24} ${h * 0.58} Z" fill="#81c784"/>
        <path d="M ${w * 0.34} ${h * 0.62} Q ${w * 0.44} ${h * 0.70} ${w * 0.36} ${h * 0.78} Q ${w * 0.26} ${h * 0.74} ${w * 0.30} ${h * 0.64} Z" fill="#81c784"/>
        <path d="M ${w * 0.16} ${h * 0.52} A ${h * 0.34} ${h * 0.34} 0 0 1 ${w * 0.44} ${h * 0.52}" fill="none" stroke="#1565c0" stroke-width="3"/>
        <g transform="translate(${w * 0.62},${h * 0.18})"><rect x="0" y="0" width="${w * 0.10}" height="${h * 0.55}" rx="${w * 0.05}" fill="#fff" stroke="#b71c1c" stroke-width="2"/><rect x="${w * 0.035}" y="${h * 0.18}" width="${w * 0.03}" height="${h * 0.30}" fill="#e53935"/><circle cx="${w * 0.05}" cy="${h * 0.52}" r="${w * 0.07}" fill="#e53935"/></g>
        <g transform="translate(${w * 0.80},${h * 0.30})"><circle r="${h * 0.24}" fill="#fff" stroke="#333" stroke-width="2"/><line x1="0" y1="0" x2="0" y2="${-h * 0.15}" stroke="#333" stroke-width="2.5"/><line x1="0" y1="0" x2="${h * 0.11}" y2="${h * 0.06}" stroke="#333" stroke-width="2.5"/><circle r="2.5" fill="#b71c1c"/></g>` + close;
    case 'missiles': // night skyline + missile trails + stars
      return open + `<rect width="${w}" height="${h}" fill="#0d1b3e"/>
        <g fill="#ffd54f"><circle cx="${w * 0.12}" cy="${h * 0.18}" r="2.5"/><circle cx="${w * 0.35}" cy="${h * 0.10}" r="2"/><circle cx="${w * 0.62}" cy="${h * 0.22}" r="2.5"/><circle cx="${w * 0.85}" cy="${h * 0.12}" r="2"/><circle cx="${w * 0.50}" cy="${h * 0.30}" r="1.8"/></g>
        <g stroke="#ffb300" stroke-width="2" fill="none" stroke-dasharray="5 4"><path d="M ${w * 0.15} ${h * 0.85} Q ${w * 0.45} ${h * 0.35} ${w * 0.72} ${h * 0.30}"/><path d="M ${w * 0.30} ${h * 0.85} Q ${w * 0.55} ${h * 0.45} ${w * 0.82} ${h * 0.42}"/></g>
        <g fill="#ffb300"><polygon points="${w * 0.72},${h * 0.26} ${w * 0.76},${h * 0.32} ${w * 0.68},${h * 0.32}"/><polygon points="${w * 0.82},${h * 0.38} ${w * 0.86},${h * 0.44} ${w * 0.78},${h * 0.44}"/></g>
        <g fill="#1a2f5e"><rect x="${w * 0.05}" y="${h * 0.55}" width="${w * 0.12}" height="${h * 0.45}"/><rect x="${w * 0.20}" y="${h * 0.42}" width="${w * 0.14}" height="${h * 0.58}"/><rect x="${w * 0.38}" y="${h * 0.62}" width="${w * 0.12}" height="${h * 0.38}"/><rect x="${w * 0.54}" y="${h * 0.48}" width="${w * 0.13}" height="${h * 0.52}"/><rect x="${w * 0.70}" y="${h * 0.58}" width="${w * 0.12}" height="${h * 0.42}"/><rect x="${w * 0.85}" y="${h * 0.66}" width="${w * 0.13}" height="${h * 0.34}"/></g>
        <g fill="#ffd54f"><rect x="${w * 0.09}" y="${h * 0.62}" width="4" height="4"/><rect x="${w * 0.25}" y="${h * 0.50}" width="4" height="4"/><rect x="${w * 0.58}" y="${h * 0.55}" width="4" height="4"/><rect x="${w * 0.74}" y="${h * 0.65}" width="4" height="4"/><rect x="${w * 0.89}" y="${h * 0.72}" width="4" height="4"/></g>` + close;
    case 'quake': // seismograph + house + ground
      return open + `<rect width="${w}" height="${h}" fill="#f3e5d8"/>
        <rect y="${h * 0.72}" width="${w}" height="${h * 0.28}" fill="#d7a86e"/>
        <path d="M 0 ${h * 0.45} L ${w * 0.12} ${h * 0.45} L ${w * 0.18} ${h * 0.30} L ${w * 0.24} ${h * 0.60} L ${w * 0.30} ${h * 0.38} L ${w * 0.36} ${h * 0.52} L ${w * 0.42} ${h * 0.22} L ${w * 0.48} ${h * 0.62} L ${w * 0.54} ${h * 0.40} L ${w * 0.60} ${h * 0.50} L ${w * 0.66} ${h * 0.45} L ${w} ${h * 0.45}" fill="none" stroke="#c62828" stroke-width="3"/>
        <g transform="translate(${w * 0.68},${h * 0.42})"><polygon points="0,${h * 0.12} ${w * 0.12},${h * 0.12} ${w * 0.06},0" fill="#8d2f2f"/><rect x="${w * 0.015}" y="${h * 0.12}" width="${w * 0.09}" height="${h * 0.20}" fill="#fff8e1" stroke="#8d2f2f" stroke-width="2"/><rect x="${w * 0.045}" y="${h * 0.20}" width="${w * 0.03}" height="${h * 0.12}" fill="#5d4037"/></g>
        <path d="M ${w * 0.30} ${h * 0.72} L ${w * 0.34} ${h * 0.85} L ${w * 0.30} ${h * 0.95}" fill="none" stroke="#6d4c41" stroke-width="2.5"/>` + close;
    case 'bridge':
      return open + `<rect width="${w}" height="${h}" fill="#fff3cd"/>
        <path d="M 0 ${h * 0.78} Q ${w * 0.5} ${h * 0.25} ${w} ${h * 0.78}" fill="none" stroke="#b71c1c" stroke-width="5"/>
        <g stroke="#333" stroke-width="2"><line x1="${w * 0.2}" y1="${h * 0.62}" x2="${w * 0.2}" y2="${h * 0.78}"/><line x1="${w * 0.5}" y1="${h * 0.50}" x2="${w * 0.5}" y2="${h * 0.78}"/><line x1="${w * 0.8}" y1="${h * 0.62}" x2="${w * 0.8}" y2="${h * 0.78}"/></g>
        <rect y="${h * 0.78}" width="${w}" height="${h * 0.22}" fill="#1565c0"/>
        <polygon points="${w * 0.42},${h * 0.10} ${w * 0.58},${h * 0.10} ${w * 0.50},${h * 0.34}" fill="#f9a825" stroke="#333" stroke-width="2"/><text x="${w * 0.50}" y="${h * 0.28}" font-size="${h * 0.16}" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#333">!</text>` + close;
    case 'ship':
      return open + `<rect width="${w}" height="${h}" fill="#e3f2fd"/>
        <g fill="#37474f"><path d="M ${w * 0.12} ${h * 0.55} L ${w * 0.88} ${h * 0.55} L ${w * 0.78} ${h * 0.78} L ${w * 0.22} ${h * 0.78} Z"/><rect x="${w * 0.42}" y="${h * 0.32}" width="${w * 0.16}" height="${h * 0.23}"/></g>
        <rect x="${w * 0.48}" y="${h * 0.18}" width="3" height="${h * 0.16}" fill="#37474f"/>
        <path d="M 0 ${h * 0.85} Q ${w * 0.15} ${h * 0.78} ${w * 0.30} ${h * 0.85} T ${w * 0.60} ${h * 0.85} T ${w * 0.90} ${h * 0.85} T ${w * 1.2} ${h * 0.85}" fill="none" stroke="#1565c0" stroke-width="3"/>
        <path d="M 0 ${h * 0.93} Q ${w * 0.20} ${h * 0.87} ${w * 0.40} ${h * 0.93} T ${w * 0.80} ${h * 0.93} T ${w * 1.2} ${h * 0.93}" fill="none" stroke="#1565c0" stroke-width="2.5"/>` + close;
    case 'atom':
      return open + `<rect width="${w}" height="${h}" fill="#ede7f6"/>
        <circle cx="${w * 0.5}" cy="${h * 0.5}" r="${h * 0.10}" fill="#7e22ce"/>
        <g fill="none" stroke="#7e22ce" stroke-width="2.5"><ellipse cx="${w * 0.5}" cy="${h * 0.5}" rx="${w * 0.38}" ry="${h * 0.16}"/><ellipse cx="${w * 0.5}" cy="${h * 0.5}" rx="${w * 0.38}" ry="${h * 0.16}" transform="rotate(60 ${w * 0.5} ${h * 0.5})"/><ellipse cx="${w * 0.5}" cy="${h * 0.5}" rx="${w * 0.38}" ry="${h * 0.16}" transform="rotate(120 ${w * 0.5} ${h * 0.5})"/></g>
        <circle cx="${w * 0.86}" cy="${h * 0.34}" r="4" fill="#e53935"/><circle cx="${w * 0.18}" cy="${h * 0.66}" r="4" fill="#e53935"/><circle cx="${w * 0.72}" cy="${h * 0.78}" r="4" fill="#e53935"/>` + close;
    case 'chip':
      return open + `<rect width="${w}" height="${h}" fill="#263238"/>
        <rect x="${w * 0.22}" y="${h * 0.18}" width="${w * 0.56}" height="${h * 0.64}" rx="6" fill="#37474f" stroke="#90a4ae" stroke-width="2"/>
        <rect x="${w * 0.34}" y="${h * 0.34}" width="${w * 0.32}" height="${h * 0.32}" fill="#e53935"/>
        <text x="${w * 0.50}" y="${h * 0.56}" font-size="${h * 0.22}" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#fff">AI</text>
        <g stroke="#90a4ae" stroke-width="3"><line x1="${w * 0.30}" y1="${h * 0.18}" x2="${w * 0.30}" y2="${h * 0.06}"/><line x1="${w * 0.50}" y1="${h * 0.18}" x2="${w * 0.50}" y2="${h * 0.06}"/><line x1="${w * 0.70}" y1="${h * 0.18}" x2="${w * 0.70}" y2="${h * 0.06}"/><line x1="${w * 0.30}" y1="${h * 0.82}" x2="${w * 0.30}" y2="${h * 0.94}"/><line x1="${w * 0.50}" y1="${h * 0.82}" x2="${w * 0.50}" y2="${h * 0.94}"/><line x1="${w * 0.70}" y1="${h * 0.82}" x2="${w * 0.70}" y2="${h * 0.94}"/></g>` + close;
    case 'flags':
      return open + `<rect width="${w}" height="${h}" fill="#fce4ec"/>
        <g><rect x="${w * 0.10}" y="${h * 0.20}" width="${w * 0.34}" height="${h * 0.55}" fill="#fff" stroke="#999" stroke-width="1.5"/><circle cx="${w * 0.27}" cy="${h * 0.475}" r="${h * 0.14}" fill="#bc002d"/></g>
        <g><rect x="${w * 0.56}" y="${h * 0.20}" width="${w * 0.34}" height="${h * 0.55}" fill="#de2910"/><polygon points="${w * 0.62},${h * 0.30} ${w * 0.645},${h * 0.37} ${w * 0.60},${h * 0.33} ${w * 0.66},${h * 0.33} ${w * 0.615},${h * 0.37}" fill="#ffde00"/></g>
        <rect x="${w * 0.10}" y="${h * 0.78}" width="3" height="${h * 0.16}" fill="#666"/><rect x="${w * 0.56}" y="${h * 0.78}" width="3" height="${h * 0.16}" fill="#666"/>` + close;
    case 'plane':
      return open + `<rect width="${w}" height="${h}" fill="#e1f5fe"/>
        <g fill="#fff"><ellipse cx="${w * 0.22}" cy="${h * 0.22}" rx="${w * 0.16}" ry="${h * 0.09}"/><ellipse cx="${w * 0.78}" cy="${h * 0.30}" rx="${w * 0.14}" ry="${h * 0.08}"/><ellipse cx="${w * 0.55}" cy="${h * 0.80}" rx="${w * 0.18}" ry="${h * 0.09}"/></g>
        <g fill="#1565c0" transform="rotate(-18 ${w * 0.5} ${h * 0.5})"><path d="M ${w * 0.15} ${h * 0.52} L ${w * 0.85} ${h * 0.52} L ${w * 0.95} ${h * 0.58} L ${w * 0.85} ${h * 0.62} L ${w * 0.30} ${h * 0.62} L ${w * 0.22} ${h * 0.72} L ${w * 0.16} ${h * 0.72} L ${w * 0.24} ${h * 0.60} Z"/><path d="M ${w * 0.55} ${h * 0.52} L ${w * 0.62} ${h * 0.30} L ${w * 0.68} ${h * 0.30} L ${w * 0.66} ${h * 0.52} Z"/></g>` + close;
    case 'aitalk':
      return open + `<rect width="${w}" height="${h}" fill="#e8f5e9"/>
        <g><rect x="${w * 0.08}" y="${h * 0.14}" width="${w * 0.42}" height="${h * 0.48}" rx="8" fill="#fff" stroke="#2e7d32" stroke-width="2"/><polygon points="${w * 0.16},${h * 0.62} ${w * 0.16},${h * 0.78} ${w * 0.28},${h * 0.62}" fill="#fff" stroke="#2e7d32" stroke-width="2"/><text x="${w * 0.29}" y="${h * 0.46}" font-size="${h * 0.24}" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#2e7d32">AI</text></g>
        <g><rect x="${w * 0.50}" y="${h * 0.40}" width="${w * 0.42}" height="${h * 0.48}" rx="8" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/><polygon points="${w * 0.84},${h * 0.88} ${w * 0.84},${h * 0.72} ${w * 0.72},${h * 0.88}" fill="#c8e6c9" stroke="#2e7d32" stroke-width="2"/><text x="${w * 0.71}" y="${h * 0.72}" font-size="${h * 0.24}" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#2e7d32">AI</text></g>` + close;
    case 'chart':
      return open + `<rect width="${w}" height="${h}" fill="#1a1a2e"/>
        <text x="${w * 0.08}" y="${h * 0.22}" font-size="${h * 0.20}" font-family="Arial" font-weight="bold" fill="#f7931a">₿</text>
        <text x="${w * 0.62}" y="${h * 0.22}" font-size="${h * 0.16}" font-family="Arial" font-weight="bold" fill="#ef5350">−3.9%</text>
        <path d="M ${w * 0.08} ${h * 0.40} L ${w * 0.25} ${h * 0.45} L ${w * 0.40} ${h * 0.42} L ${w * 0.58} ${h * 0.62} L ${w * 0.75} ${h * 0.72} L ${w * 0.92} ${h * 0.82}" fill="none" stroke="#ef5350" stroke-width="3.5"/>
        <g stroke="#333a4d" stroke-width="1"><line x1="0" y1="${h * 0.40}" x2="${w}" y2="${h * 0.40}"/><line x1="0" y1="${h * 0.62}" x2="${w}" y2="${h * 0.62}"/><line x1="0" y1="${h * 0.84}" x2="${w}" y2="${h * 0.84}"/></g>` + close;
    case 'track':
      return open + `<rect width="${w}" height="${h}" fill="#37474f"/>
        <ellipse cx="${w * 0.5}" cy="${h * 0.52}" rx="${w * 0.40}" ry="${h * 0.30}" fill="none" stroke="#eceff1" stroke-width="7"/>
        <ellipse cx="${w * 0.5}" cy="${h * 0.52}" rx="${w * 0.40}" ry="${h * 0.30}" fill="none" stroke="#e53935" stroke-width="2" stroke-dasharray="8 6"/>
        <g transform="translate(${w * 0.68},${h * 0.18})"><rect width="${w * 0.22}" height="${h * 0.30}" fill="#fff" stroke="#333" stroke-width="1.5"/><g fill="#333"><rect x="0" y="0" width="${w * 0.055}" height="${h * 0.075}"/><rect x="${w * 0.11}" y="0" width="${w * 0.055}" height="${h * 0.075}"/><rect x="${w * 0.055}" y="${h * 0.075}" width="${w * 0.055}" height="${h * 0.075}"/><rect x="${w * 0.165}" y="${h * 0.075}" width="${w * 0.055}" height="${h * 0.075}"/><rect x="0" y="${h * 0.15}" width="${w * 0.055}" height="${h * 0.075}"/><rect x="${w * 0.11}" y="${h * 0.15}" width="${w * 0.055}" height="${h * 0.075}"/><rect x="${w * 0.055}" y="${h * 0.225}" width="${w * 0.055}" height="${h * 0.075}"/><rect x="${w * 0.165}" y="${h * 0.225}" width="${w * 0.055}" height="${h * 0.075}"/></g></g>` + close;
    case 'cricket':
      return open + `<rect width="${w}" height="${h}" fill="#2e7d32"/>
        <ellipse cx="${w * 0.5}" cy="${h * 0.55}" rx="${w * 0.42}" ry="${h * 0.32}" fill="#81c784"/>
        <g transform="rotate(35 ${w * 0.5} ${h * 0.5})"><rect x="${w * 0.46}" y="${h * 0.18}" width="${w * 0.08}" height="${h * 0.45}" rx="3" fill="#d7a86e"/><rect x="${w * 0.475}" y="${h * 0.08}" width="${w * 0.05}" height="${h * 0.14}" rx="2" fill="#8d6e63"/></g>
        <circle cx="${w * 0.72}" cy="${h * 0.72}" r="${h * 0.07}" fill="#b71c1c"/>
        <g fill="#fff"><rect x="${w * 0.16}" y="${h * 0.30}" width="3" height="${h * 0.30}"/><rect x="${w * 0.22}" y="${h * 0.30}" width="3" height="${h * 0.30}"/><rect x="${w * 0.28}" y="${h * 0.30}" width="3" height="${h * 0.30}"/></g>` + close;
    default:
      return open + `<rect width="${w}" height="${h}" fill="#eceff1"/>` + close;
  }
}

// ---------- World map (stylised continents + numbered pins) ----------
function worldMap() {
  const pins = [...data.heroes, ...data.cards, ...data.more]
    .map((s) => `<g><circle cx="${s.x}" cy="${s.y}" r="6.5" fill="#b71c1c" stroke="#fff" stroke-width="1.2"/><text x="${s.x}" y="${s.y + 2.6}" font-size="7.5" text-anchor="middle" font-family="Arial" font-weight="bold" fill="#fff">${s.num}</text></g>`).join('');
  return `<svg viewBox="0 0 340 150" width="340" height="132" xmlns="http://www.w3.org/2000/svg">
    <rect width="340" height="150" fill="#cfe3f5"/>
    <g fill="#e8dcc3" stroke="#b8a67a" stroke-width="1">
      <polygon points="28,22 60,14 95,18 100,32 88,42 78,52 60,58 40,50 26,38"/>
      <polygon points="105,10 118,8 122,16 110,18"/>
      <polygon points="82,68 100,64 112,74 108,96 96,118 86,100 80,82"/>
      <polygon points="158,58 185,52 205,62 200,88 185,112 172,100 160,78"/>
      <polygon points="162,28 178,18 198,22 200,34 188,44 170,42 160,36"/>
      <polygon points="205,18 250,10 300,16 315,30 300,48 270,58 235,55 210,40"/>
      <polygon points="272,108 305,104 315,116 300,128 278,124"/>
    </g>
    <g font-family="Arial" font-size="8" fill="#5d6b7a"><text x="52" y="38">N. AMERICA</text><text x="88" y="98">S. AMERICA</text><text x="168" y="82">AFRICA</text><text x="172" y="30">EUROPE</text><text x="245" y="34">ASIA</text><text x="282" y="118">AUSTRALIA</text></g>
    ${pins}
  </svg>`;
}

// ---------- Page ----------
const maxCount = Math.max(...data.regions.map((r) => r.count));
const regionBars = data.regions.map((r) => {
  const w = Math.round((r.count / maxCount) * 100);
  return `<div class="reg"><span class="reg-name" style="background:${r.color}">${esc(r.name)} ${r.count}</span><span class="reg-bar"><span style="display:block;height:100%;width:${w}%;background:${r.color}"></span></span></div>`;
}).join('');

const statsHtml = data.stats.map((s) => `<div class="stat"><div class="stat-num">${esc(s.num)}</div><div class="stat-label">${esc(s.label)}</div></div>`).join('');

const heroesHtml = data.heroes.map((h) => `
  <div class="hero">
    <div class="tag">${esc(h.tag)}</div>
    <div class="hero-art">${art(h.art, 300, 78)}</div>
    <div class="loc"><span class="num-badge">${h.num}</span> ${esc(h.place)}</div>
    <h3>${esc(h.headline)}</h3>
    <p>${esc(h.summary)}</p>
    <div class="src">${esc(h.source)}</div>
  </div>`).join('');

const cardsHtml = data.cards.map((c) => `
  <div class="card">
    <div class="card-art">${art(c.art, 176, 52)}</div>
    <div class="tag sm">${esc(c.tag)}</div>
    <div class="loc sm"><span class="num-badge sm">${c.num}</span> ${esc(c.place)}</div>
    <h4>${esc(c.headline)}</h4>
    <p>${esc(c.summary)}</p>
    <div class="src">${esc(c.source)}</div>
  </div>`).join('');

const moreHtml = data.more.map((m) => `<div class="more-item"><span class="more-num">${m.num}</span><span class="more-place">${esc(m.place)}</span> ${esc(m.text)} <span class="more-src">(${esc(m.source)})</span></div>`).join('');

const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
* { margin:0; padding:0; box-sizing:border-box; }
body { background:#fff; }
.page { width:1024px; height:1024px; padding:14px 18px 10px; font-family:Arial, 'DejaVu Sans', sans-serif; color:#111; background:#fdfbf5; overflow:hidden; }
.kicker { display:flex; justify-content:space-between; font-size:10px; letter-spacing:2px; color:#b71c1c; font-weight:bold; border-bottom:2px solid #111; padding-bottom:5px; }
.kicker .kr { color:#333; letter-spacing:1px; }
h1 { font-family:Georgia, 'DejaVu Serif', 'Times New Roman', serif; font-size:50px; text-align:center; line-height:1.02; letter-spacing:-0.5px; margin-top:3px; }
.subtitle { font-family:Georgia, 'DejaVu Serif', serif; font-style:italic; font-size:14.5px; text-align:center; color:#333; border-bottom:2px solid #111; padding:4px 0 6px; }
.stats { display:flex; border-bottom:1.5px solid #999; }
.stat { flex:1; padding:5px 8px 4px; border-right:1px solid #ccc; }
.stat:last-child { border-right:none; }
.stat-num { font-size:19px; font-weight:bold; color:#b71c1c; font-family:Georgia, serif; }
.stat-label { font-size:8.5px; line-height:1.25; color:#444; }
.regions { display:flex; gap:6px; padding:4px 0 5px; border-bottom:1.5px solid #999; }
.reg { flex:1; display:flex; flex-direction:column; gap:2px; }
.reg-name { font-size:8.5px; font-weight:bold; color:#fff; padding:1px 4px; }
.reg-bar { height:4px; background:#e5e0d5; }
.heroes { display:flex; gap:10px; padding:6px 0 5px; border-bottom:1.5px solid #999; }
.hero { flex:1; }
.tag { display:inline-block; background:#b71c1c; color:#fff; font-size:11px; font-weight:bold; padding:2px 7px; letter-spacing:0.5px; }
.tag.sm { font-size:9px; padding:1px 5px; }
.hero-art { margin-top:4px; }
.loc { font-size:9px; color:#b71c1c; font-weight:bold; margin-top:4px; letter-spacing:0.5px; }
.loc.sm { font-size:8px; }
.num-badge { display:inline-block; background:#b71c1c; color:#fff; border-radius:50%; width:13px; height:13px; line-height:13px; text-align:center; font-size:9px; }
.num-badge.sm { width:11px; height:11px; line-height:11px; font-size:8px; }
.hero h3 { font-family:Georgia, serif; font-size:16px; line-height:1.12; margin-top:2px; }
.hero p { font-size:10.5px; line-height:1.3; margin-top:3px; color:#222; }
.src { font-size:8.5px; color:#666; margin-top:3px; }
.cards { display:grid; grid-template-columns:repeat(5, 1fr); gap:8px; padding:6px 0 5px; border-bottom:1.5px solid #999; }
.card-art { margin-bottom:3px; }
.card h4 { font-family:Georgia, serif; font-size:11.5px; line-height:1.12; margin-top:2px; }
.card p { font-size:9px; line-height:1.25; color:#222; margin-top:2px; }
.bottom { display:flex; gap:12px; padding:6px 0 5px; border-bottom:1.5px solid #999; }
.map-box { width:372px; flex:none; }
.map-box h5, .more-box h5 { font-size:10px; letter-spacing:1.5px; color:#333; margin-bottom:4px; }
.map-note { font-size:8.5px; color:#666; margin-top:3px; font-style:italic; }
.more-box { flex:1; }
.more-box h5 { border-bottom:1px solid #999; padding-bottom:3px; }
.more-list { column-count:2; column-gap:14px; }
.more-item { font-size:9.5px; line-height:1.3; margin-bottom:3.5px; break-inside:avoid; }
.more-num { color:#b71c1c; font-weight:bold; }
.more-place { font-weight:bold; }
.more-src { color:#666; font-size:8.5px; }
.datecheck { border:1.5px solid #b71c1c; padding:4px 8px; margin-top:5px; font-size:9.5px; line-height:1.35; }
.datecheck b { color:#b71c1c; letter-spacing:1px; }
.footer { font-size:8.5px; color:#666; text-align:center; margin-top:4px; line-height:1.4; }
</style></head><body>
<div class="page">
  <div class="kicker"><span>${esc(data.kickerLeft)}</span><span class="kr">${esc(data.kickerRight)}</span></div>
  <h1>${esc(data.masthead)}</h1>
  <div class="subtitle">${esc(data.subtitle)}</div>
  <div class="stats">${statsHtml}</div>
  <div class="regions">${regionBars}</div>
  <div class="heroes">${heroesHtml}</div>
  <div class="cards">${cardsHtml}</div>
  <div class="bottom">
    <div class="map-box"><h5>WHERE IT HAPPENED</h5>${worldMap()}<div class="map-note">Each number is the story with that number on this page.</div></div>
    <div class="more-box"><h5>ALSO ON SATURDAY 21 NOVEMBER 2026 · 22 MORE STORIES</h5><div class="more-list">${moreHtml}</div></div>
  </div>
  <div class="datecheck"><b>DATE CHECK</b> &nbsp;${esc(data.dateCheck)}</div>
  <div class="footer">${esc(data.footer)}<br>${esc(data.sources)}</div>
</div>
</body></html>`;

mkdirSync(new URL('../build', import.meta.url), { recursive: true });
writeFileSync(new URL('../build/page.html', import.meta.url), html);
console.log('wrote build/page.html,', html.length, 'bytes');
