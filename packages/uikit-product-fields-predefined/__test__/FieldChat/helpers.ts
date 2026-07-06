import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

const CATEGORY = 'uikit-product';
const GROUP = 'fieldspredefined';

export const FIELD_CHAT_STORIES = {
  playground: { name: 'fieldchat', story: 'playground' },
  visualMatrix: { name: 'fieldchat', story: 'visual-matrix' },
  interactionTest: { name: 'fieldchat-tests-interaction', story: 'interaction-test' },
  withAttachments: { name: 'fieldchat-examples-withattachments', story: 'with-attachments' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_CHAT_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: CATEGORY,
    group: GROUP,
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.fieldChat,
      ...props,
    },
  };
}
