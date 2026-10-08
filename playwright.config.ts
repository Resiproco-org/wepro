import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:5187', browserName: 'chromium', channel: 'chrome', screenshot: 'only-on-failure' },
  projects: [{ name: 'desktop', use: { viewport: { width: 1440, height: 1000 } } }, { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } }],
  webServer: { command: 'pnpm dev --port 5187 --strictPort', url: 'http://127.0.0.1:5187', reuseExistingServer: false },
});
