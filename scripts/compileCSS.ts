import fs from 'fs';
import os from 'os';
import path from 'path';

import { globSync } from 'glob';
import minimist from 'minimist';

import { simpleCopy } from './compile/simple-copy';
import { writeScss } from './compile/write-scss';
import { getBuildablePackageFoldersFromSolution } from './utils/getBuildablePackageFolders';

const argv = minimist(process.argv.slice(2));
const pkgFilter = argv.pkg as string | undefined;

const PACKAGES_DIR = path.resolve(__dirname, '..', 'packages');

// Каждый пакет грузит тяжёлый base-модуль figma-variables в sass. Компиляция
// всех пакетов разом через Promise.all держала десятки sass-инстансов в памяти
// одновременно и упиралась в heap limit (OOM, exit 134) по мере роста числа
// пакетов. Ограничиваем число одновременно компилируемых пакетов — пиковая
// память перестаёт зависеть от их количества. Переопределяется CSS_BUILD_CONCURRENCY.
const PACKAGE_CONCURRENCY = Math.max(1, Number(process.env.CSS_BUILD_CONCURRENCY) || Math.min(4, os.cpus().length));

async function runWithConcurrency<T>(items: T[], limit: number, worker: (item: T) => Promise<void>): Promise<void> {
  let cursor = 0;
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      await worker(items[index]);
    }
  });
  await Promise.all(runners);
}

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

  await runWithConcurrency(folders, PACKAGE_CONCURRENCY, async folder => {
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
  });

  const end = performance.now();
  console.info(`[compileCSS] Total ${((end - start) / 1000).toFixed(2)}s`);
})();
