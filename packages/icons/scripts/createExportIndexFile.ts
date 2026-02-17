// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fs from 'fs';
import { join } from 'path';
import { getIconGroups, getSpriteGroupId } from './iconGroups';

const COMPONENTS_ROOT = join(__dirname, '..', 'src', 'components');

function findIndexPaths(dir: string, baseDir: string): string[] {
  const result: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      result.push(...findIndexPaths(full, baseDir));
    } else if (e.name === 'index.tsx') {
      const rel = full.slice(baseDir.length + 1).replace(/\\/g, '/');
      result.push(rel.replace(/\/index\.tsx$/, ''));
    }
  }
  return result;
}

try {
  const groups = getIconGroups();
  const allExports: string[] = [];

  for (const group of groups) {
    const groupPath = join(COMPONENTS_ROOT, group);
    if (!fs.existsSync(groupPath)) continue;

    const spritePath = join(groupPath, 'sprite');
    const standalonePath = join(groupPath, 'standalone');

    const exportPaths: string[] = [];

    if (fs.existsSync(spritePath)) {
      const spriteIndices = findIndexPaths(spritePath, groupPath);
      exportPaths.push(...spriteIndices.map(p => `export * from './${p}';`));
    }
    if (fs.existsSync(standalonePath)) {
      const standaloneIndices = findIndexPaths(standalonePath, groupPath);
      exportPaths.push(...standaloneIndices.map(p => `export * from './${p}';`));
    }

    if (exportPaths.length > 0) {
      const groupIndexPath = join(groupPath, 'index.ts');
      const content = exportPaths.join('\n') + '\n';
      fs.writeFileSync(groupIndexPath, content, 'utf-8');

      const pascalGroup = group
        .split(/[-/]/)
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join('');
      if (group === 'snack-icons') {
        allExports.push(`export * from './${group}';`);
      } else {
        allExports.push(`export * as ${pascalGroup} from './${group}';`);
      }
    }
  }

  const componentsIndexPath = join(COMPONENTS_ROOT, 'index.ts');
  fs.writeFileSync(componentsIndexPath, allExports.join('\n') + '\n', 'utf-8');

  const spriteIndexPath = join(__dirname, '..', 'src', 'sprite', 'index.ts');
  const spriteExportLines = groups.map(g => {
    const id = getSpriteGroupId(g);
    const exportName =
      'Sprite' +
      id
        .split('-')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join('') +
      'SVG';
    return `export { default as ${exportName} } from './svg/sprite.${id}.symbol.svg?raw';`;
  });
  if (groups.includes('snack-icons')) {
    spriteExportLines.push("export { default as SpriteSVG } from './svg/sprite.snack-icons.symbol.svg?raw';");
  }
  const spriteIndexContent = "export * from './Sprite';\n\n" + spriteExportLines.join('\n') + '\n';
  fs.writeFileSync(spriteIndexPath, spriteIndexContent, 'utf-8');

  // eslint-disable-next-line no-console
  console.log('Export index files created.');
} catch (err) {
  // eslint-disable-next-line no-console
  console.error('Error: ', err);
  throw err;
}
