import type { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

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
