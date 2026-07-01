import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { MODE, WIDTH } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

// Alias для main-root слотa Modal — большинство e2e ассертит именно по нему.
export const MAIN_TEST_ID = TEST_IDS.modal.root;
export const MODAL_TRIGGER_TEST_ID = TEST_IDS.modal.triggerOpen;

// Локальная копия `@ds/bottom-sheet` TEST_IDS.handle — кросс-пакетный импорт в spec'ах
// ломает playwright-compile (тянет SCSS). Маркер mobile-поверхности (swipe-handle рендерится
// только у BottomSheet), по которому ассертим surface-swap desktop↔mobile. Синхронизируй при изменении.
export const BOTTOM_SHEET_HANDLE_TEST_ID = 'bottom-sheet__handle';

// Ключевая выборка для props propagation: один представитель на каждое
// значение оси (mode × width). VisualMatrix покрывает декартово произведение.
export const KEY_COMBOS = [
  { mode: MODE.Regular, width: WIDTH.S },
  { mode: MODE.Aggressive, width: WIDTH.M },
  { mode: MODE.Forced, width: WIDTH.L },
] as const;

export const MODAL_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type ModalStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: ModalStoryProps,
  story: string = MODAL_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: 'modal',
    group: 'modal',
    story,
    props: {
      'data-test-id': TEST_IDS.modal.root,
      ...props,
    },
    globals,
  };
}
