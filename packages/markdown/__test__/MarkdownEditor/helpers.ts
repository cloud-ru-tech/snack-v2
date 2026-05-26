import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS, toolbarButtonTestId } from '../../stories/testIds';

export { TEST_IDS, toolbarButtonTestId };

export const MARKDOWN_EDITOR_STORIES = {
  playground: { name: 'markdowneditor', group: 'markdown', story: 'playground' },
  visualMatrix: { name: 'markdowneditor', group: 'markdown', story: 'visual-matrix' },
  interactionTest: {
    name: 'markdowneditor-tests-interaction',
    group: 'markdown',
    story: 'interaction-test',
  },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = MARKDOWN_EDITOR_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.editor,
      ...props,
    },
  };
}
