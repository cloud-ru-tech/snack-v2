import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

/** aria-label кнопки-триггера, выставляется через triggerLabel (дефолт `Подсказка`). */
export const QUESTION_TOOLTIP_TRIGGER_LABEL = 'Подсказка';

/** Story-рефы QuestionTooltip. Title `Components/Tooltip/QuestionTooltip`. */
export const QUESTION_TOOLTIP_STORIES = {
  playground: { name: 'tooltip-questiontooltip', story: 'playground' },
  visualMatrix: { name: 'tooltip-questiontooltip', story: 'visual-matrix' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = QUESTION_TOOLTIP_STORIES.playground,
  // Адаптивная раскладка задаётся тулбар-глобалом `layoutType` (не args) — форсим её через URL-globals.
  globals?: Record<string, unknown>,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    // `data-test-id` через URL-args НЕ задаём: QuestionTooltip сам ставит id
    // на кнопку-триггер (`TEST_IDS.questionTooltip.triggerOpen` через src), а
    // контент — на `<span data-test-id={questionTooltip.content}>` внутри tip.
    props,
    globals,
  };
}

/**
 * Ключевая выборка комбинаций пропсов для проверки propagation.
 * По одному представителю на каждое значение `size` × ключевые значения `placement`.
 */
export const QUESTION_TOOLTIP_KEY_COMBOS = [
  { size: 'xs', placement: 'top' },
  { size: 's', placement: 'right' },
] as const;
