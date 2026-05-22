import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const COPY_LINE_CATEGORY = 'uikit-product';
export const COPY_LINE_GROUP_NAME = 'copy';
export const COPY_LINE_STORY_NAME = 'copyline';

export const COPY_LINE_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

const COPY_LINE_TEST_STORIES: ReadonlySet<string> = new Set([COPY_LINE_STORIES.interactionTest]);

export type CopyLineStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: CopyLineStoryProps,
  story: string = COPY_LINE_STORIES.playground,
): StorybookUrlOptions {
  const isTest = COPY_LINE_TEST_STORIES.has(story);
  return {
    category: COPY_LINE_CATEGORY,
    group: COPY_LINE_GROUP_NAME,
    name: isTest ? `${COPY_LINE_STORY_NAME}-tests` : COPY_LINE_STORY_NAME,
    story,
    props: {
      'data-test-id': TEST_IDS.copyLine.root,
      ...props,
    },
  };
}

export const COPY_LINE_KEY_COMBOS = [{ copyButtonHideStrategy: 'never' }, { copyButtonHideStrategy: 'hover' }] as const;
