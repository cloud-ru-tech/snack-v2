import fs from 'fs';
import { join } from 'path';
import { getIconGroups, getSpriteGroupId } from '../shared/iconGroups';
import { getGroupConfig } from '../shared/groupConfig';

const COMPONENTS_ROOT = join(import.meta.dirname, '..', '..', 'src', 'components');

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

  for (const group of groups) {
    const groupPath = join(COMPONENTS_ROOT, group);
    if (!fs.existsSync(groupPath)) continue;

    const exportPaths: string[] = [];

    if (getGroupConfig(group).themed) {
      // Группы с themed (logos): баррель группы обязан отдавать только переключающийся по
      // теме paired-компонент — никогда сырые Light/Dark standalone-части под ним
      // (см. pairLogoVariants.ts). `paired/index.ts` плоский (один файл, не по подпапкам,
      // как собственный sprite/standalone-вывод svgr), поэтому findIndexPaths здесь не нужен.
      const pairedIndexPath = join(groupPath, 'paired', 'index.ts');
      if (fs.existsSync(pairedIndexPath)) {
        exportPaths.push("export * from './paired';");
      }
    } else {
      const spritePath = join(groupPath, 'sprite');
      const standalonePath = join(groupPath, 'standalone');

      if (fs.existsSync(spritePath)) {
        const spriteIndices = findIndexPaths(spritePath, groupPath);
        exportPaths.push(...spriteIndices.map(p => `export * from './${p}';`));
      }
      if (fs.existsSync(standalonePath)) {
        const standaloneIndices = findIndexPaths(standalonePath, groupPath);
        exportPaths.push(...standaloneIndices.map(p => `export * from './${p}';`));
      }
    }

    if (exportPaths.length > 0) {
      const groupIndexPath = join(groupPath, 'index.ts');
      const content = exportPaths.join('\n') + '\n';
      fs.writeFileSync(groupIndexPath, content, 'utf-8');
    }
  }

  // Корневой баррель (`@ds/icons` → src/index.ts) не агрегирует иконки ни одной группы — ни
  // плоско, ни через namespace-объект. Каждая группа доступна ТОЛЬКО через свой подпуть
  // (`@ds/icons/interface/<group>`, `@ds/icons/flags`, …), объявленный в `package.json::exports`
  // и указывающий прямо на `src/components/<group>/index.ts`. Иначе символ становится одновременно
  // достижим из двух мест, и TS-автоимпорт не может решить, какой путь предложить — предлагает
  // более короткий корневой вместо канонического подпути. По этой же причине здесь не пишется
  // агрегированный `src/components/index.ts`.

  const spriteIndexPath = join(import.meta.dirname, '..', '..', 'src', 'sprite', 'index.ts');
  const spriteExportLines = groups
    .filter(g => getGroupConfig(g).needsSprite)
    .map(g => {
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
  if (groups.includes('system')) {
    spriteExportLines.push("export { default as SpriteSVG } from './svg/sprite.system.symbol.svg?raw';");
  }
  const spriteIndexContent =
    "export * from './components/Sprite';\nexport * from './components/SpriteFromUrl';\nexport * from './components/SpriteIcon';\n\n" +
    spriteExportLines.join('\n') +
    '\n';
  fs.writeFileSync(spriteIndexPath, spriteIndexContent, 'utf-8');

  // eslint-disable-next-line no-console
  console.log('Индексные файлы экспортов созданы.');
} catch (err) {
  // eslint-disable-next-line no-console
  console.error('Ошибка: ', err);
  throw err;
}
