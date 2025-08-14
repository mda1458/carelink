import { defineConfig } from '@playwright/test';
export default defineConfig({ testDir: './tests', fullyParallel: true, retries: 0, use: { baseURL: 'http://localhost:3000', trace: 'retain-on-failure' },
  webServer: { command: 'pnpm start', url: 'http://localhost:3000', reuseExistingServer: true, timeout: 120000 } });
