import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

/** Сегмент URL: `components-calendar-<TIME_PICKER_NAME>--<story>`. */
export const TIME_PICKER_GROUP = 'calendar';

export const TIME_PICKER_NAME = 'time-picker';

export const TIME_PICKER_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

/**
 * `data-test-id` ячеек колонок времени: каждая ячейка — `<column>-<rootTestId>-<index>` (см. `TimeList`).
 * Колоночный id (`hours-<root>`) на DOM не существует — есть только индексированные item'ы.
 * Используйте `itemId(column, index)` для конкретной ячейки.
 */
export const TIME_PICKER_LIST_TEST_IDS = {
  hours: (index: number) => `hours-${TEST_IDS.timePickerPlayground}-${index}`,
  minutes: (index: number) => `minutes-${TEST_IDS.timePickerPlayground}-${index}`,
  seconds: (index: number) => `seconds-${TEST_IDS.timePickerPlayground}-${index}`,
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
