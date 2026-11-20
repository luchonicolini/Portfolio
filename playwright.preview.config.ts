import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  testMatch: 'design-system.spec.ts',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:3001', ...devices['Desktop Chrome'] },
  webServer: {
    command: 'npm run dev -- --hostname 127.0.0.1 --port 3001',
    url: 'http://127.0.0.1:3001/es/dev/design-system',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: { NEXT_PUBLIC_REACT_GRAB: 'false' }
  }
});
