import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/testIds';

export const BUTTON_COMBO_TEST_ID = TEST_IDS.root;

// Держать в синхроне со stories/…/tests/…InteractionTest.
export const BUTTON_COMBO_ITEM_TEST_IDS = {
  create: 'button-combo-item-create',
  duplicate: 'button-combo-item-duplicate',
} as const;

type StoryRef = { name: string; story: string; group?: string };

export const BUTTON_COMBO_STORIES = {
  playground: { name: 'buttoncombo', story: 'playground' },
  visualMatrix: { name: 'buttoncombo', story: 'visual-matrix' },
  interactionTest: { name: 'buttoncombo-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = BUTTON_COMBO_STORIES.playground,
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': BUTTON_COMBO_TEST_ID, ...props },
    globals,
  };
}
