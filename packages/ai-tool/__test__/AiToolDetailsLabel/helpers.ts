import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.detailsLabel,
  copy: COMPONENT_TEST_IDS.detailsLabelCopy,
} as const;

export const AI_TOOL_DETAILS_LABEL_STORIES = {
  playground: { name: 'aitool-atoms-aitooldetailslabel', story: 'playground' },
  visualMatrix: { name: 'aitool-atoms-aitooldetailslabel', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = AI_TOOL_DETAILS_LABEL_STORIES.playground,
): StorybookUrlOptions {
  return {
    ...ref,
    category: 'ai',
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
  };
}
