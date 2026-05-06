#!/usr/bin/env node
// Precompress text assets in dist/ to .gz and .br for nginx `gzip_static` / `brotli_static`.
import { availableParallelism } from 'node:os';

// Bump libuv thread pool BEFORE importing zlib so brotli/gzip run truly in parallel.
// zlib offloads to libuv threads (default 4); raising this is the single biggest win.
const CONCURRENCY = Math.max(4, availableParallelism());
process.env.UV_THREADPOOL_SIZE = String(CONCURRENCY);

const { readdir, readFile, stat, writeFile } = await import('node:fs/promises');
const { extname, join } = await import('node:path');
const { brotliCompress, constants, gzip } = await import('node:zlib');
const { promisify } = await import('node:util');

const gzipAsync = promisify(gzip);
const brotliAsync = promisify(brotliCompress);

const DIST = new URL('../dist/', import.meta.url).pathname;
const EXT = new Set(['.html', '.css', '.js', '.mjs', '.json', '.svg', '.xml', '.txt']);
const MIN_SIZE = 1024;
// Brotli q=11 is exponentially slower than q=10 for ~1% size gain on text/JS.
const BROTLI_QUALITY = 10;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.isFile()) yield full;
  }
}

const files = [];
for await (const file of walk(DIST)) {
  if (!EXT.has(extname(file))) continue;
  const { size } = await stat(file);
  if (size < MIN_SIZE) continue;
  files.push(file);
}

let count = 0;
let origBytes = 0;
let gzBytes = 0;
let brBytes = 0;

async function compressOne(file) {
  const buf = await readFile(file);
  const [gz, br] = await Promise.all([
    gzipAsync(buf, { level: 9 }),
    brotliAsync(buf, {
      params: {
        [constants.BROTLI_PARAM_QUALITY]: BROTLI_QUALITY,
        [constants.BROTLI_PARAM_SIZE_HINT]: buf.length,
      },
    }),
  ]);
  await Promise.all([writeFile(`${file}.gz`, gz), writeFile(`${file}.br`, br)]);
  origBytes += buf.length;
  gzBytes += gz.length;
  brBytes += br.length;
  count++;
}

let cursor = 0;
async function worker() {
  while (cursor < files.length) {
    const idx = cursor++;
    await compressOne(files[idx]);
  }
}

await Promise.all(Array.from({ length: CONCURRENCY }, worker));

const mb = (n) => (n / 1024 / 1024).toFixed(2);
console.log(
  `[precompress] ${count} files (×${CONCURRENCY} parallel) — orig ${mb(origBytes)}MB → gz ${mb(gzBytes)}MB / br ${mb(brBytes)}MB`,
);
