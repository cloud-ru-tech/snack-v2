import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const BUTTON_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type ButtonStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: ButtonStoryProps,
  story: string = BUTTON_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: 'button',
    group: 'button',
    story,
    props: {
      'data-test-id': TEST_IDS.button.root,
      ...props,
    },
  };
}
