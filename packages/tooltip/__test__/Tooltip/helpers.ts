import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

/** Story-рефы пакета Tooltip. Title `Components/Tooltip/Tooltip[/Tests/<Scenario>]`. */
export const TOOLTIP_STORIES = {
  playground: { name: 'tooltip-tooltip', story: 'playground' },
  visualMatrix: { name: 'tooltip-tooltip', story: 'visual-matrix' },
  interactionTest: { name: 'tooltip-tooltip-tests-interaction', story: 'interaction-test' },
  longTextDefault: { name: 'tooltip-tooltip-tests-longtext', story: 'long-text-default' },
  longTextNoMaxWidth: { name: 'tooltip-tooltip-tests-longtext', story: 'long-text-no-max-width' },
  stackedHover: { name: 'tooltip-tooltip-tests-stackedhover', story: 'stacked-hover' },
  noMaxWidthShort: { name: 'tooltip-tooltip-tests-longtext', story: 'no-max-width-short' },
} as const satisfies Record<string, StoryRef>;

export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = TOOLTIP_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    group: ref.group,
    story: ref.story,
    // `data-test-id` через URL-args НЕ задаём: триггер-кнопка получает свой id
    // напрямую в render (`TEST_IDS.tooltip.triggerOpen`), а контент тултипа —
    // на `<span data-test-id={tooltip.content}>` внутри tip. Если выставить
    // здесь — он применится к самому компоненту Tooltip через extractSupportProps
    // и осядет на floating div с тем же id, что у триггера → strict-mode коллизия.
    props,
  };
}

/**
 * Ключевая выборка комбинаций пропсов для проверки propagation.
 * Не декартово произведение — по одному представителю на каждое значение `placement`.
 */
export const TOOLTIP_KEY_COMBOS = [{ placement: 'top' }, { placement: 'right' }] as const;
