import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as LIST_INTERNAL_TEST_IDS } from '../../src/constants';

export { TEST_IDS } from '../../stories/testIds';
export { LIST_INTERNAL_TEST_IDS };

// Локальная копия `TEST_IDS.input` из @ds/search/src/constants (кросс-пакетный импорт в spec запрещён). Синхронизируй при изменении там.
export const SEARCH_INPUT_TEST_ID = 'search__field-input';

/** data-test-id отдельного item'а списка: `list__base-item_<id>` (BaseItem.tsx). */
export const itemTestId = (id: string) => `${LIST_INTERNAL_TEST_IDS.baseItem}_${id}`;

/** Title `Components/List/Droplist[/Tests/<Scenario>]` → kebab-cased storybook id. */
export const DROPLIST_STORIES = {
  playground: { name: 'list-droplist', story: 'playground' },
  visualMatrix: { name: 'list-droplist', story: 'visual-matrix' },
  // `tests/Interaction` не заводится: её сценарий целиком покрыт play-функцией стори.
  submenu: { name: 'list-droplist-examples-submenu', story: 'submenu' },
  search: { name: 'list-droplist-examples-search', story: 'search' },
  withHeader: { name: 'list-droplist-examples-withheader', story: 'with-header' },
  controlled: { name: 'list-droplist-examples-controlled', story: 'controlled' },
  renderFnTrigger: { name: 'list-droplist-examples-renderfntrigger', story: 'render-fn-trigger' },
  // Reorder живёт на отдельном публичном компоненте — `Components/List/ReorderableDroplist`.
  reorderable: { name: 'list-reorderabledroplist', story: 'playground' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = DROPLIST_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  // Trigger-based: data-test-id на portal-узел не оседает — id ставит сама story на триггер, не через URL-args.
  return {
    name: ref.name,
    story: ref.story,
    props: { ...props },
    globals,
  };
}
