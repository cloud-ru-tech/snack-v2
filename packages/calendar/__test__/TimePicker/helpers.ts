import type { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

/** Сегмент URL: `components-calendar-<TIME_PICKER_NAME>--<story>`. */
export const TIME_PICKER_GROUP = 'calendar';

export const TIME_PICKER_NAME = 'time-picker';

export const TIME_PICKER_STORIES = {
  playground: 'playground',
} as const;

/**
 * `data-test-id` ячеек колонок времени: на каждой ячейке `TimeList` дублируется id списка (см. `TimeList`).
 * Используйте `.nth(i)` для клика по конкретному часу/минуте.
 */
export const TIME_PICKER_LIST_TEST_IDS = {
  hours: `hours-${TEST_IDS.timePickerPlayground}`,
  minutes: `minutes-${TEST_IDS.timePickerPlayground}`,
  seconds: `seconds-${TEST_IDS.timePickerPlayground}`,
} as const;

/**
 * URL iframe для сторис TimePicker.
 *
 * @param props аргументы Playground (`valueHours`, `size`, …)
 * @param story имя экспорта (по умолчанию `playground`)
 */
export function buildTimePickerOptions(
  props?: Record<string, unknown>,
  story: string = TIME_PICKER_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: TIME_PICKER_NAME,
    group: TIME_PICKER_GROUP,
    story,
    props,
  };
}

export { TEST_IDS };
