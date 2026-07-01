import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const MODAL_CUSTOM_TEST_ID = TEST_IDS.modalCustom.root;
export const MODAL_CUSTOM_TRIGGER_TEST_ID = TEST_IDS.modalCustom.triggerOpen;

export const MODAL_CUSTOM_STORIES = {
  playground: 'playground',
} as const;

export type ModalCustomStoryProps = Record<string, unknown>;

// Локальная копия `@ds/bottom-sheet` TEST_IDS.handle — маркер mobile-поверхности (swipe-handle
// рендерит только BottomSheet), по которому ассертим surface-swap. Синхронизируй при изменении.
export const BOTTOM_SHEET_HANDLE_TEST_ID = 'bottom-sheet__handle';

export function buildStoryOptions(
  props?: ModalCustomStoryProps,
  story: string = MODAL_CUSTOM_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: 'modalcustom',
    group: 'modal',
    story,
    props,
    globals,
  };
}
