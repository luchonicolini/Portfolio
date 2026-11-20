import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testIgnore: 'design-system.spec.ts',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:3000', ...devices['Desktop Chrome'] },
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000/es',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
