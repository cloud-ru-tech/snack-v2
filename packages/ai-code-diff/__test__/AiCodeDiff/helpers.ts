import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils'

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants'

export const TEST_IDS = {
  root: COMPONENT_TEST_IDS.root,
  added: COMPONENT_TEST_IDS.added,
  separator: COMPONENT_TEST_IDS.separator,
  removed: COMPONENT_TEST_IDS.removed,
} as const

export const AI_CODE_DIFF_TEST_ID = TEST_IDS.root

export const AI_CODE_DIFF_STORIES = {
  playground: { name: 'aicodediff', story: 'playground' },
  visualMatrix: { name: 'aicodediff', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = AI_CODE_DIFF_STORIES.playground,
): StorybookUrlOptions {
  return {
    ...ref,
    category: 'ai',
    props: { 'data-test-id': AI_CODE_DIFF_TEST_ID, ...props },
  }
}
