import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/TabsSegmented/testIds';

export { TEST_IDS };

export const TABS_SEGMENTED_CATEGORY = 'site';
export const TABS_SEGMENTED_STORY_NAME = 'tabssegmented';

export const TABS_SEGMENTED_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export const itemTestId = (value: string) => `${TEST_IDS.itemPrefix}-${value}`;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = TABS_SEGMENTED_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: TABS_SEGMENTED_CATEGORY,
    name: TABS_SEGMENTED_STORY_NAME,
    story,
    props: { 'data-test-id': TEST_IDS.root, ...props },
  };
}
