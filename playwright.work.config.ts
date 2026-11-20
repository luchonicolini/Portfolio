import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testMatch: 'work.spec.ts',
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:3101', ...devices['Desktop Chrome'] },
  webServer: {
    command: 'npm run start -- --port 3101',
    url: 'http://127.0.0.1:3101/es/work',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { NEXT_PUBLIC_REACT_GRAB: 'false' }
  }
});
