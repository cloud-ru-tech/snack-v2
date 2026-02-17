import { Dirent, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, join } from 'path';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SVGSpriter from 'svg-sprite';
import { optimize } from 'svgo';
import { getIconGroups, getGroupFixedPath, getSpriteGroupId } from './iconGroups';
import { filenameToSymbolIdPart } from './symbolId';

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

async function createSpriteForGroup(group: string): Promise<void> {
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
            /* Use currentColor: symbol has fill="none", so inherit would make paths invisible. */
            svg = svg
              .replace(/\bfill="(?!none)[^"]*"/g, 'fill="currentColor"')
              .replace(/\bstroke="(?!none)[^"]*"/g, 'stroke="currentColor"');
            let updatedSVG = optimize(svg).data;
            /* Paths with no fill inherit symbol's fill="none" - add fill. Run after optimize for cleaner output. */
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

  for (const filePath of allPaths) {
    const symbolId = prefix + filenameToSymbolIdPart(basename(filePath));
    spriter.add(symbolId, null, readFileSync(filePath, 'utf-8'));
  }

  const { result } = await spriter.compileAsync();

  for (const dir of OUTPUT_DIRS) {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, fileName), result.symbol.sprite.contents);
  }
}

async function main(): Promise<void> {
  const groups = getIconGroups();
  for (const group of groups) {
    const groupId = getSpriteGroupId(group);
    await createSpriteForGroup(group);
    // eslint-disable-next-line no-console
    console.log(`Sprite "sprite.${groupId}.symbol.svg" created.`);
  }
}

main()
  // eslint-disable-next-line no-console
  .then(() => console.log('All sprites created successfully.'))
  // eslint-disable-next-line no-console
  .catch(error => console.error(`Error creating sprites: ${error.message}`));
