import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

/** Builder для VisualMatrix-ячеек Calendar (соответствует data-test-id из VisualMatrix story). */
export const getCalendarMatrixCellTestId = (mode: 'date' | 'date-range' | 'date-time', size: string): string =>
  `calendar-matrix-${mode}-${size}`;

/** Builder для кнопки перехода периода (next) внутри корня calendar root. */
export const getPeriodNextTestId = (rootTestId: string): string => `period-next-${rootTestId}`;

/** Сегмент URL: `components-calendar-<CALENDAR_NAME>--<story>`. */
export const CALENDAR_GROUP = 'calendar';

/** Имя сторис (`Calendar.Playground` / `Calendar.VisualMatrix`). */
export const CALENDAR_NAME = 'calendar';

export const CALENDAR_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

/**
 * URL iframe для сторис Calendar.
 *
 * @param props аргументы сторис → query `args=`
 * @param story имя экспорта (по умолчанию `playground`)
 */
export function buildCalendarOptions(
  props?: Record<string, unknown>,
  story: string = CALENDAR_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: CALENDAR_NAME,
    group: CALENDAR_GROUP,
    story,
    props,
  };
}

export { TEST_IDS };
