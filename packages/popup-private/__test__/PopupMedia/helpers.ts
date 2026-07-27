import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const POPUP_MEDIA_STORIES = {
  playground: { name: 'popupmedia', group: 'popupprivate', story: 'playground' },
  visualMatrix: { name: 'popupmedia', group: 'popupprivate', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = POPUP_MEDIA_STORIES.playground,
): StorybookUrlOptions {
  return { name: ref.name, group: ref.group, story: ref.story, props };
}
