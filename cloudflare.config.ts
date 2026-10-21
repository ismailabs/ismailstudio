import { defineConfig } from 'cf/config';

const zone = 'dc2bee92d5853929394633d0a4165093';

export const apexConfig = defineConfig({
  accountId: '44214a829e2337ca50cf40e4cd827cba',
  worker: {
    name: 'ismailstudio-apex',
    compatibilityDate: '2026-10-21',
    workersDev: true,
    previewUrls: true,
    observability: { enabled: true, headSamplingRate: 0.1, redactQueryString: true, logs: { enabled: true }, traces: { enabled: true, headSamplingRate: 0.1 } },
    triggers: [
      { type: 'fetch', pattern: 'ismailstudio.my/*', zone },
      { type: 'fetch', pattern: 'http://www.ismailstudio.my/*', zone },
    ],
  },
});

export default defineConfig({
  accountId: '44214a829e2337ca50cf40e4cd827cba',
  worker: {
    name: 'ismailstudio',
    compatibilityDate: '2026-10-21',
    assets: { htmlHandling: 'force-trailing-slash', notFoundHandling: 'none' },
    workersDev: true,
    previewUrls: true,
    triggers: [{ type: 'fetch', pattern: 'www.ismailstudio.my/*', zone }],
    // Exact-host routes preserve all 17 existing DNS records and other subdomains.
  },
});
