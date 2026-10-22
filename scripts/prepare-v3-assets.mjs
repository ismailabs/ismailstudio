import sharp from 'sharp';
import { mkdir, writeFile, copyFile, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

// Owner-approved atmospheric artwork, resized only. Project screenshots are never changed.
const source = 'docs/redesign-v3/approved-v3-specs/assets/approved-background-study/cinematic-art-right.webp';
await mkdir('public/assets/brand', { recursive: true });
await mkdir('docs/redesign-v3/evidence', { recursive: true });
await sharp(source).webp({ quality: 85, effort: 6 }).toFile('public/assets/hero-desktop.webp');
await sharp(source).extract({ left: 640, top: 0, width: 1160, height: 770 }).resize(750, 498).extend({ top: 502, bottom: 0, left: 0, right: 0, background: '#080b16' }).webp({ quality: 84, effort: 6 }).toFile('public/assets/hero-mobile.webp');
const shape = 'M10 5h7c8 0 13 6 13 14v33h-7c-8 0-13-6-13-14V5Zm24 23c0-9 5-15 13-15h7v46h-7c-8 0-13-6-13-14V28Z';
const svg = (w, h, content) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${content}</svg>`;
const symbol = color => `<path fill="${color}" d="${shape}"/>`;
const gradient = '<defs><linearGradient id="accent"><stop stop-color="#a658db"/><stop offset="1" stop-color="#4381cb"/></linearGradient></defs>';
for (const [variant, color] of [['black', '#10121a'], ['white', '#ffffff'], ['accent', 'url(#accent)']]) {
  for (const mode of ['symbol', 'wordmark-inline', 'wordmark-stacked']) {
    const inline = mode === 'wordmark-inline';
    const width = mode === 'symbol' ? 64 : inline ? 320 : 180;
    const text = mode === 'symbol' ? '' : `<g fill="${color}" font-family="Arial, sans-serif" font-weight="700" letter-spacing="-1.2">${inline ? '<text x="78" y="43" font-size="32">ismail studio</text>' : '<text x="76" y="29" font-size="29">ismail</text><text x="76" y="56" font-size="29">studio</text>'}</g>`;
    await writeFile(`public/assets/brand/${mode}-${variant}.svg`, svg(width, 64, gradient + symbol(color) + text));
  }
}
const favicon = svg(64, 64, `<rect width="64" height="64" rx="14" fill="#080b16"/><g transform="translate(4 4) scale(.875)">${symbol('#fff')}</g>`);
await writeFile('public/favicon.svg', favicon);
for (const size of [16, 32, 48, 180, 192, 512]) {
  const name = size === 180 ? 'apple-touch-icon' : size >= 192 ? `icon-${size}` : `favicon-${size}`;
  await sharp(Buffer.from(favicon)).resize(size, size).png().toFile(`public/${name}.png`);
}
const png = await readFile('public/favicon-32.png');
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4); ico[6] = 32; ico[7] = 32;
ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12); ico.writeUInt32LE(png.length, 14); ico.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([ico, png]));
const og = svg(1200, 630, `<rect width="1200" height="630" fill="#080b16"/>${gradient}<g transform="translate(64 48)">${symbol('#fff')}</g><g fill="#fff" font-family="Arial, sans-serif" font-weight="800" letter-spacing="-4"><text x="64" y="235" font-size="90">BUILT FOR</text><text x="64" y="332" font-size="90" fill="url(#accent)">BIGGER</text><text x="64" y="429" font-size="90">PROBLEMS.</text></g><g fill="#d7dcea" font-family="Arial, sans-serif" font-size="24"><text x="64" y="504">Websites designed and built in Melaka, Malaysia.</text><text x="64" y="576">www.ismailstudio.my</text><text x="950" y="576">From RM599</text></g>`);
await sharp(Buffer.from(og)).png().toFile('public/og-image.png');
await copyFile('node_modules/@fontsource-variable/geist/LICENSE', 'docs/licenses/geist-OFL.txt');
const assets = [];
for (const file of [source, 'public/assets/hero-desktop.webp', 'public/assets/hero-mobile.webp', 'public/favicon.svg', 'public/og-image.png']) {
  const data = await readFile(file); assets.push({ path: file, bytes: data.length, sha256: createHash('sha256').update(data).digest('hex') });
}
await writeFile('docs/redesign-v3/evidence/asset-provenance.json', JSON.stringify({ generatedAt: new Date().toISOString(), artwork: 'Owner-approved generated atmospheric study; no text or UI in image; not presented as project photography.', identity: 'Original hand-authored paired rounded forms, inspired by approved character. No third-party logo traced.', font: 'Self-hosted Geist Variable 5.3.0, SIL OFL', assets }, null, 2));
console.log('V3 responsive artwork, original SVG identity, favicons and Open Graph image prepared.');
