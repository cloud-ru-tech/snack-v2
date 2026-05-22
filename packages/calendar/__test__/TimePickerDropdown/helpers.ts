import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

/** Группа сторибука (`category` в URL задаётся в `getStorybookUrl`, по умолчанию `components`). */
export const TIME_PICKER_DROPDOWN_GROUP = 'calendar';

/** Сегмент id сторис: `components-calendar-<name>--<story>`. Синхронизировать с `title` в `TimePickerDropdown.Playground.stories.tsx`. */
export const TIME_PICKER_DROPDOWN_NAME = 'time-picker-dropdown';

export const TIME_PICKER_DROPDOWN_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

/**
 * `data-test-id` ячеек колонок времени внутри панели: `<column>-<rootTestId>-<index>` (см. `TimeList`).
 * Колоночный id (`hours-<root>`) на DOM не присутствует — только индексированные item'ы.
 */
export const TIME_PICKER_DROPDOWN_LIST_TEST_IDS = {
  hours: (index: number) => `hours-${TEST_IDS.timePickerDropdown}-${index}`,
  minutes: (index: number) => `minutes-${TEST_IDS.timePickerDropdown}-${index}`,
  seconds: (index: number) => `seconds-${TEST_IDS.timePickerDropdown}-${index}`,
} as const;

/**
 * URL iframe для сторис Time Picker Dropdown.
 *
 * @param props аргументы сторис (`args`), попадают в query `args=`
 * @param story имя экспорта сторис (по умолчанию `playground`)
 */
export function buildTimePickerDropdownOptions(
  props?: Record<string, unknown>,
  story: string = TIME_PICKER_DROPDOWN_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: TIME_PICKER_DROPDOWN_NAME,
    group: TIME_PICKER_DROPDOWN_GROUP,
    story,
    props,
  };
}

export { TEST_IDS };
