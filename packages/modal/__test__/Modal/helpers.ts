import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { MODE, WIDTH } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

// Alias для main-root слотa Modal — большинство e2e ассертит именно по нему.
export const MAIN_TEST_ID = TEST_IDS.modal.root;
export const MODAL_TRIGGER_TEST_ID = TEST_IDS.modal.triggerOpen;

// Ключевая выборка для props propagation: один представитель на каждое
// значение оси (mode × width). VisualMatrix покрывает декартово произведение.
export const KEY_COMBOS = [
  { mode: MODE.Regular, width: WIDTH.S },
  { mode: MODE.Aggressive, width: WIDTH.M },
  { mode: MODE.Forced, width: WIDTH.L },
] as const;

export const MODAL_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type ModalStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: ModalStoryProps,
  story: string = MODAL_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: 'modal',
    group: 'modal',
    story,
    props: {
      'data-test-id': TEST_IDS.modal.root,
      ...props,
    },
  };
}
