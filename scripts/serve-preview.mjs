import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const port = Number(process.env.PORT || 4321);
const rules = [];
let rule;
for (const line of (await readFile(path.join(root, '_headers'), 'utf8')).split('\n')) {
  if (line.startsWith('/')) { rule = { pattern: line.trim(), headers: {} }; rules.push(rule); }
  else if (line.startsWith('  ') && rule) {
    const colon = line.indexOf(':');
    if (colon > 0) rule.headers[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
}
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  let relative;
  try { relative = decodeURIComponent(url.pathname); } catch { res.writeHead(400).end(); return; }
  if (relative.endsWith('/')) relative += 'index.html';
  const file = path.resolve(root, `.${relative}`);
  if (!file.startsWith(root + path.sep) || relative.includes('/.') || relative === '/_headers') { res.writeHead(404).end(); return; }
  try {
    if (!(await stat(file)).isFile()) throw new Error('not a file');
    for (const rule of rules) {
      if (rule.pattern === '/*' || url.pathname.startsWith(rule.pattern.replace(/\*$/, ''))) {
        for (const [key, value] of Object.entries(rule.headers)) res.setHeader(key, value);
      }
    }
    res.setHeader('Content-Type', mime[path.extname(file)] ?? 'application/octet-stream');
    res.writeHead(200).end(await readFile(file));
  } catch { res.writeHead(404).end('Not found'); }
});
server.listen(port, '127.0.0.1', () => console.log(`Production preview with _headers: http://127.0.0.1:${port}`));
