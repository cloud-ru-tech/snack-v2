import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

// Story-level id слота `afterContent` живёт в stories: наполнение слота задаёт
// потребитель, поэтому в публичных TEST_IDS пакета его нет.
import { TEST_IDS } from '../../stories/Search/testIds';

export { TEST_IDS };

export const SEARCH_STORIES = {
  playground: { name: 'search', story: 'playground' },
  visualMatrix: { name: 'search', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = SEARCH_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}
