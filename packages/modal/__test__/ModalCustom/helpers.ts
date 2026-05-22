import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const MODAL_CUSTOM_TEST_ID = TEST_IDS.modalCustom.root;
export const MODAL_CUSTOM_TRIGGER_TEST_ID = TEST_IDS.modalCustom.triggerOpen;

export const MODAL_CUSTOM_STORIES = {
  playground: 'playground',
} as const;

export type ModalCustomStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: ModalCustomStoryProps,
  story: string = MODAL_CUSTOM_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: 'modalcustom',
    group: 'modal',
    story,
    props,
  };
}
