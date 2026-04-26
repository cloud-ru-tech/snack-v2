#!/usr/bin/env node
// Precompress text assets in dist/ to .gz and .br for nginx `gzip_static` / `brotli_static`.
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { brotliCompress, constants, gzip } from 'node:zlib';
import { promisify } from 'node:util';

const gzipAsync = promisify(gzip);
const brotliAsync = promisify(brotliCompress);

const DIST = new URL('../dist/', import.meta.url).pathname;
const EXT = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg', '.xml', '.txt', '.map']);
const MIN_SIZE = 1024;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile()) yield full;
  }
}

let gzCount = 0;
let brCount = 0;
let origBytes = 0;
let gzBytes = 0;
let brBytes = 0;

for await (const file of walk(DIST)) {
  if (!EXT.has(extname(file))) continue;
  const { size } = await stat(file);
  if (size < MIN_SIZE) continue;
  const buf = await readFile(file);
  origBytes += buf.length;

  const [gz, br] = await Promise.all([
    gzipAsync(buf, { level: 9 }),
    brotliAsync(buf, {
      params: {
        [constants.BROTLI_PARAM_QUALITY]: 11,
        [constants.BROTLI_PARAM_SIZE_HINT]: buf.length,
      },
    }),
  ]);

  await Promise.all([writeFile(`${file}.gz`, gz), writeFile(`${file}.br`, br)]);
  gzCount++;
  brCount++;
  gzBytes += gz.length;
  brBytes += br.length;
}

const mb = (n) => (n / 1024 / 1024).toFixed(2);
console.log(
  `[precompress] ${gzCount} files — orig ${mb(origBytes)}MB → gz ${mb(gzBytes)}MB / br ${mb(brBytes)}MB`,
);
