import { DOCGEN_SECTION_PLACEHOLDER_END, DOCGEN_SECTION_PLACEHOLDER_START } from './constants';
import { Docgen } from './Docgen';

const instance = new Docgen({
  packagesRoot: './packages',
  docPlaceholder: [DOCGEN_SECTION_PLACEHOLDER_START, DOCGEN_SECTION_PLACEHOLDER_END],
  parserOptions: {
    shouldExtractLiteralValuesFromEnum: true,
    propFilter: (prop) => {
      // Исключаем стандартные HTML атрибуты из React.HTMLAttributes
      if (prop.declarations && prop.declarations.length > 0) {
        const hasPropAdditionalDescription = prop.declarations.some(
          (declaration) => !declaration.fileName.includes('node_modules')
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

export const docgen = (packages?: string[]) => instance.run(packages);
