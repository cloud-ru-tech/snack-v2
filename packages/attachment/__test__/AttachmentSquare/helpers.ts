import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { SIZE } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const ATTACHMENT_SQUARE_STORIES = {
  playground: { name: 'attachmentsquare', group: 'attachment', story: 'playground' },
  visualMatrix: { name: 'attachmentsquare', group: 'attachment', story: 'visual-matrix' },
  interactionTest: {
    name: 'attachmentsquare-tests-interaction',
    group: 'attachment',
    story: 'interaction-test',
  },
} as const satisfies Record<string, StoryRef>;

export const ATTACHMENT_SQUARE_KEY_COMBOS = [
  { size: SIZE.S, state: { checked: true } as const },
  { size: SIZE.M, state: { disabled: true } as const },
] as const;

export type AttachmentSquareStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: AttachmentSquareStoryProps,
  ref: StoryRef = ATTACHMENT_SQUARE_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.attachmentSquare.root,
      ...props,
    },
  };
}
