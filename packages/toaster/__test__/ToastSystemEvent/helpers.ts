import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TOAST_SYSTEM_EVENT_APPEARANCE } from '../../src/components/ToastSystemEvent/constants';
import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

const GROUP = 'toaster';
const STORY_NAME = 'toastsystemevent';

export const SYSTEM_EVENT_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

export type SystemEventStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: SystemEventStoryProps,
  story: string = SYSTEM_EVENT_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: STORY_NAME,
    group: GROUP,
    story,
    props: {
      'data-test-id': TEST_IDS.systemEventRoot,
      ...props,
    },
  };
}

// Ключевая выборка appearance — по 1 представителю каждого значения.
export const SYSTEM_EVENT_APPEARANCE_KEY_VALUES = [
  TOAST_SYSTEM_EVENT_APPEARANCE.Neutral,
  TOAST_SYSTEM_EVENT_APPEARANCE.Success,
  TOAST_SYSTEM_EVENT_APPEARANCE.ErrorCritical,
] as const;
