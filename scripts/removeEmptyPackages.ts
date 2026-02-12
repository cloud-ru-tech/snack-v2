import fs from 'fs';
import path from 'path';

import { rimrafSync } from 'rimraf';

import { logDebug } from './utils/console';
import { getAllPackageFolders } from './utils/getAllPackageFolders';

const PACKAGES_DIR = path.resolve(__dirname, '../packages');

(async function () {
  logDebug(`Cleaning empty packages...`);

  const folderNames = getAllPackageFolders();

  for (const name of folderNames) {
    const folderPath = path.join(PACKAGES_DIR, name);
    const pkgJsonPath = path.join(folderPath, 'package.json');

    if (!fs.existsSync(pkgJsonPath)) {
      rimrafSync(folderPath);
      logDebug(`package.json was not found in: ${folderPath}. Removed.`);
    }
  }
})();
