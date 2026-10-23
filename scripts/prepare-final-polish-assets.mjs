import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

// Encode the owner's approved Monolithic Landscape. Only the mobile export is
// cropped, toward the right-hand mountain. No generated or retouched pixels.
const source = 'src/assets/hero/monolithic-landscape.png';
const sourceSha256 = '8096e7eb92492c8d630efda52bba969bf898db0dd91f84f342c9847d8810d886';
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const original = await readFile(source);
assert.equal(hash(original), sourceSha256, 'Unapproved hero source');
const metadata = await sharp(original).metadata();
assert.equal(metadata.width, 1672); assert.equal(metadata.height, 941);
const encoding = { quality: 80, effort: 6 };
const mobileEncoding = { quality: 75, effort: 6 };
const variants = [
  { output: 'public/assets/hero-desktop.webp', width: 1672, height: 941, framing: 'Full approved landscape; no crop', encoding: { format: 'webp', ...encoding }, buffer: await sharp(original).webp(encoding).toBuffer(), budget: 250000 },
  { output: 'public/assets/hero-mobile.webp', width: 768, height: 576, framing: 'Right-aligned 4:3 crop, mountain on the right', encoding: { format: 'webp', ...mobileEncoding }, buffer: await sharp(original).resize({ width: 768, height: 576, fit: 'cover', position: 'right', withoutEnlargement: true }).webp(mobileEncoding).toBuffer(), budget: 70000 },
  { output: 'public/assets/hero-mobile-large.webp', width: 960, height: 720, framing: 'Same right-aligned crop for higher pixel-density mobile screens', encoding: { format: 'webp', ...encoding }, buffer: await sharp(original).resize({ width: 960, height: 720, fit: 'cover', position: 'right', withoutEnlargement: true }).webp(encoding).toBuffer(), budget: 150000 },
];
for (const variant of variants) assert.ok(variant.buffer.length < variant.budget, 'Hero export exceeds image budget');
const assets = [];
for (const { buffer, budget, ...variant } of variants) {
  await writeFile(variant.output, buffer);
  assets.push({ ...variant, bytes: buffer.length, sha256: hash(buffer) });
}
await mkdir('.local/monolithic-hero', { recursive: true });
await writeFile('.local/monolithic-hero/asset-provenance.json', JSON.stringify({
  utc: new Date().toISOString(), authority: 'Owner-supplied Monolithic Landscape, 23 October 2026; approved hero-only amendment under the original conditional release gates',
  source, sourceSha256, sourceBytes: original.length, sourceWidth: metadata.width, sourceHeight: metadata.height,
  encoder: { sharp: sharp.versions.sharp, webp: sharp.versions.webp }, assets,
}, null, 2));
console.log(JSON.stringify(assets));
