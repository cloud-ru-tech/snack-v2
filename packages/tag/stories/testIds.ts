import { TEST_IDS as SRC_TEST_IDS } from '../src/constants';

/**
 * Единый объект `data-test-id` для stories и e2e. Объединяет внутренние слоты
 * компонента (из `src/constants::TEST_IDS`) и story-level id'шники
 * конкретных тегов в example-сценариях.
 */
export const TEST_IDS = {
  tag: {
    root: 'tag',
    /** id'шники конкретных тегов в example-сценариях (AsLink, Removable). */
    docs: 'tag-docs',
    frontend: 'tag-frontend',
    removableNeutral: 'tag-removable-neutral',
    removablePrimary: 'tag-removable-primary',
    removeButton: SRC_TEST_IDS.tag.removeButton,
  },
  tagRow: {
    root: 'tag-row',
    moreButton: SRC_TEST_IDS.tagRow.moreButton,
    visibleTagsWrapper: SRC_TEST_IDS.tagRow.visibleTagsWrapper,
    droplistTagsWrapper: SRC_TEST_IDS.tagRow.droplistTagsWrapper,
  },
} as const;
