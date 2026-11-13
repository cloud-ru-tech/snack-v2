import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

export { TEST_IDS } from '../../src/constants';
export const STORIES = {
  playground: { name: 'sitevideo', group: 'media', story: 'playground' },
  visualMatrix: { name: 'sitevideo', group: 'media', story: 'visual-matrix' },
  custom: { name: 'customplayer', group: 'media-sitevideo-examples', story: 'custom-player' },
} as const satisfies Record<string, StoryRef>;
export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = STORIES.playground,
): StorybookUrlOptions {
  return { category: 'site', ...ref, props };
}
