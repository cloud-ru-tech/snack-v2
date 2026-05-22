import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { SIZE, VARIANT, WEIGHT } from '../../src/constants';
import { TEST_IDS } from '../../stories/Typography/testIds';

export { TEST_IDS };

export const TYPOGRAPHY_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export type TypographyStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: TypographyStoryProps,
  story: string = TYPOGRAPHY_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: 'typography',
    story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}

export const KEY_COMBOS = [
  { variant: VARIANT.display, size: SIZE.l, weight: WEIGHT.regular },
  { variant: VARIANT.headline, size: SIZE.m, weight: WEIGHT.thin },
  { variant: VARIANT.title, size: SIZE.s, weight: WEIGHT.mono },
  { variant: VARIANT.label, size: SIZE.m, weight: WEIGHT.regular },
  { variant: VARIANT.body, size: SIZE.s, weight: WEIGHT.regular },
] as const;
