import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';

// Hash the actual generated inline JSON-LD; no unsafe-inline script exception.
const html = await readFile('dist/index.html', 'utf8');
const hashes = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1]).filter(Boolean)
  .map((content) => `'sha256-${createHash('sha256').update(content).digest('base64')}'`);
const csp = [
  "default-src 'self'", `script-src 'self' ${hashes.join(' ')}`.trim(),
  "style-src 'self'", "img-src 'self' data:", "font-src 'self'",
  "connect-src 'self' https://formspree.io", "form-action 'self' https://formspree.io mailto:",
  "base-uri 'none'", "object-src 'none'", "frame-ancestors 'none'", "upgrade-insecure-requests",
].join('; ');
const releaseCommit = process.env.RELEASE_COMMIT;
if (releaseCommit && !/^[a-f0-9]{40}$/.test(releaseCommit)) throw new Error('Invalid release commit');
const receipt = releaseCommit ? `  X-Release-Commit: ${releaseCommit}\n` : '';
await writeFile('dist/_headers', `/*\n  Content-Security-Policy: ${csp}\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: DENY\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Strict-Transport-Security: max-age=31536000\n${receipt}/_astro/*\n  Cache-Control: public, max-age=31536000, immutable\n/assets/*\n  Cache-Control: public, max-age=86400\n`);
console.log(`Production headers generated; ${hashes.length} inline script hash(es).`);
