import fs from 'fs';
import { createRequire } from 'module';
import path from 'path';

import { type BabelFileResult, transformFileSync } from '@babel/core';
import { globSync } from 'glob';
import minimist from 'minimist';

const require = createRequire(import.meta.url);
const babelPluginReactCssModules = require('babel-plugin-react-css-modules');

import { getBuildablePackageFoldersFromSolution } from './utils/getBuildablePackageFolders';

const argv = minimist(process.argv.slice(2));
const pkgFilter = argv.pkg as string | undefined;

const PACKAGES_DIR = path.resolve(__dirname, '..', 'packages');

function shouldIncludeFolder(folder: string): boolean {
  const allowed = getBuildablePackageFoldersFromSolution();
  if (pkgFilter && pkgFilter !== '*') {
    return folder === pkgFilter && allowed.includes(folder);
  }
  return allowed.includes(folder);
}

(async function () {
  const start = performance.now();
  console.info('[compileJsCssModules] Transforming CJS for CSS modules...');

  const folders = fs
    .readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(shouldIncludeFolder);

  const distCjs = 'dist/cjs';

  await Promise.all(
    folders.map(async folder => {
      const packagePath = path.join(PACKAGES_DIR, folder);
      const src = path.join(packagePath, distCjs);

      if (!fs.existsSync(src)) return;

      const jsFiles = globSync(`${src}/**/*.js`);
      await Promise.all(
        jsFiles.map(async file => {
          const { code } = transformFileSync(file, {
            plugins: [babelPluginReactCssModules],
          }) as BabelFileResult;
          fs.writeFileSync(file, code as string);
        }),
      );

      console.info(`[compileJsCssModules] Finished: ${folder}`);
    }),
  );

  const end = performance.now();
  console.info(`[compileJsCssModules] Total ${((end - start) / 1000).toFixed(2)}s`);
})();
