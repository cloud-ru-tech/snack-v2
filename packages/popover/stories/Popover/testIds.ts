// Импорт из leaf-файла `src/testIds.ts`, а не из `src/constants.ts` — последний
// реэкспортит value из `@ds/popover-private`, через который playwright-compile
// тянет SCSS и падает.
import { TEST_IDS as PUBLIC_TEST_IDS } from '../../src/testIds';

/**
 * Test ids для stories и play-функций. Публичные id (которые компонент проксирует
 * через `data-test-id`) реэкспортируются из `@ds/popover`. Остальные — stories-level,
 * нужны для адресации триггера и слота контента внутри demo.
 */
export const TEST_IDS = {
  root: PUBLIC_TEST_IDS.root,
  triggerOpen: 'popover-trigger',
  content: 'popover-content',
} as const;

// VisualMatrix trigger-panel.
export const VM_TRIGGER_TEST_ID = (key: string) => `popover-vm-${key}`;
