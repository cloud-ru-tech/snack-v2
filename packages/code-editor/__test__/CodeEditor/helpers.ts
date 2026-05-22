import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const CODE_EDITOR_STORIES = {
  playground: { name: 'codeeditor', story: 'playground' },
  visualMatrix: { name: 'codeeditor', story: 'visual-matrix' },
  interactionTest: { name: 'codeeditor-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export type CodeEditorStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: CodeEditorStoryProps,
  ref: StoryRef = CODE_EDITOR_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}
