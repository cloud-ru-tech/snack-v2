import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const COPY_BUTTON_CATEGORY = 'uikit-product';
export const COPY_BUTTON_GROUP_NAME = 'copy';
export const COPY_BUTTON_STORY_NAME = 'copybutton';

export const COPY_BUTTON_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

const COPY_BUTTON_TEST_STORIES: ReadonlySet<string> = new Set([COPY_BUTTON_STORIES.interactionTest]);

export type CopyButtonStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: CopyButtonStoryProps,
  story: string = COPY_BUTTON_STORIES.playground,
): StorybookUrlOptions {
  const isTest = COPY_BUTTON_TEST_STORIES.has(story);
  return {
    category: COPY_BUTTON_CATEGORY,
    group: COPY_BUTTON_GROUP_NAME,
    name: isTest ? `${COPY_BUTTON_STORY_NAME}-tests` : COPY_BUTTON_STORY_NAME,
    story,
    props: {
      'data-test-id': TEST_IDS.copyButton.root,
      ...props,
    },
  };
}

export const COPY_BUTTON_KEY_COMBOS = [
  { size: 's', label: '' },
  { size: 'm', label: 'Copy value' },
  { size: 'l', label: '' },
] as const;
