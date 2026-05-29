import { TEST_IDS } from '../../src/constants';
import { createBuildStoryOptions } from '../storybookHelpers';

export const QUOTA_WIDGET_MINI_TEST_ID = TEST_IDS.quotaWidgetMini.root;

export const QUOTA_WIDGET_MINI_CATEGORY = 'uikit-product';
export const QUOTA_WIDGET_MINI_GROUP = 'quota';
export const QUOTA_WIDGET_MINI_STORY_NAME = 'quotawidgetmini';

export const QUOTA_WIDGET_MINI_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

const buildStoryOptionsBase = createBuildStoryOptions({
  category: QUOTA_WIDGET_MINI_CATEGORY,
  group: QUOTA_WIDGET_MINI_GROUP,
  storyName: QUOTA_WIDGET_MINI_STORY_NAME,
  testId: QUOTA_WIDGET_MINI_TEST_ID,
});

export function buildStoryOptions(
  props?: Record<string, unknown>,
  story: string = QUOTA_WIDGET_MINI_STORIES.playground,
) {
  return buildStoryOptionsBase(props ?? {}, story);
}
