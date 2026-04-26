import { StorybookUrlOptions } from '../../../../playwright/utils';
import { TEST_IDS } from '../../src/constants';

export const GROUP = 'accordion';
export const NAME = 'collapseblocksecondary';

export const STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export const COLLAPSE_BLOCK_TEST_ID = TEST_IDS.collapseBlock;
export const TITLE_TEST_ID = TEST_IDS.title;
export const CONTENT_TEST_ID = TEST_IDS.content;

export const ROOT_SELECTOR = '#storybook-root';

export const SCREENSHOT_OPTS = {
  animations: 'disabled',
  caret: 'hide',
} as const;

export type StoryProps = Record<string, unknown>;

export function buildStoryOptions(props?: StoryProps, story: string = STORIES.playground): StorybookUrlOptions {
  return {
    name: NAME,
    group: GROUP,
    story,
    props: {
      showAfterTitleSlot: false,
      ...props,
    },
  };
}
