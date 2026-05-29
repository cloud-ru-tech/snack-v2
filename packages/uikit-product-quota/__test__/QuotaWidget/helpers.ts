import { TEST_IDS } from '../../src/constants';
import { createBuildStoryOptions } from '../storybookHelpers';

export const QUOTA_WIDGET_TEST_ID = TEST_IDS.quotaWidget.root;

export const QUOTA_WIDGET_CATEGORY = 'uikit-product';
export const QUOTA_WIDGET_GROUP = 'quota';
export const QUOTA_WIDGET_STORY_NAME = 'quotawidget';

export const QUOTA_WIDGET_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

const buildStoryOptionsBase = createBuildStoryOptions({
  category: QUOTA_WIDGET_CATEGORY,
  group: QUOTA_WIDGET_GROUP,
  storyName: QUOTA_WIDGET_STORY_NAME,
  testId: QUOTA_WIDGET_TEST_ID,
});

export function buildStoryOptions(props?: Record<string, unknown>, story: string = QUOTA_WIDGET_STORIES.playground) {
  return buildStoryOptionsBase(props ?? {}, story);
}
