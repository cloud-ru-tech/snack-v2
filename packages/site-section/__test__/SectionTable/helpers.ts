import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS as SECTION_TEST_IDS } from '../../stories/Section/testIds';

export const TEST_IDS = SECTION_TEST_IDS;

export const SECTION_TABLE_CATEGORY = 'site';
export const SECTION_TABLE_STORY_NAME = 'sectiontable';

export const SECTION_TABLE_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = SECTION_TABLE_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: SECTION_TABLE_CATEGORY,
    name: SECTION_TABLE_STORY_NAME,
    group: 'section',
    story,
    props: { 'data-test-id': TEST_IDS.root, ...props },
    globals: { brand: 'siteGreen' },
  };
}
