import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/SectionTitle/testIds';

export { TEST_IDS };

export const SECTION_TITLE_CATEGORY = 'site';
export const SECTION_TITLE_STORY_NAME = 'sectiontitle';

export const SECTION_TITLE_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = SECTION_TITLE_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: SECTION_TITLE_CATEGORY,
    name: SECTION_TITLE_STORY_NAME,
    story,
    props: { 'data-test-id': TEST_IDS.root, ...props },
  };
}
