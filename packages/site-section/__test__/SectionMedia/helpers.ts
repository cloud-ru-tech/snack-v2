import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

export { TEST_IDS } from '../../stories/SectionMedia/testIds';
export const STORIES = {
  playground: { name: 'sectionmedia', group: 'section', story: 'playground' },
  visualMatrix: { name: 'sectionmedia', group: 'section', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;
export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = STORIES.playground,
): StorybookUrlOptions {
  return { category: 'site', ...ref, props };
}
