/**
 * Подставляет содержимое инлайн-fallback в сгенерированные Sprite-иконки.
 *
 * Шаблон svgr (spriteIconComponentTemplate.cjs) эмитит вызов рантайм-фабрики
 * `createSpriteIcon({ symbolId, testId, fallback: "" })` с пустым плейсхолдером `fallback` —
 * на этапе шаблона svgr не даёт доступа к исходному SVG-тексту. Этот скрипт читает исходник
 * из svgs-fixed и заполняет плейсхолдер. Вся логика рендера (fallback-first, подписка на шину
 * `sprite/registry`, переключение на `<use>`) живёт в `src/factory/createSpriteIcon.tsx`.
 *
 * Запускается после build:icons:sprite. Идемпотентен: повторный прогон перезаписывает
 * уже заполненное значение тем же содержимым.
 */
import { Dirent, existsSync, readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { basename, join } from 'path';
import { getIconGroups, getGroupFixedPath, getSpriteGroupId } from '../shared/iconGroups';
import { filenameToSymbolIdPart } from '../shared/symbolId';

const COMPONENTS_ROOT = join('src', 'components');

type CurrentItem = {
  item: Dirent;
  parent: string;
};

function getSvgInnerHTML(raw: string): string {
  const match = raw.match(/<svg[^>]*>([\s\S]*)<\/svg\s*>/i);
  return match ? match[1].trim() : '';
}

function stripFillFromSvgInner(html: string): string {
  return html.replace(/\s+fill\s*=\s*["'][^"']*["']/gi, '').replace(/\s+fill-opacity\s*=\s*["'][^"']*["']/gi, '');
}

function escapeForJSString(str: string): string {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r/g, '\\r').replace(/\n/g, '\\n');
}

function walkSpriteTsx(dir: string): string[] {
  const result: string[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      result.push(...walkSpriteTsx(full));
    } else if (e.isFile() && e.name.endsWith('.tsx') && e.name !== 'index.tsx') {
      const content = readFileSync(full, 'utf-8');
      if (content.includes('createSpriteIcon(')) {
        result.push(full);
      }
    }
  }
  return result;
}

function removeOldFallbackJs(dir: string): void {
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      removeOldFallbackJs(full);
    } else if (e.isFile() && e.name.endsWith('.fallback.js')) {
      unlinkSync(full);
    }
  }
}

function getAllSVGPaths(directory: string): string[] {
  const readDirectory = (path: string) =>
    readdirSync(path, {
      withFileTypes: true,
      encoding: 'utf-8',
    }).map(item => ({ item, parent: path }));

  let currentItem: CurrentItem | undefined;
  const paths: string[] = [];
  const queue = readDirectory(directory);

  while ((currentItem = queue.shift())) {
    if (currentItem.item.isFile() && currentItem.item.name.endsWith('.svg')) {
      paths.push(join(currentItem.parent, currentItem.item.name));
    }

    if (currentItem.item.isDirectory()) {
      const parentDirectory = join(currentItem.parent, currentItem.item.name);
      queue.push(...readDirectory(parentDirectory));
    }
  }

  return paths;
}

function buildSpriteSymbolToSvgMap(group: string): Map<string, string> {
  const map = new Map<string, string>();
  const groupId = getSpriteGroupId(group);
  const symbolPrefix = `snack-uikit-${groupId}-`;
  const svgsFixedRoot = getGroupFixedPath(group);

  if (!existsSync(svgsFixedRoot)) return map;

  const allPaths = getAllSVGPaths(svgsFixedRoot);
  for (const filePath of allPaths) {
    const idPart = filenameToSymbolIdPart(basename(filePath));
    map.set(idPart, filePath);
    map.set(`${symbolPrefix}${idPart}`, filePath);
  }

  return map;
}

function extractSymbolId(content: string): string | null {
  const match = content.match(/symbolId:\s*["']([^"']*)["']/);
  return match ? match[1] : null;
}

/**
 * Ключ без дефисов — мост между двумя схемами нарезки id: symbolId компонента строится из
 * PascalCase-имени (`N8N` → `n8-n`), а id символа спрайта — из имени svg-файла (`N8n.svg` →
 * `n8n`). Для таких иконок (`N8N`, `M4A`/`M3U`/`M4V`) прямой лукап промахивается; по dashless-ключу
 * находим svg и переписываем symbolId компонента на фактический id спрайта.
 */
function dashlessKey(id: string): string {
  return id.replace(/-/g, '');
}

function processFile(tsxPath: string, groupMap: Map<string, string>): boolean {
  let content = readFileSync(tsxPath, 'utf-8');

  const symbolId = extractSymbolId(content);
  if (!symbolId) return false;

  let svgPath = groupMap.get(symbolId);
  if (!svgPath) {
    for (const [candidateId, candidatePath] of groupMap) {
      if (dashlessKey(candidateId) === dashlessKey(symbolId) && candidateId.includes('-')) {
        svgPath = candidatePath;
        content = content.replace(`'${symbolId}'`, `'${candidateId}'`).replace(`"${symbolId}"`, `"${candidateId}"`);
        break;
      }
    }
  }
  if (!svgPath) return false;

  const rawSvg = readFileSync(svgPath, 'utf-8');
  const escaped = escapeForJSString(stripFillFromSvgInner(getSvgInnerHTML(rawSvg)));

  // Обе формы записи: свежий плейсхолдер `fallback: ""` и уже заполненное значение
  // (после prettier — в одинарных кавычках, возможно с переносом строки после двоеточия).
  const fallbackRe = /fallback:\s*(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/;
  if (!fallbackRe.test(content)) return false;

  content = content.replace(fallbackRe, `fallback: "${escaped}"`);
  writeFileSync(tsxPath, content, 'utf-8');
  return true;
}

function main(): void {
  const groups = getIconGroups();
  let totalDone = 0;
  let totalFiles = 0;
  const unmatched: string[] = [];

  for (const group of groups) {
    const spriteDir = join(COMPONENTS_ROOT, group, 'sprite');
    if (!existsSync(spriteDir)) continue;

    const groupMap = buildSpriteSymbolToSvgMap(group);
    removeOldFallbackJs(spriteDir);
    const files = walkSpriteTsx(spriteDir);
    totalFiles += files.length;
    for (const f of files) {
      if (processFile(f, groupMap)) totalDone++;
      else unmatched.push(f);
    }
  }

  // Промах = иконка молча рендерится пустой (нет ни fallback-глифа, ни символа в спрайте).
  // Роняем сборку с виновниками, а не прячем проблему за счётчиком.
  if (unmatched.length > 0) {
    throw new Error(
      `Не найден исходный svg для ${unmatched.length} sprite-иконок:\n  ${unmatched.join('\n  ')}\n` +
        'symbolId компонента не сопоставился с id символа спрайта — проверь нейминг svg-файла в svgs-fixed.',
    );
  }

  // eslint-disable-next-line no-console
  console.log(`Пост-обработка: fallback заполнен в ${totalDone}/${totalFiles} Sprite-компонентов иконок.`);
}

main();
