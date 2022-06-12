import { PlaywrightTestConfig } from '@playwright/test';
import path from 'path';

export default {
  webServer: {
    command: 'yarn dev',
    port: 3004,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  testDir: path.join(__dirname, 'e2e'),
  outputDir: path.join(__dirname, 'e2e/results'),
} as PlaywrightTestConfig;
