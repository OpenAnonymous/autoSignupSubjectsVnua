// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'] },
    },
  ],
  expect: {
    timeout: 5 * 1000,
  },
});
