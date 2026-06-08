import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.root,
  title: COMPONENT_TEST_IDS.title,
  content: COMPONENT_TEST_IDS.content,
  disabled: `${COMPONENT_TEST_IDS.root}-disabled`,
} as const;

export const AI_CARD_STORIES = {
  playground: { name: 'aicard', story: 'playground' },
  visualMatrix: { name: 'aicard', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export type AiCardStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: AiCardStoryProps,
  ref: StoryRef = AI_CARD_STORIES.playground,
): StorybookUrlOptions {
  return {
    ...ref,
    category: 'ai',
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}
