import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS as SLOT_TEST_IDS } from '../../src/constants';
import { TEST_IDS } from '../../stories/testIds';

export { SLOT_TEST_IDS, TEST_IDS };

export const FIELD_DECORATOR_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = FIELD_DECORATOR_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: 'fielddecorator',
    group: 'fielddecorator',
    story,
    props: {
      'data-test-id': TEST_IDS.fieldDecorator.root,
      ...props,
    },
  };
}
