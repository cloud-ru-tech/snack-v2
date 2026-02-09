import { existsSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Рекурсивный список .mdx файлов в директории.
 * @param dir — абсолютный путь к папке (например docs/ или components/loader/)
 * @returns относительные пути: ['index.mdx', 'components/Spinner.mdx']
 */
export function listMdxRecursive(dir: string): string[] {
  if (!existsSync(dir) || !statSync(dir).isDirectory()) return [];
  const list: string[] = [];
  const walk = (currentDir: string, base = '') => {
    if (!existsSync(currentDir) || !statSync(currentDir).isDirectory()) return;
    const items = readdirSync(currentDir);
    for (const item of items) {
      const full = join(currentDir, item);
      const rel = base ? `${base}/${item}` : item;
      if (statSync(full).isDirectory()) {
        walk(full, rel);
      } else if (item.endsWith('.mdx')) {
        list.push(rel);
      }
    }
  };
  walk(dir);
  return list.sort();
}

/** Паттерны JSX-компонентов, которые вырезаем при конвертации MDX в plain text (README, llm.txt) */
const STRIP_JSX_PATTERNS = [
  /<ExampleContainer[^>]*>[\s\S]*?<\/ExampleContainer>/g,
  /<ExampleRow[^>]*>[\s\S]*?<\/ExampleRow>/g,
  /<ExampleGrid[^>]*>[\s\S]*?<\/ExampleGrid>/g,
  /<ExampleItem[^>]*>[\s\S]*?<\/ExampleItem>/g,
  /<StorybookIframe[^>]*\/?>/g,
  /<Changelog[^>]*\/?>/g,
  /<LlmLink[^>]*\/?>/g,
  /<LocaleProvider[^>]*>[\s\S]*?<\/LocaleProvider>/g,
  /<LocaleSwitch[^>]*\/?>/g,
  /<LocaleCase[^>]*>[\s\S]*?<\/LocaleCase>/g,
];

/**
 * Очищает MDX-контент до читаемого plain text: убирает frontmatter, импорты (#astro, относительные),
 * интерактивные компоненты, лишние переносы.
 * Используется для генерации llm.txt и при необходимости для README.
 */
export function stripMdxForPlainText(content: string): string {
  let out = content;

  // Убрать frontmatter
  out = out.replace(/^---\n[\s\S]*?\n---\n?/, '');

  // Убрать все import (в т.ч. #astro и относительные)
  out = out.replace(/^import\s+[\s\S]*?from\s+['"#][^'"]*['"];?\s*$/gm, '');

  // Убрать JSX-компоненты
  for (const pattern of STRIP_JSX_PATTERNS) {
    out = out.replace(pattern, '');
  }

  // Убрать JSX-комментарии
  out = out.replace(/<>\s*\{\s*\/\*[\s\S]*?\*\/\s*\}\s*<\/>/g, '');
  out = out.replace(/\{\s*frontmatter\.\w+\s*\}/g, '');

  // Убрать лишние пустые строки
  out = out.replace(/\n{3,}/g, '\n\n');
  return out.trim();
}
