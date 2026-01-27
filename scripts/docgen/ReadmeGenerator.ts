import fs from 'fs';
import path from 'path';

import { logInfo } from '../utils/console';

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

## Usage

{USAGE_EXAMPLES}

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

  private readDocFile(packageName: string): string {
    try {
      return fs.readFileSync(this.path(packageName, 'docs/index.mdx'), 'utf-8');
    } catch (_e) {
      console.warn(`Error while reading docs/index.mdx file in "${packageName}".`);
      return '';
    }
  }

  private readSrcIndex(packageName: string): string {
    try {
      return fs.readFileSync(this.path(packageName, 'src/index.ts'), 'utf-8');
    } catch (_e) {
      console.warn(`Error while reading src/index.ts file in "${packageName}".`);
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

  private extractUsageExamples(docContent: string): string {
    // Извлекаем секцию Usage из документации
    const usageMatch = docContent.match(/## Usage\s*\n([\s\S]*?)(?=\n## )/);
    if (!usageMatch) return '';

    const usageSection = usageMatch[1];
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
    // Извлекаем секцию Best practices из документации
    const bestPracticesMatch = docContent.match(/## Best practices\n([\s\S]*?)(?=\n##|$)/);
    if (!bestPracticesMatch) return '';

    return bestPracticesMatch[1].trim();
  }

  private extractExports(srcContent: string, packageName: string): string {
    const lines = srcContent.split('\n').filter((line) => line.trim().startsWith('export'));

    if (lines.length === 0) return '';

    const exports: string[] = [];

    for (const line of lines) {
      // Для export { ... }
      const namedExportMatch = line.match(/export\s+\{([^}]+)\}/);
      if (namedExportMatch) {
        const items = namedExportMatch[1].split(',').map((item) => {
          const parts = item.trim().split(' as ');
          return parts[parts.length - 1].trim();
        });
        exports.push(...items);
      }

      // Для export type { ... }
      const typeExportMatch = line.match(/export\s+type\s+\{([^}]+)\}/);
      if (typeExportMatch) {
        const items = typeExportMatch[1].split(',').map((item) => {
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
    return entities.filter((entity) => {
      const packagePath = this.path(entity);
      return (
        fs.statSync(packagePath).isDirectory() &&
        fs.existsSync(path.join(packagePath, 'docs/index.mdx'))
      );
    });
  }

  private generateReadme(packageName: string): string {
    const docContent = this.readDocFile(packageName);
    const srcContent = this.readSrcIndex(packageName);

    const componentName = this.extractComponentName(docContent);
    const description = this.extractDescription(docContent);
    const usageExamples = this.extractUsageExamples(docContent);
    const bestPractices = this.extractBestPractices(docContent);
    const exports = this.extractExports(srcContent, packageName);

    return README_TEMPLATE.replace(/{COMPONENT_NAME}/g, componentName || packageName)
      .replace(/{PACKAGE_NAME}/g, packageName)
      .replace(/{DESCRIPTION}/g, description)
      .replace(/{EXPORTS}/g, exports)
      .replace(/{USAGE_EXAMPLES}/g, usageExamples)
      .replace(/{BEST_PRACTICES}/g, bestPractices)
      .replace(/{DOCS_PATH}/g, 'docs/index.mdx');
  }

  async run(packagesPaths: string[] = []) {
    const packages = this.getPackagesList();

    for (const packageName of packages) {
      if (
        packagesPaths.length &&
        !packagesPaths.some((packagePath) => packagePath.endsWith(packageName))
      ) {
        continue;
      }

      const readme = this.generateReadme(packageName);
      fs.writeFileSync(this.path(packageName, 'README.md'), readme, 'utf-8');
      logInfo(`✔ README.md generated for ${packageName}`);
    }
  }
}
