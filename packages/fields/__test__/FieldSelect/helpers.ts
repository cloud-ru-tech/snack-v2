import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

// Локальная копия `@ds/list` TEST_IDS.baseItem (кросс-пакетный импорт ломает playwright-compile) — синхронизируй при изменении.
export const LIST_BASE_ITEM_TEST_ID = 'list__base-item';
// Локальные копии `@ds/list` empty-state / loader test-id'ов (тот же запрет на кросс-пакетный импорт).
export const LIST_LOADER_TEST_ID = 'list__loader';
export const LIST_NO_DATA_TEST_ID = 'list__no-data';

export const FIELD_SELECT_STORIES = {
  playground: { name: 'fields-fieldselect', story: 'playground' },
  visualMatrix: { name: 'fields-fieldselect', story: 'visual-matrix' },
  interactionTest: { name: 'fields-fieldselect-tests-interaction', story: 'interaction-test' },
  open: { name: 'fields-fieldselect-tests-open', story: 'open' },
  openMultiple: { name: 'fields-fieldselect-tests-open', story: 'open-multiple' },
  openGrouped: { name: 'fields-fieldselect-tests-open', story: 'open-grouped' },
  openGroupSelect: { name: 'fields-fieldselect-tests-open', story: 'open-group-select' },
  openNested: { name: 'fields-fieldselect-tests-open', story: 'open-nested' },
  openAccordion: { name: 'fields-fieldselect-tests-open', story: 'open-accordion' },
  openPinned: { name: 'fields-fieldselect-tests-open', story: 'open-pinned' },
  openLoading: { name: 'fields-fieldselect-tests-open', story: 'open-loading' },
  openEmpty: { name: 'fields-fieldselect-tests-open', story: 'open-empty' },
} as const satisfies Record<string, StoryRef>;

// Trigger-based field (trigger-based §4): не инжектим `data-test-id` через URL-args,
// чтобы он не перетёр story-default'ы и не попал на portal-узел Droplist.
// Playground сам ставит `data-test-id={TEST_IDS.fieldSelect}` на триггер.
export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_SELECT_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: { ...props },
  };
}
