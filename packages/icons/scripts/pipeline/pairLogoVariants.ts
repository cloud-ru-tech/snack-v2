/**
 * Собирает сгенерированные standalone-компоненты *LightSVG / *DarkSVG группы logos в один
 * компонент, переключающийся по теме через useThemeAppearance() из @ds/theme. Перегенерируется
 * с нуля при каждой сборке (как sprite/standalone), поэтому никогда не расходится с тем, что
 * произвели fixIcons/svgr. Ничего не делает, если группы logos не существует.
 *
 * SVGR называет сгенерированный ФАЙЛ по имени исходного SVG (например, `AiCloudLogoDark.tsx`),
 * но КОМПОНЕНТ, объявленный внутри, несёт суффикс `SVG` из шаблона (`AiCloudLogoDarkSVG`) —
 * сопоставление пар должно идти по basename файла (голый суффикс `Light`/`Dark`, а не
 * `LightSVG`/`DarkSVG`), а импортировать нужно именно `SVG`-суффиксную привязку из этого файла.
 *
 * Ключ сопоставления пары — basename файла с отрезанным голым суффиксом `Light`/`Dark`, а НЕ
 * конкретно `LogoLight`/`LogoDark`. Реальный нейминг в Figma не единообразен как
 * `<Brand>Logo<Light|Dark>`; часть брендов оформлена как `<Brand>Logo<Variant><Light|Dark>`
 * (например, `CloudLogoDevLight` / `CloudLogoDevDark`, база `CloudLogoDev`) — токен `Logo` не
 * всегда стоит прямо перед суффиксом, только сама база компонента + суффикс. База уже содержит
 * "Logo", поэтому публичный paired-компонент экспортируется как `${base}`, а не `${base}Logo`
 * (это бы задвоило "Logo").
 */
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { getIconGroups } from '../shared/iconGroups';
import { getGroupConfig } from '../shared/groupConfig';

const ICONS_ROOT = join(import.meta.dirname, '..', '..');
const COMPONENTS_ROOT = join(ICONS_ROOT, 'src', 'components');

function listStandaloneFileBaseNames(standaloneDir: string): string[] {
  if (!existsSync(standaloneDir)) return [];
  return readdirSync(standaloneDir, { withFileTypes: true })
    .filter(e => e.isFile() && e.name.endsWith('.tsx') && e.name !== 'index.tsx')
    .map(e => e.name.replace(/\.tsx$/, ''));
}

function pairLogos(group: string): void {
  const standaloneDir = join(COMPONENTS_ROOT, group, 'standalone');
  const pairedDir = join(COMPONENTS_ROOT, group, 'paired');
  rmSync(pairedDir, { recursive: true, force: true });

  const fileBaseNames = listStandaloneFileBaseNames(standaloneDir);
  const lightFiles = fileBaseNames.filter(n => n.endsWith('Light'));
  const darkFileSet = new Set(fileBaseNames.filter(n => n.endsWith('Dark')));

  const pairs: { base: string; lightFile: string; darkFile: string }[] = [];
  const lightOnly: string[] = [];

  for (const lightFile of lightFiles) {
    const base = lightFile.replace(/Light$/, '');
    const darkFile = `${base}Dark`;
    if (darkFileSet.has(darkFile)) {
      pairs.push({ base, lightFile, darkFile });
      darkFileSet.delete(darkFile);
    } else {
      lightOnly.push(base);
    }
  }

  const darkOnly = [...darkFileSet].map(n => n.replace(/Dark$/, ''));

  if (lightOnly.length > 0 || darkOnly.length > 0) {
    const problems = [
      ...lightOnly.map(base => `"${base}" — есть Light-вариант, но нет Dark`),
      ...darkOnly.map(base => `"${base}" — есть Dark-вариант, но нет Light`),
    ];
    throw new Error(
      `pairLogoVariants: непарные логотипы в svgs/${group}/ — исправь в Figma или удали:\n${problems.join('\n')}`,
    );
  }

  if (pairs.length === 0) return;

  mkdirSync(pairedDir, { recursive: true });

  for (const { base, lightFile, darkFile } of pairs) {
    const componentName = base;
    const lightComponent = `${lightFile}SVG`;
    const darkComponent = `${darkFile}SVG`;
    const content = `// // DO NOT EDIT MANUALLY

import { createPairedThemedIcon } from '../../../factory/createPairedThemedIcon';
import ${darkComponent} from '../standalone/${darkFile}';
import ${lightComponent} from '../standalone/${lightFile}';

const ${componentName} = createPairedThemedIcon({ light: ${lightComponent}, dark: ${darkComponent} });

export default ${componentName};
`;
    writeFileSync(join(pairedDir, `${componentName}.tsx`), content, 'utf-8');
  }

  const indexContent = pairs.map(({ base }) => `export { default as ${base} } from './${base}';`).join('\n') + '\n';
  writeFileSync(join(pairedDir, 'index.ts'), indexContent, 'utf-8');

  // eslint-disable-next-line no-console
  console.log(`Собрано ${pairs.length} логотип(ов) в компоненты, переключающиеся по теме.`);
}

function main(): void {
  const groups = getIconGroups();
  for (const group of groups) {
    if (getGroupConfig(group).themed) {
      pairLogos(group);
    }
  }
}

main();
