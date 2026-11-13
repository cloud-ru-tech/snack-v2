import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS as STORY_TEST_IDS } from '../../stories/SectionAccordion/testIds';

export const TEST_IDS = STORY_TEST_IDS;

export const SECTION_ACCORDION_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = SECTION_ACCORDION_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: 'site',
    name: 'sectionaccordion',
    story,
    props: { 'data-test-id': TEST_IDS.root, ...props },
  };
}
