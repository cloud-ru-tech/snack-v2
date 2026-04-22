import { StorybookUrlOptions } from '../../../../playwright/utils';

export const INFO_ROW_TEST_ID = 'info-row';

/** Storybook id: `components-uikitproductinforow-inforow--…` (title `Components/UikitProductInfoRow/InfoRow`) */
export const INFO_ROW_GROUP = 'uikitproductinforow';
export const INFO_ROW_STORY_NAME = 'inforow';

export const INFO_ROW_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildInfoRowStoryOptions(
  props?: Record<string, unknown>,
  story: string = INFO_ROW_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: INFO_ROW_STORY_NAME,
    group: INFO_ROW_GROUP,
    story,
    props: {
      'data-test-id': INFO_ROW_TEST_ID,
      ...props,
    },
  };
}
