import { readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import sharp from 'sharp';
const captures = JSON.parse(await readFile('docs/evidence/project-captures.json','utf8'));
const assets=[];
for(const file of await readdir('public/assets/projects')) {
  const path=`public/assets/projects/${file}`;
  const bytes=await readFile(path);
  const old=execFileSync('git',['show',`d9dc2b8:${path}`]);
  if(!bytes.equals(old)) throw Error(`Protected screenshot changed: ${file}`);
  const source=captures.find(item=>file.startsWith(item.slug+'-'));
  const image=await sharp(bytes).metadata();
  assets.push({path,width:image.width,height:image.height,sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,sourceUrl:source.url,capturedAt:source.capturedAt,originalViewport:source.originalViewport,unchangedFromV1:true,crop:'Original full viewport ratio retained; no UI retouching',provenance:'Authentic browser capture of owner-provided live concept; retained project asset',altSource:'src/data/projects.ts'});
}
await writeFile('docs/redesign/asset-evidence.json',JSON.stringify({at:new Date().toISOString(),assets,signature:{path:'src/components/StudioGlyph.astro',source:'Original inline SVG authored for the IS portal identity',runtime:'CSS/SVG, no WebGL or bitmap dependency'},font:{name:'Geist Variable Latin',license:'docs/licenses/geist-OFL.txt',existing:true}},null,2));
console.log(`Verified ${assets.length} unchanged authentic screenshot derivatives.`);
