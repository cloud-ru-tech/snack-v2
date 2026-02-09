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

const WRAPPER_TAG_REGEX = /^\s*<\/?(?:ExampleContainer|ExampleRow|ExampleGrid|ExampleItem)(?:\s[^>]*)?>\s*$/;
const COMPONENT_IN_JSX_REGEX = /<([A-Z][a-zA-Z0-9]*)(?:\s|>)/g;
const KNOWN_SYMBOLS_REGEX = /\b(APPEARANCE|SIZE|SHAPE|VARIANT|COLOR|LOADER_SIZE|SUN_SIZE)\b/g;

/**
 * Извлекает секцию "Live examples" и конвертирует ExampleContainer/ExampleRow/ExampleItem
 * в markdown-блоки ```tsx с импортом — тот же результат, что и в README (docgen).
 * componentName — из frontmatter title или первого # заголовка (fallback для импорта).
 */
export function replaceLiveExamplesWithCodeBlocks(content: string, packageName: string): string {
  const liveRegex = /## Live examples\s*\n([\s\S]*?)(?=\n## |\n---\n|$)/g;
  const allSections: string[] = [];
  let liveMatch;
  while ((liveMatch = liveRegex.exec(content)) !== null) {
    allSections.push(liveMatch[1]);
  }
  if (allSections.length === 0) return content;
  const section = allSections.join('\n\n');
  const examples: string[] = [];
  const parts = section.split(/(?=###\s+)/);

  for (const part of parts) {
    if (!part.trim()) continue;
    const titleMatch = part.match(/###\s+(.+?)(?:\n|$)/);
    if (!titleMatch) continue;
    const title = titleMatch[1].trim();
    const body = part.replace(/###\s+.+?(?:\n|$)/, '').trim();
    if (!body.match(/<[\s\S]+?>/)) continue;

    const lines = body.split('\n').filter(line => {
      const t = line.trim();
      return t && !WRAPPER_TAG_REGEX.test(line.trim());
    });
    if (lines.length === 0) continue;

    const indents = lines.map(l => (/^\s*/.exec(l) ?? [''])[0].length);
    const validIndents = indents.filter(n => n < 200);
    const minIndent = validIndents.length > 0 ? Math.min(...validIndents) : 0;
    const codeLines = lines.map(l => (minIndent > 0 && l.length >= minIndent ? l.slice(minIndent) : l.trim()));
    const snippet = codeLines.join('\n').trim();

    const usedSymbols = new Set<string>();
    COMPONENT_IN_JSX_REGEX.lastIndex = 0;
    let cm: RegExpExecArray | null;
    while ((cm = COMPONENT_IN_JSX_REGEX.exec(snippet)) !== null) usedSymbols.add(cm[1]);
    KNOWN_SYMBOLS_REGEX.lastIndex = 0;
    let sm: RegExpExecArray | null;
    while ((sm = KNOWN_SYMBOLS_REGEX.exec(snippet)) !== null) usedSymbols.add(sm[1]);
    const componentName = (content.match(/^#\s+(.+)$/m) ?? [])[1]?.trim() || 'Component';
    if (usedSymbols.size === 0) usedSymbols.add(componentName);

    const importLine = `import { ${[...usedSymbols].sort().join(', ')} } from '@design-system/${packageName}';`;
    const fullSnippet = `${importLine}\n\n${snippet}`;
    examples.push(`### ${title}\n\n\`\`\`tsx\n${fullSnippet}\n\`\`\``);
  }

  if (examples.length === 0) return content;
  const newSection = `## Live examples\n\n${examples.join('\n\n')}\n`;
  return content.replace(/## Live examples\s*\n[\s\S]*?(?=\n## |\n---\n|$)/, newSection.trimEnd());
}

/**
 * Очищает MDX-контент до читаемого plain text: убирает frontmatter, импорты (#astro, относительные),
 * интерактивные компоненты, лишние переносы.
 * Перед strip для llm.txt нужно вызвать replaceLiveExamplesWithCodeBlocks, чтобы Live examples
 * содержали те же tsx-сниппеты, что и в README.
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
