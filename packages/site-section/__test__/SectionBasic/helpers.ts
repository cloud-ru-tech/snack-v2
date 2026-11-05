import { StorybookUrlOptions } from '#playwright-tooling/utils';

// Leaf-файл констант соседнего пакета: без SCSS-модулей, playwright-compile его переносит.
import { TEST_IDS as SECTION_TITLE_TEST_IDS } from '../../../site-section-title/src/constants';
import { TEST_IDS as SECTION_TEST_IDS } from '../../stories/SectionBasic/testIds';

export const TEST_IDS = {
  ...SECTION_TEST_IDS,
  title: SECTION_TITLE_TEST_IDS.title,
  description: SECTION_TITLE_TEST_IDS.description,
} as const;

export const SECTION_BASIC_CATEGORY = 'site';
export const SECTION_BASIC_STORY_NAME = 'sectionbasic';

export const SECTION_BASIC_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = SECTION_BASIC_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: SECTION_BASIC_CATEGORY,
    name: SECTION_BASIC_STORY_NAME,
    story,
    props: { 'data-test-id': TEST_IDS.root, ...props },
  };
}
