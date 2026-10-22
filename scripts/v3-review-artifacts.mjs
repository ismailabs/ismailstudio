import sharp from 'sharp';
import { chromium } from '@playwright/test';
import { readFile, mkdir, writeFile, readdir } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
const root='docs/redesign-v3/evidence';await mkdir(`${root}/comparisons`,{recursive:true});
const frames=[
 ['Approved hero composition',`${root}/../approved-v3-specs/assets/approved-mockups/01-hero-built-for-bigger-problems.png`],
 ['V3 final desktop browser',`${root}/final-local/1440-hero.png`],
 ['V2 baseline browser',`${root}/baseline/local-v2-1440.png`],
 ['V3 light work browser',`${root}/final-local/1440-work.png`],
];
const pieces=[];
for(let i=0;i<frames.length;i++){
 const [title,file]=frames[i];const x=(i%2)*740,y=Math.floor(i/2)*500;
 pieces.push({input:await sharp(file).resize(720,450,{fit:'contain',background:'#e9ecf2'}).png().toBuffer(),left:x+10,top:y+40});
 pieces.push({input:Buffer.from(`<svg width="720" height="34"><text x="8" y="25" fill="#10121a" font-family="Arial" font-size="20">${title}</text></svg>`),left:x+10,top:y+2});
}
await sharp({create:{width:1480,height:1000,channels:4,background:'#e9ecf2'}}).composite(pieces).jpeg({quality:88}).toFile(`${root}/comparisons/desktop-reference-and-browser.jpg`);
const browser=await chromium.launch({channel:process.platform==='win32'?'msedge':undefined});const page=await browser.newPage({viewport:{width:1100,height:650}});
const symbol=await readFile('public/assets/brand/symbol-black.svg','utf8');
await page.setContent(`<html><head><style>body{font-family:Arial;margin:0;padding:40px;background:#f7f8fb;color:#10121a}h1{font-size:28px}section{display:flex;gap:40px;align-items:end;padding:30px;margin-bottom:20px;border-radius:16px;background:white}section.dark{background:#080b16;color:white}figure{margin:0}figcaption{font-size:14px;margin-top:15px}svg{display:block;fill:currentColor}.dark svg path{fill:white}</style></head><body><h1>Original Ismail Studio symbol / size & contrast proof</h1>${['light','dark'].map(theme=>`<section class="${theme}">${[16,24,32,48,64,128].map(size=>`<figure>${symbol.replace('width="64" height="64"',`width="${size}" height="${size}"`)}<figcaption>${size}px</figcaption></figure>`).join('')}</section>`).join('')}<p>Paired rounded forms, clear central gap, solid monochrome. Actual SVG rendered by Chromium.</p></body></html>`);
await page.screenshot({path:`${root}/comparisons/identity-sizes.png`});await browser.close();
const sizes={at:new Date().toISOString(),motion:'14.5.0',reactInstalled:false,assets:[],baselineAssets:[]};
for(const [folder,key] of [['dist/_astro','assets'],['.local/v3/v2-baseline/dist/_astro','baselineAssets']])for(const name of await readdir(folder)){
 const data=await readFile(`${folder}/${name}`);sizes[key].push({name,bytes:data.length,gzipBytes:gzipSync(data).length});
}
await writeFile(`${root}/bundle-sizes.json`,JSON.stringify(sizes,null,2));console.log(JSON.stringify(sizes));
