import fs from 'fs';
import path from 'path';

import { logInfo, logWarning } from '../utils/console';

const README_TEMPLATE = `# {COMPONENT_NAME}

{DESCRIPTION}

## Installation

\`\`\`bash
npm install @design-system/{PACKAGE_NAME}
# or
yarn add @design-system/{PACKAGE_NAME}
# or
pnpm add @design-system/{PACKAGE_NAME}
\`\`\`

## Exports

{EXPORTS}

{LIVE_EXAMPLES}

## Usage

{USAGE_EXAMPLES}

## Props

{PROPS_TABLE}

## Best Practices

{BEST_PRACTICES}

---

## Additional Resources

- **Full Documentation:** [View documentation](./{DOCS_PATH})
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
`;

type Options = {
  packagesRoot: string;
};

export class ReadmeGenerator {
  private readonly packagesRootPath: string;

  constructor({ packagesRoot }: Options) {
    this.packagesRootPath = path.resolve(packagesRoot);
  }

  private path(...paths: string[]): string {
    return path.resolve(this.packagesRootPath, ...paths);
  }

  private readDocFile(packageName: string, relativePath: string = 'docs/index.mdx'): string {
    try {
      return fs.readFileSync(this.path(packageName, relativePath), 'utf-8');
    } catch (_e) {
      return '';
    }
  }

  /** Рекурсивный список .mdx в docs/ (вложенность: components/Spinner.mdx, hooks/useX.mdx) */
  private getDocsMdxPathsRecursive(packageName: string): string[] {
    const docsDir = this.path(packageName, 'docs');
    if (!fs.existsSync(docsDir)) return [];
    const list: string[] = [];
    const walk = (dir: string, base = '') => {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const full = path.join(dir, item);
        const rel = base ? `${base}/${item}` : item;
        if (fs.statSync(full).isDirectory()) {
          walk(full, rel);
        } else if (item.endsWith('.mdx')) {
          list.push(rel);
        }
      }
    };
    walk(docsDir);
    return list.sort();
  }

  /** Контент со всех страниц (в т.ч. вложенных: components/*, hooks/*). Склеиваем для README. */
  private getComponentDocContent(packageName: string): string {
    const files = this.getDocsMdxPathsRecursive(packageName);
    const parts: string[] = [];
    for (const file of files) {
      if (file === 'index.mdx') continue;
      const content = this.readDocFile(packageName, `docs/${file}`);
      if (content.includes('DOCUMENTATION_SECTION_START') || content.includes('## Live examples')) {
        parts.push(content);
      }
    }
    return parts.join('\n\n---\n\n');
  }

  private readSrcIndex(packageName: string): string {
    try {
      return fs.readFileSync(this.path(packageName, 'src/index.ts'), 'utf-8');
    } catch (_e) {
      logWarning(`Error while reading src/index.ts file in "${packageName}".`);
      return '';
    }
  }

  private extractDescription(docContent: string): string {
    // Извлекаем описание из frontmatter description или из первого параграфа после заголовка
    const descriptionMatch = docContent.match(/description:\s*['"](.+?)['"]/);
    if (descriptionMatch) {
      return descriptionMatch[1];
    }

    // Если нет в frontmatter, берем первый параграф после заголовка
    const lines = docContent.split('\n');
    let afterTitle = false;
    for (const line of lines) {
      if (line.startsWith('# ')) {
        afterTitle = true;
        continue;
      }
      if (afterTitle && line.trim() && !line.startsWith('#') && !line.startsWith('import')) {
        return line.trim();
      }
    }

    return '';
  }

  private extractComponentName(docContent: string): string {
    const titleMatch = docContent.match(/^#\s+(.+)$/m);
    return titleMatch ? titleMatch[1] : '';
  }

  /**
   * Извлекает секцию "Live examples" из mdx и конвертирует JSX-блоки в tsx-сниппеты для README.
   * Убирает обёртки ExampleContainer/ExampleRow/ExampleGrid/ExampleItem, оставляет только использование компонента.
   */
  private extractLiveExamplesCode(docContent: string, packageName: string, componentName: string): string {
    const liveRegex = /## Live examples\s*\n([\s\S]*?)(?=\n## |\n---\n|$)/g;
    const allSections: string[] = [];
    let liveMatch;
    while ((liveMatch = liveRegex.exec(docContent)) !== null) {
      allSections.push(liveMatch[1]);
    }
    if (allSections.length === 0) return '';
    const section = allSections.join('\n\n');
    const examples: string[] = [];
    const wrapperTagRegex = /^\s*<\/?(?:ExampleContainer|ExampleRow|ExampleGrid|ExampleItem)(?:\s[^>]*)?>\s*$/;

    // Разбиваем по ### заголовкам
    const parts = section.split(/(?=###\s+)/);

    for (const part of parts) {
      if (!part.trim()) continue;

      const titleMatch = part.match(/###\s+(.+?)(?:\n|$)/);
      if (!titleMatch) continue;

      const title = titleMatch[1].trim();
      const body = part.replace(/###\s+.+?(?:\n|$)/, '').trim();

      // Приоритет: markdown-блок ```tsx/ts — полный пример с импортом
      const codeBlockMatch = body.match(/```(?:tsx?|ts)\s*\n([\s\S]*?)```/);
      if (codeBlockMatch) {
        const code = codeBlockMatch[1].trim();
        examples.push(`### ${title}\n\n\`\`\`tsx\n${code}\n\`\`\``);
        continue;
      }

      // Fallback: извлекаем JSX из ExampleContainer
      const jsxMatch = body.match(/<[\s\S]+?>/);
      if (!jsxMatch) continue;

      const lines = body.split('\n').filter(line => {
        const t = line.trim();
        if (!t) return false;
        if (wrapperTagRegex.test(t)) return false;
        // Исключаем строки markdown-блоков кода
        if (/^```|^\s*```/.test(t)) return false;
        return true;
      });

      if (lines.length === 0) continue;

      // Убираем отступ: находим минимальный отступ и срезаем его
      const minIndent = Math.min(...lines.map(l => (/^\s*/.exec(l) ?? [''])[0].length).filter(n => n < 200));
      const codeLines = lines.map(l => (minIndent > 0 && l.length >= minIndent ? l.slice(minIndent) : l.trim()));
      const snippet = codeLines.join('\n').trim();

      // Собираем импорт: компоненты из JSX (<Avatar, <Spinner) + enum-символы (APPEARANCE, SIZE, …)
      const usedSymbols = new Set<string>();
      const componentInJsxRegex = /<([A-Z][a-zA-Z0-9]*)(?:\s|>)/g;
      let cm: RegExpExecArray | null;
      while ((cm = componentInJsxRegex.exec(snippet)) !== null) usedSymbols.add(cm[1]);
      const symbolRegex = /\b(APPEARANCE|SIZE|SHAPE|VARIANT|COLOR|LOADER_SIZE|SUN_SIZE)\b/g;
      let sm: RegExpExecArray | null;
      while ((sm = symbolRegex.exec(snippet)) !== null) usedSymbols.add(sm[1]);
      if (usedSymbols.size === 0) usedSymbols.add(componentName);

      const importLine = `import { ${[...usedSymbols].sort().join(', ')} } from '@design-system/${packageName}';`;
      const fullSnippet = `${importLine}\n\n${snippet}`;

      examples.push(`### ${title}\n\n\`\`\`tsx\n${fullSnippet}\n\`\`\``);
    }

    if (examples.length === 0) return '';

    return `## Live examples\n\n${examples.join('\n\n')}\n`;
  }

  private extractUsageExamples(docContent: string): string {
    const usageRegex = /## Usage\s*\n([\s\S]*?)(?=\n## |\n---\n|$)/g;
    const sections: string[] = [];
    let usageMatch;
    while ((usageMatch = usageRegex.exec(docContent)) !== null) {
      sections.push(usageMatch[1]);
    }
    if (sections.length === 0) return '';
    const usageSection = sections.join('\n\n');
    const examples: string[] = [];

    // Разбиваем на подсекции по ### заголовкам
    const subsections = usageSection.split(/(?=###\s+)/);

    for (const subsection of subsections) {
      if (!subsection.trim()) continue;

      const titleMatch = subsection.match(/###\s+(.+)/);
      if (!titleMatch) continue;

      const title = titleMatch[1].trim();
      const codeMatch = subsection.match(/```(tsx?)\n([\s\S]*?)```/);

      if (codeMatch) {
        const lang = codeMatch[1];
        const code = codeMatch[2].trim();
        examples.push(`### ${title}\n\n\`\`\`${lang}\n${code}\n\`\`\``);
      }

      if (examples.length >= 3) break;
    }

    return examples.length > 0 ? examples.join('\n\n') : '';
  }

  private extractBestPractices(docContent: string): string {
    const bestPracticesMatch = docContent.match(/## Best practices\n([\s\S]*?)(?=\n## |\n---\n|$)/);
    if (!bestPracticesMatch) return '';

    return bestPracticesMatch[1].trim();
  }

  private extractPropsTable(docContent: string): string {
    const propsRegex =
      /\[\/\/\]: DOCUMENTATION_SECTION_START\n\[\/\/\]: THIS_SECTION_IS_AUTOGENERATED_PLEASE_DONT_EDIT_IT\n([\s\S]*?)\n\[\/\/\]: DOCUMENTATION_SECTION_END/g;
    const parts: string[] = [];
    let propsMatch;
    while ((propsMatch = propsRegex.exec(docContent)) !== null) {
      let block = propsMatch[1].trim();
      block = block.replace(/(?:^|\n)###\s+Props\n?/g, '\n');
      if (block) parts.push(block.trim());
    }
    return parts.join('\n\n');
  }

  private extractExports(srcContent: string, packageName: string): string {
    const lines = srcContent.split('\n').filter(line => line.trim().startsWith('export'));

    if (lines.length === 0) return '';

    const exports: string[] = [];

    for (const line of lines) {
      // Для export { ... }
      const namedExportMatch = line.match(/export\s+\{([^}]+)\}/);
      if (namedExportMatch) {
        const items = namedExportMatch[1].split(',').map(item => {
          const parts = item.trim().split(' as ');
          return parts[parts.length - 1].trim();
        });
        exports.push(...items);
      }

      // Для export type { ... }
      const typeExportMatch = line.match(/export\s+type\s+\{([^}]+)\}/);
      if (typeExportMatch) {
        const items = typeExportMatch[1].split(',').map(item => {
          const parts = item.trim().split(' as ');
          const name = parts[parts.length - 1].trim();
          return `type ${name}`;
        });
        exports.push(...items);
      }
    }

    if (exports.length === 0) return '';

    return `\`\`\`typescript\nimport {\n  ${exports.join(',\n  ')}\n} from '@design-system/${packageName}';\n\`\`\``;
  }

  private getPackagesList(): string[] {
    const entities = fs.readdirSync(this.packagesRootPath);
    return entities.filter(entity => {
      const packagePath = this.path(entity);
      return fs.statSync(packagePath).isDirectory() && fs.existsSync(path.join(packagePath, 'docs/index.mdx'));
    });
  }

  private generateReadme(packageName: string): string {
    const indexContent = this.readDocFile(packageName);
    const componentContent = this.getComponentDocContent(packageName) || indexContent;
    const srcContent = this.readSrcIndex(packageName);

    const componentName = this.extractComponentName(indexContent);
    const description = this.extractDescription(indexContent);
    const liveExamples = this.extractLiveExamplesCode(componentContent, packageName, componentName || packageName);
    const usageExamples = this.extractUsageExamples(componentContent);
    const bestPractices = this.extractBestPractices(componentContent);
    const propsTable = this.extractPropsTable(componentContent);
    const exports = this.extractExports(srcContent, packageName);

    return README_TEMPLATE.replace(/{COMPONENT_NAME}/g, componentName || packageName)
      .replace(/{PACKAGE_NAME}/g, packageName)
      .replace(/{DESCRIPTION}/g, description)
      .replace(/{EXPORTS}/g, exports)
      .replace(/{LIVE_EXAMPLES}/g, liveExamples)
      .replace(/{USAGE_EXAMPLES}/g, usageExamples)
      .replace(/{PROPS_TABLE}/g, propsTable)
      .replace(/{BEST_PRACTICES}/g, bestPractices)
      .replace(/{DOCS_PATH}/g, 'docs/index.mdx');
  }

  async run(packagesPaths: string[] = []) {
    const packages = this.getPackagesList();

    for (const packageName of packages) {
      if (packagesPaths.length && !packagesPaths.some(packagePath => packagePath.endsWith(packageName))) {
        continue;
      }

      const readme = this.generateReadme(packageName);
      fs.writeFileSync(this.path(packageName, 'README.md'), readme, 'utf-8');
      logInfo(`✔ README.md generated for ${packageName}`);
    }
  }
}
