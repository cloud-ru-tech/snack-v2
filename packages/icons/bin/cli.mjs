#!/usr/bin/env node
/**
 * CLI пакета `@ds/icons`: `npx @ds/icons <command> [options]`.
 *
 * Единственная команда — `copy-sprites`; она же выполняется по умолчанию, если первым
 * аргументом идут сразу опции (`npx @ds/icons --out public/sprites`).
 *
 * copy-sprites: копирует sprite .svg файлы в статическую директорию потребительского
 * приложения (например, `public/sprites` в Next.js) с content-хэшем в имени файла — чтобы
 * отдавать их с `Cache-Control: immutable` и не бояться протухания кэша при обновлении пакета:
 * у нового контента будет новое имя, старый URL продолжит работать, пока рантайм не подтянет
 * новый манифест. Вместе со спрайтами копируются `manifest.json` (группа → URL) и
 * `sprite.symbols.json` (каталог id символов — для внешнего тулинга, например пикера иконок в CMS).
 *
 * Только для приложений, которые сами хостят статику (root/Next.js) — микрофронты, не являющиеся
 * точкой входа, переиспользуют спрайт, смонтированный контейнером (см. docs/sprite.mdx).
 */
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG = JSON.parse(readFileSync(join(__dirname, '..', 'package.json'), 'utf-8'));
const SRC_SVG_DIR = join(__dirname, '..', 'dist', 'esm', 'sprite', 'svg');

const HELP = `@ds/icons v${PKG.version}

Usage:
  npx @ds/icons [copy-sprites] --out <dir> [--base-url <url-prefix>]

Commands:
  copy-sprites        Copy sprite .svg files (+ manifest.json, sprite.symbols.json)
                      to a static directory. Default command.

Options:
  --out <dir>         Target directory (e.g. public/sprites). Required.
  --base-url <url>    URL prefix written to manifest.json (e.g. /sprites). Default: ''.
  -h, --help          Show this help.
  -v, --version       Show package version.

Examples:
  npx @ds/icons --out public/sprites --base-url /sprites
  npx @ds/icons copy-sprites --out static/icons
`;

function fail(message) {
  console.error(`[@ds/icons] ${message}\n`);
  console.error(HELP);
  process.exit(2);
}

function parseArgs(argv) {
  const args = { out: null, baseUrl: '' };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--out') args.out = argv[++i];
    else if (arg.startsWith('--out=')) args.out = arg.slice('--out='.length);
    else if (arg === '--base-url') args.baseUrl = argv[++i];
    else if (arg.startsWith('--base-url=')) args.baseUrl = arg.slice('--base-url='.length);
    else fail(`Unknown option: ${arg}`);
  }
  return args;
}

function contentHash(content) {
  return createHash('sha256').update(content).digest('hex').slice(0, 10);
}

function copySprites(argv) {
  const { out, baseUrl } = parseArgs(argv);
  if (!out) fail('Missing required option: --out <dir>');

  if (!existsSync(SRC_SVG_DIR)) {
    console.error(`[@ds/icons] Source not found: ${SRC_SVG_DIR}. Is @ds/icons installed correctly?`);
    process.exit(1);
  }

  mkdirSync(out, { recursive: true });

  const manifest = {};
  const files = readdirSync(SRC_SVG_DIR).filter(name => name.endsWith('.symbol.svg'));

  for (const name of files) {
    const content = readFileSync(join(SRC_SVG_DIR, name), 'utf-8');
    const hash = contentHash(content);
    // sprite.<group>.symbol.svg -> sprite.<group>.<hash>.symbol.svg
    const hashedName = name.replace(/\.symbol\.svg$/, `.${hash}.symbol.svg`);
    writeFileSync(join(out, hashedName), content, 'utf-8');

    const group = name.replace(/^sprite\./, '').replace(/\.symbol\.svg$/, '');
    manifest[group] = `${baseUrl.replace(/\/$/, '')}/${hashedName}`;
  }

  writeFileSync(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf-8');

  // Каталог id символов (для внешнего тулинга — например, пикера иконок в CMS): копируется
  // как есть, генерируется пайплайном пакета вместе со спрайтами (createSprite.ts).
  const symbolsSource = join(SRC_SVG_DIR, 'sprite.symbols.json');
  if (existsSync(symbolsSource)) {
    writeFileSync(join(out, 'sprite.symbols.json'), readFileSync(symbolsSource, 'utf-8'), 'utf-8');
  }

  // eslint-disable-next-line no-console
  console.log(`[@ds/icons] Copied ${files.length} sprite(s) to ${out} (+ manifest.json, sprite.symbols.json).`);
}

function main() {
  const argv = process.argv.slice(2);

  if (argv.includes('--help') || argv.includes('-h') || argv.length === 0) {
    // eslint-disable-next-line no-console
    console.log(HELP);
    return;
  }
  if (argv.includes('--version') || argv.includes('-v')) {
    // eslint-disable-next-line no-console
    console.log(PKG.version);
    return;
  }

  // Первый позиционный аргумент — команда; опции без команды = copy-sprites по умолчанию.
  if (argv[0] === 'copy-sprites') {
    copySprites(argv.slice(1));
  } else if (argv[0].startsWith('-')) {
    copySprites(argv);
  } else {
    fail(`Unknown command: ${argv[0]}`);
  }
}

main();
