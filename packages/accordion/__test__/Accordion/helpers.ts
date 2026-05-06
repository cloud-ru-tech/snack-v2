import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const GROUP = 'accordion';
export const NAME = 'accordion';

export const STORIES = {
  playground: 'playground',
} as const;

export const COLLAPSE_BLOCK_TEST_ID = TEST_IDS.collapseBlock;
export const TITLE_TEST_ID = TEST_IDS.title;

export type StoryProps = Record<string, unknown>;

export function buildStoryOptions(props?: StoryProps, story: string = STORIES.playground): StorybookUrlOptions {
  return {
    name: NAME,
    group: GROUP,
    story,
    props,
  };
}
