import { StorybookUrlOptions, StoryRef } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

export { TEST_IDS };

// Корень открытой палитры адресуется через FieldColor-owned id: `@ds/color-picker` тегирует свой
// корень только переданным data-test-id (root рендерит `{...extractSupportProps(rest)}`), а
// FieldColor пробрасывает в <ColorPicker> `TEST_IDS.fieldColorPicker`. Это и есть стабильный селектор.
export const COLOR_PICKER_ROOT_TEST_ID = TEST_IDS.fieldColorPicker;
// Внутренние слоты ColorPicker'а несут собственные id из его TEST_IDS — локальные копии, т.к.
// кросс-пакетный импорт тянет CSS-модули и ломает playwright-compile (синхронизируй при изменении).
export const COLOR_PICKER_SEGMENTS_TEST_ID = 'color-picker__segments';
export const COLOR_PICKER_FIELD_ALPHA_TEST_ID = 'color-picker__field-alpha';

export const FIELD_COLOR_STORIES = {
  playground: { name: 'fields-fieldcolor', story: 'playground' },
  visualMatrix: { name: 'fields-fieldcolor', story: 'visual-matrix' },
  interactionTest: { name: 'fields-fieldcolor-tests-interaction', story: 'interaction-test' },
  open: { name: 'fields-fieldcolor-tests-open', story: 'open' },
} as const satisfies Record<string, StoryRef>;

// Trigger-based field (trigger-based §4): не инжектим `data-test-id` через URL-args,
// чтобы он не перетёр story-default'ы и не попал на portal-узел ColorPicker.
// Playground сам ставит `data-test-id={TEST_IDS.fieldColor}` на триггер.
export function buildStoryOptions(
  props?: Record<string, unknown>,
  ref: StoryRef = FIELD_COLOR_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: ref.name,
    story: ref.story,
    props: { ...props },
  };
}
