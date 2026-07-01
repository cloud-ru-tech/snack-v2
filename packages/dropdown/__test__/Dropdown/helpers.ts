import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS as PUBLIC_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  root: PUBLIC_TEST_IDS.root,
  triggerOpen: PUBLIC_TEST_IDS.trigger,
} as const;

export const DROPDOWN_STORIES = {
  playground: { name: 'dropdown', story: 'playground' },
  visualMatrix: { name: 'dropdown', story: 'visual-matrix' },
  interactionTest: { name: 'dropdown-tests-interaction', story: 'interaction-test' },
} as const satisfies Record<string, StoryRef>;

export type DropdownStoryProps = Record<string, unknown>;

export function buildStoryOptions(
  props?: DropdownStoryProps,
  ref: StoryRef = DROPDOWN_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.root,
      ...props,
    },
    globals,
  };
}
