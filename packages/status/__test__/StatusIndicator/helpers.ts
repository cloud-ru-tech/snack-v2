import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const STATUS_INDICATOR_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type StatusIndicatorStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: StatusIndicatorStoryProps,
  story: string = STATUS_INDICATOR_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: 'statusindicator',
    group: 'status',
    story,
    props: {
      'data-test-id': TEST_IDS.statusIndicator.root,
      ...props,
    },
  };
}
