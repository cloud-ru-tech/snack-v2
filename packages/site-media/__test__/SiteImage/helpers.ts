import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';
export const STORIES = {
  playground: { name: 'siteimage', group: 'media', story: 'playground' },
  visualMatrix: { name: 'siteimage', group: 'media', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;
export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = STORIES.playground,
): StorybookUrlOptions {
  return { category: 'site', ...ref, props };
}
