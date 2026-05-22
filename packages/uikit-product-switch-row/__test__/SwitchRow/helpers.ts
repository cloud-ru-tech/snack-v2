import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const SWITCH_ROW_CATEGORY = 'uikit-product';
export const SWITCH_ROW_STORY_NAME = 'switchrow';

export const SWITCH_ROW_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

const SWITCH_ROW_TEST_STORIES: ReadonlySet<string> = new Set([SWITCH_ROW_STORIES.interactionTest]);

export type SwitchRowStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: SwitchRowStoryProps,
  story: string = SWITCH_ROW_STORIES.playground,
): StorybookUrlOptions {
  const isTest = SWITCH_ROW_TEST_STORIES.has(story);
  return {
    name: isTest ? `${SWITCH_ROW_STORY_NAME}-tests` : SWITCH_ROW_STORY_NAME,
    category: SWITCH_ROW_CATEGORY,
    story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}
