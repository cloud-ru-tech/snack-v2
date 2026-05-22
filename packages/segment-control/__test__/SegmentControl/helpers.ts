import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { segmentTestId, SIZE, TEST_IDS, WIDTH } from '../../src/constants';

export { TEST_IDS, segmentTestId };

export const SEGMENT_CONTROL_STORIES = {
  playground: { name: 'segmentcontrol', story: 'playground' },
  visualMatrix: { name: 'segmentcontrol', story: 'visual-matrix' },
  interactionTest: { name: 'segmentcontrol-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export type SegmentControlStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: SegmentControlStoryProps,
  ref: StoryRef = SEGMENT_CONTROL_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

export const SEGMENT_CONTROL_KEY_COMBOS = [
  { size: SIZE.S, width: WIDTH.Auto },
  { size: SIZE.M, width: WIDTH.Auto },
  { size: SIZE.L, width: WIDTH.Full },
] as const;
