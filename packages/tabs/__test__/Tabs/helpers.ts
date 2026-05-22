import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/Tabs/testIds';

export { TEST_IDS };

/** Story-рефы пакета Tabs. Title `Components/Tabs/Tabs[/Tests/<Scenario>]` kebab-cased. */
export const TABS_STORIES = {
  playground: { name: 'tabs-tabs', story: 'playground' },
  visualMatrix: { name: 'tabs-tabs', story: 'visual-matrix' },
  interactionTest: { name: 'tabs-tabs-tests-interaction', story: 'interaction-test' },
  controlled: { name: 'tabs-tabs-tests-controlled', story: 'controlled' },
  disabledTab: { name: 'tabs-tabs-tests-disabledtab', story: 'disabled-tab' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = TABS_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.tabs.root, ...props },
  };
}
