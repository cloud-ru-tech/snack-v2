import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';
import { STORY_TEST_IDS } from '../../stories/TitleClickable/testIds';

export { TEST_IDS, STORY_TEST_IDS };

export const TITLE_CLICKABLE_CATEGORY = 'uikit-product';
export const TITLE_CLICKABLE_STORY_NAME = 'titleclickable';

export const TITLE_CLICKABLE_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

const TITLE_CLICKABLE_TEST_STORIES: ReadonlySet<string> = new Set([TITLE_CLICKABLE_STORIES.interactionTest]);

export type TitleClickableStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: TitleClickableStoryProps,
  story: string = TITLE_CLICKABLE_STORIES.playground,
): StorybookUrlOptions {
  const isTest = TITLE_CLICKABLE_TEST_STORIES.has(story);
  return {
    category: TITLE_CLICKABLE_CATEGORY,
    name: isTest ? `${TITLE_CLICKABLE_STORY_NAME}-tests` : TITLE_CLICKABLE_STORY_NAME,
    story,
    props: {
      title: 'Title',
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}
