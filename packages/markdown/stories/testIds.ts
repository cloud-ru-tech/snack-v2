// Импорт из leaf-файла `src/constants` (а не из `@ds/markdown` entry) —
// чтобы playwright-compile в spec.ts не пытался парсить CSS-модули пакета.
// См. test-environment-pitfalls.md §«Cross-package imports в спеках».
import { headingOptionTestId, tableCellTestId, TEST_IDS as PKG_TEST_IDS, toolbarButtonTestId } from '../src/constants';

// Единый объект id для stories/specs: component-set id'шники пакета.
export const TEST_IDS = {
  ...PKG_TEST_IDS,
} as const;

export { headingOptionTestId, tableCellTestId, toolbarButtonTestId };
