import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

const execute = promisify(execFile);
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:4321/';
const phase = process.env.AUDIT_PHASE || 'final';
if (!/^[a-z0-9-]+$/.test(phase)) throw new Error('Invalid audit phase');
const directory = path.resolve('.local/lighthouse');
await mkdir(directory, { recursive: true });
const environment = { ...process.env };
if (!environment.CHROME_PATH && process.platform === 'win32') environment.CHROME_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const reports = [];
for (const formFactor of ['mobile', 'desktop']) {
  for (let run = 1; run <= 3; run++) {
    const filename = path.join(directory, `${phase}-${formFactor}-${run}.json`);
    const args = ['node_modules/lighthouse/cli/index.js', base, '--quiet', '--output=json', `--output-path=${filename}`, '--chrome-flags=--headless=new --no-sandbox', `--port=${process.env.AUDIT_PORT || '9333'}`, '--only-categories=performance,accessibility,best-practices,seo'];
    if (formFactor === 'desktop') args.push('--preset=desktop');
    const freeMemoryBefore = os.freemem();
    await execute(process.execPath, args, { env: environment, maxBuffer: 4 * 1024 * 1024, timeout: 240000 });
    const lhr = JSON.parse(await readFile(filename, 'utf8'));
    const evidence = {
      phase, formFactor, run, url: base, lighthouseVersion: lhr.lighthouseVersion, fetchTime: lhr.fetchTime,
      environment: lhr.environment, settings: lhr.configSettings,
      hostMemoryBytes: { total: os.totalmem(), freeBeforeRun: freeMemoryBefore },
      scores: Object.fromEntries(Object.entries(lhr.categories).map(([name, category]) => [name, Math.round(category.score * 100)])),
      metrics: Object.fromEntries(['largest-contentful-paint','cumulative-layout-shift','total-blocking-time','first-contentful-paint','speed-index'].map((name) => [name, lhr.audits[name]?.numericValue])),
      findings: Object.entries(lhr.audits).filter(([, audit]) => audit.score !== null && audit.score < 1 && !['informative','notApplicable'].includes(audit.scoreDisplayMode)).map(([id, audit]) => ({ id, score: audit.score, title: audit.title, displayValue: audit.displayValue })),
    };
    reports.push(evidence);
    console.log(JSON.stringify({ formFactor, run, scores: evidence.scores, metrics: evidence.metrics }));
  }
}
await mkdir('docs/redesign-v3/evidence', { recursive: true });
await writeFile(`docs/redesign-v3/evidence/lighthouse-${phase}.json`, JSON.stringify(reports, null, 2));
