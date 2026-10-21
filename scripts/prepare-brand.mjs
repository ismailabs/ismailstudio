import sharp from 'sharp';
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';

await mkdir('public', { recursive: true });
await mkdir('docs/licenses', { recursive: true });
await sharp('assets/mark.svg').resize(180, 180).png().toFile('public/apple-touch-icon.png');
const png = await sharp('assets/mark.svg').resize(32, 32).png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2); ico.writeUInt16LE(1, 4);
ico[6] = 32; ico[7] = 32;
ico.writeUInt16LE(1, 10); ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(png.length, 14); ico.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([ico, png]));
const mark = (await readFile('assets/mark.svg', 'utf8')).replace(/<svg[^>]*>/, '<svg x="936" y="117" width="170" height="170" viewBox="0 0 128 128">');
const cover = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#F6F5F1"/><path d="M70 92h1060M70 540h1060" stroke="#D5D9D2"/><g fill="#24463C" font-family="Segoe UI,Arial,sans-serif"><text x="72" y="68" font-size="25">ismail studio</text><text x="70" y="240" font-size="65" letter-spacing="-2">Professional websites</text><text x="70" y="318" font-size="65" letter-spacing="-2">for small businesses.</text><text x="73" y="410" font-size="23">Independent web design &amp; development · Malaysia</text><text x="73" y="495" font-size="23">Websites from RM599</text><text x="70" y="588" font-size="19">www.ismailstudio.my</text></g>${mark}<path d="M985 385h100" stroke="#C64E39" stroke-width="7"/></svg>`;
await sharp(Buffer.from(cover)).png().toFile('public/og-image.png');
await copyFile('node_modules/@fontsource-variable/geist/LICENSE', 'docs/licenses/geist-OFL.txt');
console.log('Brand icons and 1200×630 Open Graph image generated.');
