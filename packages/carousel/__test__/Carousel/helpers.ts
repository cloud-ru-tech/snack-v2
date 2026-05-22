import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const CAROUSEL_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = CAROUSEL_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: 'carousel',
    story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}
