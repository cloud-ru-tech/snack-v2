import { StorybookUrlOptions } from '#playwright-tooling/utils';

import { TEST_IDS } from '../../src/constants';

/** Сегмент URL: `components-calendar-<CALENDAR_DROPDOWN_NAME>--<story>`. Синхронизировать с `title` в `CalendarDropdown.Playground.stories.tsx`. */
export const CALENDAR_DROPDOWN_GROUP = 'calendar';

export const CALENDAR_DROPDOWN_NAME = 'calendar-dropdown';

export const CALENDAR_DROPDOWN_STORIES = {
  playground: 'playground',
  visualMatrix: 'visual-matrix',
} as const;

/**
 * URL iframe для сторис CalendarDropdown.
 *
 * @param props аргументы сторис (`CalendarDropdown` + вложенный `Calendar`)
 * @param story имя экспорта (по умолчанию `playground`)
 */
export function buildCalendarDropdownOptions(
  props?: Record<string, unknown>,
  story: string = CALENDAR_DROPDOWN_STORIES.playground,
): StorybookUrlOptions {
  return {
    name: CALENDAR_DROPDOWN_NAME,
    group: CALENDAR_DROPDOWN_GROUP,
    story,
    props,
  };
}

export { TEST_IDS };
