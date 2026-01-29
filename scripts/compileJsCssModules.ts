import fs from 'fs';
import path from 'path';

import { BabelFileResult, transformFileSync } from '@babel/core';
import { globSync } from 'glob';
import minimist from 'minimist';

import { logDebug, logHelp } from './utils/console';
import { getAllPackageFolders } from './utils/getAllPackageFolders';

const argv = minimist(process.argv.slice(2));
const pkg = argv.pkg || '*';

const PACKAGES_DIR = path.resolve(__dirname, '..', 'packages');

(async function () {
  const start = performance.now();
  logDebug(`Compiling css modules...`);

  const folders = getAllPackageFolders(pkg);
  const srcPart = 'dist/cjs';

  for (const folder of folders) {
    const packagePath = path.join(PACKAGES_DIR, folder);
    const src = path.join(packagePath, srcPart);

    const jsFiles = globSync(`${src}/**/*.js`);
    for (const file of jsFiles) {
      const { code } = transformFileSync(file, {
        plugins: [require('babel-plugin-react-css-modules')],
      }) as BabelFileResult;
      fs.writeFileSync(file, code as string);
    }

    logDebug(`FINISHED: ${folder}`);
  }

  const end = performance.now();
  logHelp(`Total ${(end - start) / 1000} seconds.`);
})();
