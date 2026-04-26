import type { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

/** Группа сторибука (`category` в URL задаётся в `getStorybookUrl`, по умолчанию `components`). */
export const TIME_PICKER_DROPDOWN_GROUP = 'calendar';

/** Сегмент id сторис: `components-calendar-<name>--<story>`. Синхронизировать с `title` в `TimePickerDropdown.Playground.stories.tsx`. */
export const TIME_PICKER_DROPDOWN_NAME = 'time-picker-dropdown';

export const TIME_PICKER_DROPDOWN_STORIES = {
  playground: 'playground',
} as const;

/**
 * `data-test-id` колонок времени внутри панели при дефолтном `data-test-id=\"time-picker-dropdown\"` на `TimePickerDropdown`
 * (как в Playground: `getTestId('hours')` → `hours-${testId}`).
 * У каждой ячейки `TimeList` тот же id, что у списка — для `expect(...).toBeVisible()` используйте `.first()` / `.nth(i)`.
 */
export const TIME_PICKER_DROPDOWN_LIST_TEST_IDS = {
  hours: `hours-${TEST_IDS.timePickerDropdown}`,
  minutes: `minutes-${TEST_IDS.timePickerDropdown}`,
  seconds: `seconds-${TEST_IDS.timePickerDropdown}`,
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
