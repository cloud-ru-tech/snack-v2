import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TOAST_USER_ACTION_APPEARANCE } from '../../src/components/ToastUserAction/constants';
import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

const GROUP = 'toaster';
const STORY_NAME = 'toastuseraction';

export const USER_ACTION_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

export type UserActionStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: UserActionStoryProps,
  story: string = USER_ACTION_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: STORY_NAME,
    group: GROUP,
    story,
    props: {
      'data-test-id': TEST_IDS.userActionRoot,
      ...props,
    },
  };
}

// Ключевая выборка appearance — по 1 представителю каждого значения.
export const USER_ACTION_APPEARANCE_KEY_VALUES = [
  TOAST_USER_ACTION_APPEARANCE.Neutral,
  TOAST_USER_ACTION_APPEARANCE.Success,
  TOAST_USER_ACTION_APPEARANCE.Error,
] as const;
