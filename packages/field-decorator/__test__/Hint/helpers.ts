import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS as SLOT_TEST_IDS } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';

export { SLOT_TEST_IDS, TEST_IDS };

export const HINT_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export const HINT_VALIDATION_STATES = ['default', 'error', 'warning', 'success', 'valid'] as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = HINT_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: 'hint',
    group: 'fielddecorator',
    story,
    props: {
      'data-test-id': TEST_IDS.hint.root,
      ...props,
    },
  };
}
