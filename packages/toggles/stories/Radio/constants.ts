import { SIZE } from '../../src/constants';
import type { ToggleProps } from '../../src/types';

/** Пресеты сценариев по форме пропсов Radio (RadioProps = ToggleProps). */
type RadioProps = ToggleProps;

/** Строковые значения для URL/автотестов (boolean из query в Storybook часто ломается). */
export const RADIO_STORIES_SCENARIO = {
  Playground: 'playground',
  Unchecked: 'unchecked',
  Checked: 'checked',
  DefaultChecked: 'default-checked',
  Disabled: 'disabled',
  DisabledUnchecked: 'disabled-unchecked',
  Loading: 'loading',
  SizeXs: 'size-xs',
  SizeS: 'size-s',
  NameValue: 'name-value',
  CustomClass: 'custom-class',
} as const;

export type RadioStoriesScenario = (typeof RADIO_STORIES_SCENARIO)[keyof typeof RADIO_STORIES_SCENARIO];

export const SCENARIO_PRESETS: Record<RadioStoriesScenario, Partial<RadioProps>> = {
  [RADIO_STORIES_SCENARIO.Playground]: {},
  [RADIO_STORIES_SCENARIO.Unchecked]: {},
  [RADIO_STORIES_SCENARIO.Checked]: { checked: true, onChange: () => {} },
  [RADIO_STORIES_SCENARIO.DefaultChecked]: { defaultChecked: true },
  [RADIO_STORIES_SCENARIO.Disabled]: { disabled: true },
  [RADIO_STORIES_SCENARIO.DisabledUnchecked]: {
    checked: false,
    disabled: true,
    onChange: () => {},
  },
  [RADIO_STORIES_SCENARIO.Loading]: { loading: true },
  [RADIO_STORIES_SCENARIO.SizeXs]: { size: SIZE.XS },
  [RADIO_STORIES_SCENARIO.SizeS]: { size: SIZE.S },
  [RADIO_STORIES_SCENARIO.NameValue]: { name: 'radio-group', value: 'option-a' },
  [RADIO_STORIES_SCENARIO.CustomClass]: { className: 'custom-radio-class' },
};
