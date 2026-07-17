import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SVGFixer, { FixerOptions } from 'oslllo-svg-fixer';
import path from 'path';
import { getGroupFixedPath, getGroupSourcePath, getIconGroups } from '../shared/iconGroups';
import { getGroupConfig } from '../shared/groupConfig';

const FIXER_OPTION: FixerOptions = {
  throwIfDestinationDoesNotExist: false,
};

const STROKE_WEIGHT_VAR = 'var(--sn-density-size-icon-strokeWeight-s)';

/** Заменяет хардкод fill/stroke на currentColor; stroke-width 1.5(px) — на --sn-density-size-icon-strokeWeight-s. Сохраняет fill="none" и stroke="none". */
function normalizeSvgColors(svgContent: string): string {
  return svgContent
    .replace(/\bfill=(["'])(?!none|currentColor|inherit)([^"']*)\1/g, 'fill="currentColor"')
    .replace(/\bstroke=(["'])(?!none|currentColor|inherit)([^"']*)\1/g, 'stroke="currentColor"')
    .replace(/\bstroke-width\s*=\s*["']1\.5\s*px?["']/gi, `stroke-width="${STROKE_WEIGHT_VAR}"`)
    .replace(/\bstroke-width\s*=\s*["']1\.5["']/g, `stroke-width="${STROKE_WEIGHT_VAR}"`)
    .replace(
      /\bstroke-width\s*=\s*["']var\(--sn-primitive-strokeWeight-strokeMedium[^"']*\)["']/gi,
      `stroke-width="${STROKE_WEIGHT_VAR}"`,
    );
}

/**
 * Несколько брендовых логотипов (например, Golos, T5) используют эффект матового стекла через
 * `<foreignObject><div xmlns="…xhtml" …>`. Атрибут xmlns избыточен при рендере как React DOM-узла
 * (браузер и так трактует содержимое foreignObject как HTML в этом контексте), а JSX-типизация
 * `div` в React/TS не принимает проп `xmlns` — вырезаем его, чтобы вывод svgr проходил typecheck.
 */
function stripForeignObjectXmlns(svgContent: string): string {
  return svgContent.replace(/(<div\b[^>]*?)\s+xmlns=(["'])http:\/\/www\.w3\.org\/1999\/xhtml\2/g, '$1');
}

async function fixIconsFile(
  sourcePath: string,
  destDir: string,
  colorMode: 'currentColor' | 'preserve',
): Promise<void> {
  const destFile = path.join(destDir, path.basename(sourcePath));

  // oslllo-svg-fixer трассирует SVG в один монохромный fill-path (создан для конвертации
  // stroke-based интерфейсных иконок в icon-font, см. её README) — теряет весь исходный
  // fill/stroke цвет. Это нормально для currentColor-интерфейсных иконок, но уничтожает
  // многоцветный контент (флаги, брендовые логотипы, цветные service/extension-иконки). Ассеты
  // в preserve-режиме уже валидный SVG, экспортированный из Figma, — им достаточно прямого копирования.
  if (colorMode === 'preserve') {
    const content = fs.readFileSync(sourcePath, 'utf-8');
    fs.writeFileSync(destFile, stripForeignObjectXmlns(content), 'utf-8');
    // eslint-disable-next-line no-console
    console.log(sourcePath, '- скопирован (preserve)');
    return;
  }

  try {
    const report = await new SVGFixer(sourcePath, destDir, FIXER_OPTION).fix();
    if (fs.existsSync(destFile)) {
      const content = fs.readFileSync(destFile, 'utf-8');
      fs.writeFileSync(destFile, normalizeSvgColors(content), 'utf-8');
    }
    // eslint-disable-next-line no-console
    console.log(report.location.original.source, '- обработан');
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

async function processFiles(
  sourceRoot: string,
  destRoot: string,
  relPath: string,
  colorMode: 'currentColor' | 'preserve',
): Promise<void> {
  const fullSource = path.join(sourceRoot, relPath);
  const entries = fs.readdirSync(fullSource, { withFileTypes: true });

  for (const e of entries) {
    const childRel = relPath ? path.join(relPath, e.name) : e.name;
    if (e.isDirectory()) {
      await processFiles(sourceRoot, destRoot, childRel, colorMode);
    } else if (e.isFile() && e.name.endsWith('.svg')) {
      const destDir = path.join(destRoot, path.dirname(childRel));
      fs.mkdirSync(destDir, { recursive: true });
      await fixIconsFile(path.join(fullSource, e.name), destDir, colorMode);
    }
  }
}

async function main(): Promise<void> {
  const groups = getIconGroups();
  for (const group of groups) {
    const source = getGroupSourcePath(group);
    const dest = getGroupFixedPath(group);
    fs.mkdirSync(dest, { recursive: true });
    const { colorMode } = getGroupConfig(group);
    await processFiles(source, dest, '', colorMode);
  }
}

main();
