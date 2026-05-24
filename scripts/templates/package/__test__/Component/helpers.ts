import { StorybookUrlOptions } from '#playwright-tooling/utils'

import { TEST_IDS } from '../../stories/{{COMPONENT_NAME}}/testIds'

export const {{COMPONENT_CONST}}_TEST_ID = TEST_IDS.root

type StoryRef = { name: string; story: string; group?: string }

export const {{COMPONENT_CONST}}_STORIES = {
  playground: { name: '{{COMPONENT_KEBAB}}', story: 'playground' },
  visualMatrix: { name: '{{COMPONENT_KEBAB}}', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = {{COMPONENT_CONST}}_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': {{COMPONENT_CONST}}_TEST_ID, ...props },
  }
}
