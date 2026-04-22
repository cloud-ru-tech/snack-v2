import { StorybookUrlOptions } from '../../../../playwright/utils';

export const INFO_GROUP_TEST_ID = 'info-group';

/** Storybook id: `components-uikitproductinforow-infogroup--…` */
export const INFO_GROUP_GROUP = 'uikitproductinforow';
export const INFO_GROUP_STORY_NAME = 'infogroup';

export const INFO_GROUP_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

export function buildInfoGroupStoryOptions(
  props?: Record<string, unknown>,
  story: string = INFO_GROUP_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: INFO_GROUP_STORY_NAME,
    group: INFO_GROUP_GROUP,
    story,
    props: {
      'data-test-id': INFO_GROUP_TEST_ID,
      ...props,
    },
  };
}
