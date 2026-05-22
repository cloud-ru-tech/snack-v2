// Импорт из `src/constants`, а не из entry `@ds/modal` — entry тащит SCSS-модули,
// что ломает playwright-compile при импорте этого файла в e2e helpers.
import { TEST_IDS as PACKAGE_TEST_IDS } from '../src/constants';

// Multi-component пакет: один источник истины для всех `data-test-id`,
// используемых в stories и e2e. Слоты компонентов берутся из публичного
// `TEST_IDS` пакета, чтобы рассинхрон с реализацией был невозможен.
export const TEST_IDS = {
  modal: {
    ...PACKAGE_TEST_IDS,
    root: 'modal',
    triggerOpen: 'modal-trigger',
    firstButton: 'modal__first-button',
    secondButton: 'modal__second-button',
    image: 'modal__image',
    tooltip: 'modal__title-tooltip',
  },
  modalCustom: {
    root: 'modal-custom',
    triggerOpen: 'modal-custom-trigger',
  },
} as const;

// VisualMatrix trigger-panel — id'шники триггеров и dismiss-action.
export const VM_TRIGGER_TEST_ID = (key: string) => `modal-vm-${key}`;
export const VM_DISMISS_TEST_ID = 'modal-vm-dismiss';
