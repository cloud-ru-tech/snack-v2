import path from 'path';

import { globSync } from 'glob';
import minimist from 'minimist';

import { simpleCopy } from './compile/simple-copy';
import { writeScss } from './compile/write-scss';
import { logDebug, logError, logHelp } from './utils/console';
import { getAllPackageFolders } from './utils/getAllPackageFolders';

const argv = minimist(process.argv.slice(2));
const pkg = argv.pkg || '*';

const PACKAGES_DIR = path.resolve(__dirname, '..', 'packages');

(async function () {
  const start = performance.now();
  logDebug(`Compiling...`);

  const folders = getAllPackageFolders(pkg);
  const distPart = 'dist';
  const srcPart = 'src';

  for (const folder of folders) {
    const packagePath = path.join(PACKAGES_DIR, folder);
    const src = path.join(packagePath, srcPart);
    const dist = path.join(packagePath, distPart);
    const distESM = `${dist}/esm`;
    const distCJS = `${dist}/cjs`;

    const filesToCopy = globSync(`${src}/**/*.{woff,woff2,png,css}`);
    filesToCopy.forEach(simpleCopy({ src, dist: distESM }));
    filesToCopy.forEach(simpleCopy({ src, dist: distCJS }));

    const scssFiles = globSync(`${src}/**/!(_)*.scss`);
    const scssPipeEsm = writeScss({ src, distESM, distCJS });
    for (const file of scssFiles) {
      try {
        await scssPipeEsm(file);
      } catch (err) {
        logError(`Failed to compile SCSS: ${file}`, err);
        // Continue with other packages so e.g. button gets its .css even if typography fails
      }
    }

    logDebug(`FINISHED: ${folder}`);
  }

  const end = performance.now();
  logHelp(`Total ${(end - start) / 1000} seconds.`);
})();
