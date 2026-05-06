import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { segmentTestId, SIZE, TEST_IDS, WIDTH } from '../../src/constants';

export { segmentTestId };

export const SEGMENT_CONTROL_TEST_ID = TEST_IDS.root;

export const SEGMENT_CONTROL_STORY_NAME = 'segmentcontrol';

export const SEGMENT_CONTROL_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

export type SegmentControlStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: SegmentControlStoryProps,
  story: string = SEGMENT_CONTROL_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: SEGMENT_CONTROL_STORY_NAME,
    story,
    props: {
      'data-test-id': SEGMENT_CONTROL_TEST_ID,
      ...props,
    },
  };
}

export const KEY_SIZES = Object.values(SIZE);
export const KEY_WIDTHS = Object.values(WIDTH);

export const SEGMENT_CONTROL_INTERACTION_VISUAL_CASES: ReadonlyArray<{
  name: string;
  action: 'none' | 'hover' | 'focus' | 'pressed';
}> = [
  { name: 'default.png', action: 'none' },
  { name: 'hover.png', action: 'hover' },
  { name: 'focus.png', action: 'focus' },
  { name: 'pressed.png', action: 'pressed' },
];
