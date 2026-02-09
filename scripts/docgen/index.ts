import { DOCGEN_SECTION_PLACEHOLDER_END, DOCGEN_SECTION_PLACEHOLDER_START } from './constants';
import { Docgen } from './Docgen';
import { ReadmeGenerator } from './ReadmeGenerator';

// Instance для генерации таблицы пропсов в документацию
const docgenInstance = new Docgen({
  packagesRoot: './packages',
  docPlaceholder: [DOCGEN_SECTION_PLACEHOLDER_START, DOCGEN_SECTION_PLACEHOLDER_END],
  targetFile: 'docs/index.mdx',
  parserOptions: {
    shouldExtractLiteralValuesFromEnum: true,
    propFilter: prop => {
      // Исключаем стандартные HTML-атрибуты (HTMLAttributes из react)
      if (prop.declarations && prop.declarations.length > 0) {
        const hasPropAdditionalDescription = prop.declarations.some(
          declaration => !declaration.fileName.includes('node_modules'),
        );
        return Boolean(hasPropAdditionalDescription);
      }
      // Исключаем служебные props
      if (prop.name.startsWith('data-') || prop.name.startsWith('aria-')) {
        return false;
      }
      return true;
    },
  },
});

// Instance для генерации README
const readmeGeneratorInstance = new ReadmeGenerator({
  packagesRoot: './packages',
});

export const docgen = (packages?: string[]) => docgenInstance.run(packages);
export const generateReadme = (packages?: string[]) => readmeGeneratorInstance.run(packages);
