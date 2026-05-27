import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { SIZE } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const ATTACHMENT_STORIES = {
  playground: { name: 'attachment', group: 'attachment', story: 'playground' },
  visualMatrix: { name: 'attachment', group: 'attachment', story: 'visual-matrix' },
  interactionTest: {
    name: 'attachment-tests-interaction',
    group: 'attachment',
    story: 'interaction-test',
  },
} as const satisfies Record<string, StoryRef>;

export const ATTACHMENT_KEY_COMBOS = [
  { size: SIZE.S, state: { disabled: true } as const },
  { size: SIZE.M, state: { loading: true } as const },
] as const;

export type AttachmentStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: AttachmentStoryProps,
  ref: StoryRef = ATTACHMENT_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.attachment.root,
      ...props,
    },
  };
}
