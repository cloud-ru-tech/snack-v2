import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const DRAWER_CUSTOM_TEST_ID = TEST_IDS.drawerCustom.root;
export const DRAWER_CUSTOM_TRIGGER_TEST_ID = TEST_IDS.drawerCustom.triggerOpen;

// Локальная копия `@ds/bottom-sheet` TEST_IDS.handle — маркер mobile-поверхности (swipe-handle
// рендерит только BottomSheet), по которому ассертим surface-swap. Синхронизируй при изменении.
export const BOTTOM_SHEET_HANDLE_TEST_ID = 'bottom-sheet__handle';

export const DRAWER_CUSTOM_STORIES = {
  playground: { name: 'drawercustom', group: 'drawer', story: 'playground' },
} as const satisfies Record<string, StoryRef>;

export type DrawerCustomStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: DrawerCustomStoryProps,
  ref: StoryRef = DRAWER_CUSTOM_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props,
    globals,
  };
}
