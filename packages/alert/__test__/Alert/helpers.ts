import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { ALIGN, APPEARANCE, APPEARANCE_TO_THEME_COLOR, SIZE, TEST_IDS } from '../../src/constants';

export { TEST_IDS, APPEARANCE_TO_THEME_COLOR };

export const ALERT_STORIES = {
  playground: { name: 'alert', group: 'alert', story: 'playground' },
  visualMatrix: { name: 'alert', group: 'alert', story: 'visual-matrix' },
  withActions: { name: 'alert-tests-withactions', group: 'alert', story: 'with-actions' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = ALERT_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: {
      'data-test-id': TEST_IDS.alert.root,
      ...props,
    },
    globals,
  };
}

export const KEY_COMBOS = [
  { size: SIZE.S, align: ALIGN.Vertical, appearance: APPEARANCE.Neutral },
  { size: SIZE.M, align: ALIGN.Horizontal, appearance: APPEARANCE.Error },
  { size: SIZE.M, align: ALIGN.Vertical, appearance: APPEARANCE.Success },
] as const;

export const KEY_APPEARANCES = Object.values(APPEARANCE);
