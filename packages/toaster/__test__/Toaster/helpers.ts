import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const TOASTER_CONTAINER_TEST_ID = TEST_IDS.toasterContainer;
export const TOASTER_BUTTON_CLOSE_ALL_TEST_ID = TEST_IDS.buttonCloseAll;
export const SYSTEM_EVENT_TEST_ID = TEST_IDS.systemEventRoot;
export const USER_ACTION_TEST_ID = TEST_IDS.userActionRoot;
export const UPLOAD_TEST_ID = TEST_IDS.uploadRoot;

const GROUP = 'toaster';
const STORY_NAME = 'toaster';

export const TOASTER_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  imperativeApi: 'imperative-api',
  interactionTest: 'interaction-test',
  composition: 'composition',
  // Legacy-алиасы под существующие e2e specs до их переписывания: stacking →
  // VisualMatrix, triggers → ImperativeApi, updateFlow → InteractionTest,
  // mobile → Composition. Триггеры/data-test-id'ы сохранены 1:1.
  stacking: 'visual-matrix',
  triggers: 'imperative-api',
  updateFlow: 'interaction-test',
  mobile: 'composition',
} as const;

export type ToasterStoryId = (typeof TOASTER_STORIES)[keyof typeof TOASTER_STORIES];

export function buildStoryOptions(
  story: ToasterStoryId = TOASTER_STORIES.playground,
  props?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: STORY_NAME,
    group: GROUP,
    story,
    props,
  };
}

// Stories-level test-id'ы (объявлены в stories/Toaster/testIds.ts и в самих story-файлах)
export const TRIGGER_SPAWN_TEST_ID = 'toaster-trigger-spawn';
export const TRIGGER_DISMISS_ALL_TEST_ID = 'toaster-trigger-dismiss-all';
export const TRIGGER_STACKING_DISMISS_ALL_TEST_ID = 'toaster-stacking-dismiss-all';
export const stackingSpawnTestId = (position: string) => `toaster-stacking-${position}-spawn`;
export const systemEventTriggerTestId = (appearance: string) => `toaster-trigger-system-event-${appearance}`;
export const userActionTriggerTestId = (appearance: string) => `toaster-trigger-user-action-${appearance}`;
export const uploadTriggerTestId = (status: string) => `toaster-trigger-upload-${status}`;
export const TRIGGER_UPDATE_SYSTEM_SUCCESS_TEST_ID = 'update-flow-system-success';
export const TRIGGER_UPDATE_USER_ACTION_TEST_ID = 'update-flow-user-action';
