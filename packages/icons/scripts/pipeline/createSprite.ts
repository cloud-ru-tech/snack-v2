import { Dirent, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, join } from 'path';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SVGSpriter from 'svg-sprite';
import { optimize } from 'svgo';
import { getIconGroups, getGroupFixedPath, getSpriteGroupId } from '../shared/iconGroups';
import { filenameToSymbolIdPart } from '../shared/symbolId';
import { getGroupConfig } from '../shared/groupConfig';

type CurrentItem = {
  item: Dirent;
  parent: string;
};

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

const OUTPUT_DIRS = [
  join(...['src', 'sprite', 'svg']),
  join(...['dist', 'cjs', 'sprite', 'svg']),
  join(...['dist', 'esm', 'sprite', 'svg']),
];

async function createSpriteForGroup(group: string): Promise<string[]> {
  const source = getGroupFixedPath(group);
  const groupId = getSpriteGroupId(group);
  const prefix = `snack-uikit-${groupId}-`;
  const fileName = `sprite.${groupId}.symbol.svg`;

  const spriter = new SVGSpriter({
    dest: '',
    mode: { symbol: true },
    shape: {
      transform: [
        {
          custom: (shape, sprite, callback) => {
            let svg = shape.getSVG();
            /* currentColor: у symbol стоит fill="none", наследование сделало бы path невидимыми. */
            svg = svg
              .replace(/\bfill="(?!none)[^"]*"/g, 'fill="currentColor"')
              .replace(/\bstroke="(?!none)[^"]*"/g, 'stroke="currentColor"');
            let updatedSVG = optimize(svg).data;
            /* Path без fill наследуют fill="none" от symbol — добавляем fill. После optimize для чистого вывода. */
            updatedSVG = updatedSVG.replace(/<path([^>]*)\s*\/>/g, (match: string) =>
              match.includes('fill=') ? match : match.replace(/\/>$/, ' fill="currentColor"/>'),
            );
            shape.setSVG(updatedSVG);
            callback(null);
          },
        },
      ],
    },
  });

  const allPaths = getAllSVGPaths(source);
  const symbolIds: string[] = [];

  for (const filePath of allPaths) {
    const symbolId = prefix + filenameToSymbolIdPart(basename(filePath));
    symbolIds.push(symbolId);
    spriter.add(symbolId, null, readFileSync(filePath, 'utf-8'));
  }

  const { result } = await spriter.compileAsync();

  for (const dir of OUTPUT_DIRS) {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, fileName), result.symbol.sprite.contents);
  }

  return symbolIds.sort();
}

/**
 * Манифест символов спрайтов: типизированный TS-модуль (для потребителей `SpriteIcon` —
 * валидация/автокомплит id) + JSON рядом со спрайтами (для внешнего тулинга: пикер иконок
 * в CMS, синхронный с фактическим содержимым спрайтов).
 */
function writeSymbolManifest(idsByGroup: Record<string, string[]>): void {
  const json = JSON.stringify(idsByGroup, null, 2);

  for (const dir of OUTPUT_DIRS) {
    writeFileSync(join(dir, 'sprite.symbols.json'), `${json}\n`);
  }

  const ts = [
    '// DO NOT EDIT MANUALLY — генерируется scripts/pipeline/createSprite.ts',
    '',
    '/** id символов каждого спрайта — фактическое содержимое `sprite.<group>.symbol.svg`. */',
    `export const SPRITE_SYMBOL_IDS = ${json} as const;`,
    '',
    'export type SpriteGroupId = keyof typeof SPRITE_SYMBOL_IDS;',
    'export type SpriteSymbolId = (typeof SPRITE_SYMBOL_IDS)[SpriteGroupId][number];',
    '',
  ].join('\n');
  writeFileSync(join('src', 'sprite', 'manifest.ts'), ts);
}

async function main(): Promise<void> {
  const groups = getIconGroups();
  const idsByGroup: Record<string, string[]> = {};
  for (const group of groups) {
    if (!getGroupConfig(group).needsSprite) continue;
    const groupId = getSpriteGroupId(group);
    idsByGroup[groupId] = await createSpriteForGroup(group);
    // eslint-disable-next-line no-console
    console.log(`Спрайт "sprite.${groupId}.symbol.svg" создан.`);
  }
  writeSymbolManifest(idsByGroup);
}

main()
  // eslint-disable-next-line no-console
  .then(() => console.log('Все спрайты успешно созданы.'))
  // eslint-disable-next-line no-console
  .catch(error => console.error(`Ошибка при создании спрайтов: ${error.message}`));
