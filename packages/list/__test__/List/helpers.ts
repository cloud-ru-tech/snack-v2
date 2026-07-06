import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

// Импорт через ../../src/constants, минуя entry @ds/list (тянет CSS-модули, несовместимые с playwright-compile).
import { TEST_IDS as LIST_INTERNAL_TEST_IDS } from '../../src/constants';

export { LIST_INTERNAL_TEST_IDS };

/** data-test-id отдельного item'а списка: `list__base-item_<id>` (BaseItem.tsx). */
export const itemTestId = (id: string) => `${LIST_INTERNAL_TEST_IDS.baseItem}_${id}`;

/** Title `Components/List/List[/Examples|Tests/<Scenario>]` → kebab-cased storybook id. */
export const LIST_STORIES = {
  playground: { name: 'list-list', story: 'playground' },
  visualMatrix: { name: 'list-list', story: 'visual-matrix' },
  interactionTest: { name: 'list-list-tests-interaction', story: 'interaction-test' },
  selection: { name: 'list-list-examples-selection', story: 'selection' },
  search: { name: 'list-list-examples-search', story: 'search' },
  collapse: { name: 'list-list-examples-collapse', story: 'collapse' },
  submenu: { name: 'list-list-examples-submenu', story: 'submenu' },
  bulkSelect: { name: 'list-list-examples-bulkselect', story: 'bulk-select' },
  virtualized: { name: 'list-list-examples-virtualized', story: 'virtualized' },
  polymorphic: { name: 'list-list-examples-polymorphic', story: 'polymorphic' },
  reorderable: { name: 'list-reorderablelist', story: 'playground' },
  interactionStatesFixture: {
    name: 'list-list-tests-interactionstates',
    story: 'interaction-states-fixture',
  },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = LIST_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.list.root, ...props },
  };
}
