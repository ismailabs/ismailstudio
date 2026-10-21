import { cp, mkdir, rm, writeFile, readdir, readFile, lstat } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import config, { apexConfig } from '../cloudflare.config.ts';

const root = process.cwd();
const dist = path.resolve(root, 'dist');
const output = path.resolve(root, '.cloudflare/output/v0');
const expected = path.resolve(root, '.cloudflare/output');
if (!output.startsWith(expected + path.sep) || path.dirname(expected) !== path.join(root, '.cloudflare')) throw new Error('Unsafe build-output path');
// Only this verified, generated directory is replaced. No source or other project touched.
await rm(output, { recursive: true, force: true });
const assets = path.join(output, 'workers/default/assets');
await mkdir(assets, { recursive: true });
await cp(dist, assets, { recursive: true });
const previewOnly = process.argv.includes('--preview-only');
const workerSettings = (worker) => previewOnly ? Object.fromEntries(Object.entries(worker).filter(([key]) => key !== 'triggers')) : worker;
await writeFile(path.join(output, 'config.json'), JSON.stringify({ accountId: config.accountId, buildContext: { isPreview: false, mode: 'production' } }, null, 2));
await writeFile(path.join(output, 'workers/default/worker.config.json'), JSON.stringify(workerSettings(config.worker), null, 2));
const apex = path.join(output, 'workers/ismailstudio-apex');
await mkdir(path.join(apex, 'bundle'), { recursive: true });
await cp('workers/apex-redirect.mjs', path.join(apex, 'bundle/index.mjs'));
await writeFile(path.join(apex, 'worker.config.json'), JSON.stringify({ ...workerSettings(apexConfig.worker), manifest: { type: 'complete', mainModule: 'index.mjs', modules: { 'index.mjs': { type: 'esm' } } } }, null, 2));
const files = [];
async function scan(folder) {
  for (const entry of await readdir(folder, { withFileTypes: true })) {
    const file = path.join(folder, entry.name);
    if ((await lstat(file)).isSymbolicLink()) throw new Error('Symlink in release output');
    if (entry.isDirectory()) await scan(file);
    else {
      const relative = path.relative(assets, file).split(path.sep).join('/');
      if (relative.startsWith('.') || /(^|\/)(docs|src|scripts|node_modules|package\.json)(\/|$)|\.(map|md|ts|py)$/.test(relative)) throw new Error(`Private source in output: ${relative}`);
      const bytes = await readFile(file);
      files.push({ path: relative, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
    }
  }
}
await scan(assets);
await mkdir('.local', { recursive: true });
await writeFile('.local/release-assets.json', JSON.stringify(files, null, 2));
console.log(`Packaged ${files.length} allowlisted static files plus the isolated apex redirect; website routes ${previewOnly ? 'omitted for workers.dev smoke' : 'included'}.`);
