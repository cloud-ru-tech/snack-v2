import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [storybookTest({ configDir: join(__dirname, '.storybook') })],
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [{ browser: 'chromium' }],
    },
    // NOTE: vitest coverage в browser-mode через @storybook/addon-vitest@10
    // не подхватывает источники из packages/*/src/* (istanbul-transform не доезжает
    // до них через storybook-vite-environment). Coverage играй через Playwright:
    // `pnpm test:coverage:e2e && pnpm coverage:merge`.
  },
});
