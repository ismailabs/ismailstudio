import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  fullyParallel: true,
  workers: 1,
  reporter: [['list'], ['json', { outputFile: '.local/test-results.json' }]],
  use: {
    baseURL: process.env.TEST_BASE_URL || 'http://127.0.0.1:4321',
    browserName: 'chromium',
    channel: process.platform === 'win32' ? 'msedge' : undefined,
    headless: true,
    trace: 'retain-on-failure',
  },
  webServer: process.env.TEST_BASE_URL ? undefined : {
    command: 'node scripts/serve-preview.mjs',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: true,
  },
});
