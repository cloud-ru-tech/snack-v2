// Импорт из `src/constants`, а не из entry `@ds/uikit-product-welcome-tour` — entry
// тащит SCSS-модули, что ломает playwright-compile при импорте этого файла в e2e helpers.
import { TEST_IDS as PACKAGE_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  ...PACKAGE_TEST_IDS,
  triggerOpen: 'welcome-tour-trigger',
  target: (index: number) => `welcome-tour-target-${index}`,
  /** Examples/Controlled: кнопки запуска и индикатор внешнего состояния. */
  controlled: {
    startFrom: (index: number) => `welcome-tour-controlled-start-${index}`,
    state: 'welcome-tour-controlled-state',
  },
  /** VisualMatrix: целевой элемент и триггер ячейки `композиция × placement`. */
  vm: {
    target: 'welcome-tour-vm-target',
    trigger: (key: string) => `welcome-tour-vm-${key}`,
  },
} as const;
