import fs from 'fs';
import path from 'path';

import { globSync } from 'glob';
import minimist from 'minimist';

import { simpleCopy } from './compile/simple-copy';
import { writeScss } from './compile/write-scss';
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

function writeAggregatedStyleCss(packagePath: string, distESM: string, distCJS: string): void {
  const cssFiles = globSync(`${distESM}/**/*.css`).filter(f => !f.endsWith(`${path.sep}style.css`));
  cssFiles.sort();
  const combined = cssFiles.map(f => fs.readFileSync(f, 'utf8')).join('\n');
  const esmStyle = path.join(distESM, 'style.css');
  const cjsStyle = path.join(distCJS, 'style.css');
  fs.mkdirSync(path.dirname(esmStyle), { recursive: true });
  fs.mkdirSync(path.dirname(cjsStyle), { recursive: true });
  fs.writeFileSync(esmStyle, combined);
  fs.writeFileSync(cjsStyle, combined);
}

(async function () {
  const start = performance.now();
  console.info('[compileCSS] Compiling SCSS and copying assets...');

  const folders = fs
    .readdirSync(PACKAGES_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(shouldIncludeFolder);

  const srcPart = 'src';
  const distPart = 'dist';

  await Promise.all(
    folders.map(async folder => {
      const packagePath = path.join(PACKAGES_DIR, folder);
      const src = path.join(packagePath, srcPart);
      if (!fs.existsSync(src)) return;

      const dist = path.join(packagePath, distPart);
      const distESM = path.join(dist, 'esm');
      const distCJS = path.join(dist, 'cjs');

      const filesToCopy = globSync(`${src}/**/*.{woff,woff2,png,css}`);
      filesToCopy.forEach(simpleCopy({ src, dist: distESM }));
      filesToCopy.forEach(simpleCopy({ src, dist: distCJS }));

      const scssFiles = globSync(`${src}/**/!(_)*.scss`);
      const scssPipe = writeScss({ src, distESM, distCJS });
      await Promise.all(
        scssFiles.map(async file => {
          try {
            await scssPipe(file);
          } catch (err) {
            console.error(`[compileCSS] Failed to compile SCSS: ${file}`, err);
          }
        }),
      );

      if (scssFiles.length > 0 || globSync(`${distESM}/**/*.css`).length > 0) {
        writeAggregatedStyleCss(packagePath, distESM, distCJS);
      }

      console.info(`[compileCSS] Finished: ${folder}`);
    }),
  );

  const end = performance.now();
  console.info(`[compileCSS] Total ${((end - start) / 1000).toFixed(2)}s`);
})();
