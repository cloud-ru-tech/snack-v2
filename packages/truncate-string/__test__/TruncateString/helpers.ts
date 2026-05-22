import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS, VARIANT } from '../../src/constants';

export { TEST_IDS };

export const TRUNCATE_STRING_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type TruncateStringStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: TruncateStringStoryProps,
  story: string = TRUNCATE_STRING_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: 'truncatestring',
    story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

export const KEY_VARIANTS = [VARIANT.End, VARIANT.Middle] as const;
