import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

const PRICE_SUMMARY_CATEGORY = 'uikit-product';
const PRICE_SUMMARY_GROUP = 'pricesummary';

type UikitStoryRef = StoryRef & { category: string };

export const PRICE_SUMMARY_STORIES = {
  playground: {
    category: PRICE_SUMMARY_CATEGORY,
    group: PRICE_SUMMARY_GROUP,
    name: 'pricesummary',
    story: 'playground',
  },
  visualMatrix: {
    category: PRICE_SUMMARY_CATEGORY,
    group: PRICE_SUMMARY_GROUP,
    name: 'pricesummary',
    story: 'visual-matrix',
  },
  withPeriodOptions: {
    category: PRICE_SUMMARY_CATEGORY,
    group: PRICE_SUMMARY_GROUP,
    name: 'pricesummary-examples-withperiodoptions',
    story: 'with-period-options',
  },
  interactionTest: {
    category: PRICE_SUMMARY_CATEGORY,
    group: PRICE_SUMMARY_GROUP,
    name: 'pricesummary-tests-interaction',
    story: 'interaction-test',
  },
} as const satisfies Record<string, UikitStoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: UikitStoryRef = PRICE_SUMMARY_STORIES.playground,
): StorybookUrlOptions {
  return {
    category: ref.category,
    group: ref.group,
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.priceSummary,
      ...props,
    },
  };
}
