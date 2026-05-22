import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

export { TEST_IDS } from '../../src/constants';

export const COLLAPSE_BLOCK_TERTIARY_STORIES = {
  playground: { name: 'collapseblocktertiary', group: 'accordion', story: 'playground' },
  visualMatrix: { name: 'collapseblocktertiary', group: 'accordion', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export const PLAYGROUND_DEFAULT_ARGS = { showAfterTitleSlot: false } as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = COLLAPSE_BLOCK_TERTIARY_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { ...PLAYGROUND_DEFAULT_ARGS, ...props },
  };
}
