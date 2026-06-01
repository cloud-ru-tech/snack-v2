import { StorybookUrlOptions } from '#playwright-tooling/utils';

// Story-scoped TEST_IDS (component-анатомия + id'ы сценария available+tooltip).
import { TEST_IDS } from '../../stories/ConfigSelector/testIds';

export { TEST_IDS };

export const CONFIG_SELECTOR_TEST_ID = TEST_IDS.root;

export const CONFIG_SELECTOR_CATEGORY = 'uikit-product';
export const CONFIG_SELECTOR_STORY_NAME = 'configselector';

export const CONFIG_SELECTOR_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

const CONFIG_SELECTOR_TEST_STORIES: ReadonlySet<string> = new Set([CONFIG_SELECTOR_STORIES.interactionTest]);

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = CONFIG_SELECTOR_STORIES.playground,
): StorybookUrlOptions {
  const isTest = CONFIG_SELECTOR_TEST_STORIES.has(story);

  // Title `Uikit Product/ConfigSelector/Tests/Interaction` → id `…-configselector-tests-interaction--interaction-test`.
  return {
    name: isTest ? `${CONFIG_SELECTOR_STORY_NAME}-tests-interaction` : CONFIG_SELECTOR_STORY_NAME,
    category: CONFIG_SELECTOR_CATEGORY,
    story,
    props: {
      'data-test-id': CONFIG_SELECTOR_TEST_ID,
      ...props,
    },
  };
}
