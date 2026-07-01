import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS, WIDGET_STATE } from '../../src/constants';

export { TEST_IDS };

export const WIDGET_TEST_ID = TEST_IDS.root;

const WIDGET_CATEGORY = 'uikit-product';

export const WIDGET_STORIES = {
  playground: { name: 'widget', story: 'playground' },
  visualMatrix: { name: 'widget', story: 'visual-matrix' },
  defaultContent: { name: 'widget-examples-defaultcontent', story: 'default-content' },
  withActions: { name: 'widget-examples-withactions', story: 'with-actions' },
  interactionTest: { name: 'widget-tests-interaction', story: 'interaction-test' },
  actionVariants: { name: 'widget-examples-actionvariants', story: 'action-variants' },
} as const satisfies Record<string, StoryRef>;

// Ключевая выборка: по одному представителю на значение каждой оси (state × wide × layoutType).
// Полный sweep — задача VisualMatrix snapshot.
export const WIDGET_KEY_COMBOS = [
  { state: WIDGET_STATE.Default, wide: false, layoutType: 'desktop' },
  { state: WIDGET_STATE.Loading, wide: true, layoutType: 'desktop' },
  { state: WIDGET_STATE.Error, wide: false, layoutType: 'desktop' },
  { state: WIDGET_STATE.Default, wide: true, layoutType: 'mobile' },
] as const;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = WIDGET_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    category: WIDGET_CATEGORY,
    name: ref.name,
    group: ref.group,
    story: ref.story,
    props: { 'data-test-id': WIDGET_TEST_ID, ...props },
    globals,
  };
}
