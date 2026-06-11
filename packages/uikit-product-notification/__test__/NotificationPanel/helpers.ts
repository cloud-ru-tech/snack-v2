import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

const CATEGORY = 'uikit-product';
const GROUP = 'notification';
const NAME = 'notificationpanel';
const TESTS_NAME = `${NAME}-tests-interaction`;

export const STORIES = {
  playground: { name: NAME, group: GROUP, story: 'playground' },
  visualMatrix: { name: NAME, group: GROUP, story: 'visual-matrix' },
  interactionTest: { name: TESTS_NAME, group: GROUP, story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = STORIES.playground,
): StorybookUrlOptions {
  return {
    category: CATEGORY,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: { 'data-test-id': TEST_IDS.panel.root, ...props },
  };
}
