/**
 * Copies sprite SVG files from src/sprite/svg to dist/esm/sprite/svg and dist/cjs/sprite/svg
 * so that compiled index.js can resolve ./svg/sprite.*.symbol.svg?raw in CI/build.
 */
const { cpSync, existsSync, mkdirSync, readdirSync } = require('fs');
const { join } = require('path');

const ICONS_ROOT = join(__dirname, '..');
const SRC_SVG = join(ICONS_ROOT, 'src', 'sprite', 'svg');
const DIST_ESM_SVG = join(ICONS_ROOT, 'dist', 'esm', 'sprite', 'svg');
const DIST_CJS_SVG = join(ICONS_ROOT, 'dist', 'cjs', 'sprite', 'svg');

if (!existsSync(SRC_SVG)) {
  console.warn('[copySpriteSvgToDist] src/sprite/svg not found, skipping.');
  process.exit(0);
}

function copyTo(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  for (const name of readdirSync(SRC_SVG)) {
    if (name.endsWith('.svg') || name.endsWith('.json')) {
      cpSync(join(SRC_SVG, name), join(dir, name), { force: true });
    }
  }
}

copyTo(DIST_ESM_SVG);
copyTo(DIST_CJS_SVG);
console.log('[copySpriteSvgToDist] Sprite SVGs copied to dist/esm and dist/cjs.');
