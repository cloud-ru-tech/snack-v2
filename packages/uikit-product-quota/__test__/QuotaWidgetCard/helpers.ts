import { TEST_IDS } from '../../src/constants';
import { createBuildStoryOptions } from '../storybookHelpers';

export const QUOTA_WIDGET_CARD_TEST_ID = TEST_IDS.quotaWidgetCard.root;

export const QUOTA_WIDGET_CARD_CATEGORY = 'uikit-product';
export const QUOTA_WIDGET_CARD_GROUP = 'quota';
export const QUOTA_WIDGET_CARD_STORY_NAME = 'quotawidgetcard';

export const QUOTA_WIDGET_CARD_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  exhausted: 'exhausted',
  overuse: 'overuse',
} as const;

const buildStoryOptionsBase = createBuildStoryOptions({
  category: QUOTA_WIDGET_CARD_CATEGORY,
  group: QUOTA_WIDGET_CARD_GROUP,
  storyName: QUOTA_WIDGET_CARD_STORY_NAME,
  testId: QUOTA_WIDGET_CARD_TEST_ID,
});

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = QUOTA_WIDGET_CARD_STORIES.playground,
) {
  return buildStoryOptionsBase(props ?? {}, story);
}
