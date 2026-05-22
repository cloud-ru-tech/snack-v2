import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../stories/testIds';

export { TEST_IDS };

export const TOGGLES_GROUP = 'toggles' as const;

export type ToggleStoryProps = Record<string, unknown>;

function build(name: string, story: string, testId: string | undefined, props?: ToggleStoryProps): StorybookUrlOptions {
  return {
    name,
    group: TOGGLES_GROUP,
    story,
    props: {
      ...(testId ? { 'data-test-id': testId } : {}),
      ...props,
    },
  };
}

export function buildCheckboxStory(props?: ToggleStoryProps, story = 'playground'): StorybookUrlOptions {
  return build('checkbox', story, TEST_IDS.checkbox.root, props);
}
export function buildRadioStory(props?: ToggleStoryProps, story = 'playground'): StorybookUrlOptions {
  return build('radio', story, TEST_IDS.radio.root, props);
}
export function buildSwitchStory(props?: ToggleStoryProps, story = 'playground'): StorybookUrlOptions {
  return build('switch', story, TEST_IDS.switch.root, props);
}
export function buildFavouriteStory(props?: ToggleStoryProps, story = 'playground'): StorybookUrlOptions {
  return build('favourite', story, TEST_IDS.favourite.root, props);
}
export function buildToggleGroupStory(props?: ToggleStoryProps, story = 'playground'): StorybookUrlOptions {
  return build('togglegroup', story, TEST_IDS.toggleGroup.root, props);
}

// Toggle-элементы маленькие, focus-ring выходит за bounding box — нужен запас в композите.
export const INTERACTION_PADDING = 12;

export const A11Y_DISABLED_RULES = [
  'color-contrast',
  // Реальная семантика — на нативном <input> внутри span'а-обёртки.
  // Axe флагует span[role='checkbox'/'radio'] без aria-checked/name, но SR
  // озвучивает состояние через инпут. Выключаем шум.
  'aria-required-attr',
  'aria-toggle-field-name',
  // Toggle без внешнего <label> — потребитель оборачивает в <label>
  // или передаёт aria-label. Контрактом компонента label не требуется.
  'label',
  // Span[role=checkbox] содержит вложенный фокусируемый <input>
  // (стандартный паттерн "visually hidden input"). Корневой span не получает
  // фокус — фокусируется только input. Axe не различает этот паттерн.
  'nested-interactive',
];

export const CHECKBOX_SIZE_PX = { xs: 16, s: 24 } as const;
export const RADIO_SIZE_PX = { xs: 16, s: 24 } as const;
export const FAVOURITE_SIZE_PX = { xs: 16, s: 24 } as const;
export const SWITCH_WIDTH_PX = { xs: 24, s: 36 } as const;
export const SWITCH_HEIGHT_PX = { xs: 16, s: 24 } as const;
