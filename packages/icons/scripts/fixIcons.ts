// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SVGFixer, { FixerOptions } from 'oslllo-svg-fixer';
import path from 'path';
import { getGroupFixedPath, getGroupSourcePath, getIconGroups } from './iconGroups';

const FIXER_OPTION: FixerOptions = {
  throwIfDestinationDoesNotExist: false,
};

const STROKE_WEIGHT_VAR = 'var(--sn-density-size-icon-strokeWeight-s)';

/** Replace hardcoded fill/stroke with currentColor; stroke-width 1.5(px) with --sn-density-size-icon-strokeWeight-s. Preserves fill="none" and stroke="none". */
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

async function fixIconsFile(sourcePath: string, destDir: string): Promise<void> {
  try {
    const report = await new SVGFixer(sourcePath, destDir, FIXER_OPTION).fix();
    const destFile = path.join(destDir, path.basename(sourcePath));
    if (fs.existsSync(destFile)) {
      const content = fs.readFileSync(destFile, 'utf-8');
      fs.writeFileSync(destFile, normalizeSvgColors(content), 'utf-8');
    }
    // eslint-disable-next-line no-console
    console.log(report.location.original.source, '- в работе');
  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}

async function processFiles(sourceRoot: string, destRoot: string, relPath: string): Promise<void> {
  const fullSource = path.join(sourceRoot, relPath);
  const entries = fs.readdirSync(fullSource, { withFileTypes: true });

  for (const e of entries) {
    const childRel = relPath ? path.join(relPath, e.name) : e.name;
    if (e.isDirectory()) {
      await processFiles(sourceRoot, destRoot, childRel);
    } else if (e.isFile() && e.name.endsWith('.svg')) {
      const destDir = path.join(destRoot, path.dirname(childRel));
      fs.mkdirSync(destDir, { recursive: true });
      await fixIconsFile(path.join(fullSource, e.name), destDir);
    }
  }
}

async function main(): Promise<void> {
  const groups = getIconGroups();
  for (const group of groups) {
    const source = getGroupSourcePath(group);
    const dest = getGroupFixedPath(group);
    fs.mkdirSync(dest, { recursive: true });
    await processFiles(source, dest, '');
  }
}

main();
