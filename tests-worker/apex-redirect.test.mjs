import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../workers/apex-redirect.mjs';

for (const [source, target] of [
  ['http://ismailstudio.my/', 'https://www.ismailstudio.my/'],
  ['https://ismailstudio.my/path/to/page?source=release&x=a%20b', 'https://www.ismailstudio.my/path/to/page?source=release&x=a%20b'],
  ['http://www.ismailstudio.my/services/?package=Business', 'https://www.ismailstudio.my/services/?package=Business'],
]) test(`permanently redirects ${source}`, () => {
  const response = worker.fetch(new Request(source));
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), target);
  assert.equal(response.body, null);
});
