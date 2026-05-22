import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const STATUS_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type StatusStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: StatusStoryProps,
  story: string = STATUS_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: 'status',
    group: 'status',
    story,
    props: {
      'data-test-id': TEST_IDS.status.root,
      label: 'Label text',
      ...props,
    },
  };
}
