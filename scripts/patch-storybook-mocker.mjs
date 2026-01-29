/**
 * Workaround: @storybook/builder-vite expects storybook/assets/server/mocker-runtime.template.js,
 * but storybook 10.2.x ships the runtime at dist/mocking-utils/mocker-runtime.js.
 * This script copies the file to the expected path so production build succeeds.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storybookDir = path.join(__dirname, '..', 'node_modules', 'storybook');
const src = path.join(storybookDir, 'dist', 'mocking-utils', 'mocker-runtime.js');
const destDir = path.join(storybookDir, 'assets', 'server');
const dest = path.join(destDir, 'mocker-runtime.template.js');

if (fs.existsSync(src) && fs.existsSync(destDir)) {
  fs.copyFileSync(src, dest);
}
