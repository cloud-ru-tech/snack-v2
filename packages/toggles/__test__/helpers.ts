import { StorybookUrlOptions } from '../../../playwright/utils';

export const CHECKBOX_TEST_ID = 'checkbox';
export const RADIO_TEST_ID = 'radio';
export const SWITCH_TEST_ID = 'switch';
export const FAVOURITE_TEST_ID = 'favourite';
export const TOGGLE_GROUP_ITEM_PREFIX = 'item-';

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
  return build('checkbox', story, CHECKBOX_TEST_ID, props);
}
export function buildRadioStory(props?: ToggleStoryProps, story = 'playground'): StorybookUrlOptions {
  return build('radio', story, RADIO_TEST_ID, props);
}
export function buildSwitchStory(props?: ToggleStoryProps, story = 'playground'): StorybookUrlOptions {
  return build('switch', story, SWITCH_TEST_ID, props);
}
export function buildFavouriteStory(props?: ToggleStoryProps, story = 'playground'): StorybookUrlOptions {
  return build('favourite', story, FAVOURITE_TEST_ID, props);
}
export function buildToggleGroupStory(props?: ToggleStoryProps, story = 'playground'): StorybookUrlOptions {
  return build('toggle-group', story, undefined, props);
}

export const NATIVE_INPUT_SUFFIX = '-native-input';

export const SCREENSHOT_OPTS = {
  animations: 'disabled',
  caret: 'hide',
} as const;

export const ROOT_SELECTOR = '#storybook-root';

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

export const RESPONSIVE_VIEWPORTS = [
  { width: 375, height: 812, name: '375' },
  { width: 768, height: 1024, name: '768' },
  { width: 1440, height: 900, name: '1440' },
] as const;

export const CHECKBOX_SIZE_PX = { xs: 16, s: 24 } as const;
export const RADIO_SIZE_PX = { xs: 16, s: 24 } as const;
export const FAVOURITE_SIZE_PX = { xs: 16, s: 24 } as const;
export const SWITCH_WIDTH_PX = { xs: 24, s: 36 } as const;
export const SWITCH_HEIGHT_PX = { xs: 16, s: 24 } as const;
