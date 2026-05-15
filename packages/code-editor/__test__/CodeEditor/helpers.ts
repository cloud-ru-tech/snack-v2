import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export const CODE_EDITOR_TEST_ID = TEST_IDS.root;
export const CODE_EDITOR_HEADER_TEST_ID = TEST_IDS.header;
export const CODE_EDITOR_LANGUAGE_TEST_ID = TEST_IDS.language;
export const CODE_EDITOR_COPY_BUTTON_TEST_ID = TEST_IDS.copyButton;
export const CODE_EDITOR_LOADING_TEST_ID = TEST_IDS.loading;

export const CODE_EDITOR_STORY_NAME = 'codeeditor';

export const CODE_EDITOR_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
  interactionTest: 'interaction-test',
} as const;

export type CodeEditorStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: CodeEditorStoryProps,
  story: string = CODE_EDITOR_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: CODE_EDITOR_STORY_NAME,
    story,
    props: {
      'data-test-id': CODE_EDITOR_TEST_ID,
      ...props,
    },
  };
}
