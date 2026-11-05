import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/RichText/testIds';

export { TEST_IDS };

export const RICH_TEXT_CATEGORY = 'site';
export const RICH_TEXT_STORY_NAME = 'richtext';

export const RICH_TEXT_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = RICH_TEXT_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: RICH_TEXT_CATEGORY,
    name: RICH_TEXT_STORY_NAME,
    story,
    props: { 'data-test-id': TEST_IDS.root, ...props },
  };
}
