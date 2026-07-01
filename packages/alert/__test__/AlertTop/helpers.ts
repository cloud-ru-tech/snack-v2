import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { APPEARANCE, TEST_IDS } from '../../src/constants';

export { TEST_IDS };

export const ALERT_TOP_STORIES = {
  playground: { name: 'alerttop', group: 'alert', story: 'playground' },
  visualMatrix: { name: 'alerttop', group: 'alert', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = ALERT_TOP_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.alertTop.root,
      ...props,
    },
    globals,
  };
}

export const KEY_APPEARANCES = Object.values(APPEARANCE);
