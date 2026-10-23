import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

// Resize/encode the exact approved pixels only. Brand and genuine project
// screenshots are deliberately outside this tool's write scope.
const sources = [
  ['hero-desktop-approved-original.png', '1b65fd0024b9011e966b7c90e8babdfee2cc1cba890e871d943aec897141bbd6', 'hero-desktop.webp', 1672, 941],
  ['hero-mobile-option-A-background.png', '4b7f7ec88e1c5a4f898addd8fef61c5c25e24ad48fcec72d218a01e22c9a6739', 'hero-mobile.webp', 750, 1500],
];
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const assets = [];
for (const [file, expected, output, width, height] of sources) {
  const source = `docs/ismailstudio-v3-final-polish/assets/${file}`;
  const bytes = await readFile(source);
  assert.equal(hash(bytes), expected, `Unapproved source: ${source}`);
  const metadata = await sharp(bytes).metadata();
  assert.equal(metadata.width, width); assert.equal(metadata.height, height);
  const derived = await sharp(bytes).webp({ quality: 82, effort: 6 }).toBuffer();
  const destination = `public/assets/${output}`;
  await writeFile(destination, derived);
  assets.push({ source, sourceSha256: expected, sourceWidth: width, sourceHeight: height, output: destination, width, height, bytes: derived.length, sha256: hash(derived), encoding: { format: 'webp', quality: 82, effort: 6 } });
}
await mkdir('docs/redesign-v3/evidence/final-polish', { recursive: true });
await writeFile('docs/redesign-v3/evidence/final-polish/asset-provenance.json', JSON.stringify({
  utc: new Date().toISOString(), encoder: sharp.versions,
  authority: 'Owner-approved desktop 01+06 and mobile option A, 23 October 2026. Illustrated scenery; not an office photograph or project screenshot.',
  transformations: 'WebP encoding only; no crop, redraw, recolor, UI overlay or generated replacement. Source originals preserved byte-for-byte.', assets,
}, null, 2));
console.log(JSON.stringify(assets));
