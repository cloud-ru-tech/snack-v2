import { expect, test } from '#playwright-tooling/fixtures';

import { CALENDAR_MODE, SIZE } from '../../src/constants';
import { buildCalendarOptions, CALENDAR_STORIES, getCalendarMatrixCellTestId, TEST_IDS } from './helpers';

/** Ключевая выборка: по 1 представителю на каждое значение `size` и `mode` без декартова произведения. */
const KEY_COMBOS = [
  { size: SIZE.S, mode: CALENDAR_MODE.Date },
  { size: SIZE.M, mode: CALENDAR_MODE.DateRange },
  { size: SIZE.L, mode: CALENDAR_MODE.DateTime },
  { size: SIZE.M, mode: CALENDAR_MODE.Month },
  { size: SIZE.M, mode: CALENDAR_MODE.MonthRange },
  { size: SIZE.M, mode: CALENDAR_MODE.Year },
  { size: SIZE.M, mode: CALENDAR_MODE.YearRange },
] as const;

test.describe('Calendar — rendering', () => {
  /** Монтирование Playground и Visual Matrix; атрибуты корня `calendar-playground`. */
  test.describe('render', () => {
    test(`story ${CALENDAR_STORIES.playground} renders root`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildCalendarOptions(undefined, CALENDAR_STORIES.playground));
      await expect(getByTestId(TEST_IDS.calendarPlayground)).toBeVisible();
    });

    test(`story ${CALENDAR_STORIES.visualMatrix} renders matrix calendars`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildCalendarOptions(undefined, CALENDAR_STORIES.visualMatrix));
      await expect(getByTestId(getCalendarMatrixCellTestId('date', SIZE.S))).toBeVisible();
    });
  });

  test.describe('states', () => {
    test('showHolidays highlights weekends when enabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildCalendarOptions({ mode: CALENDAR_MODE.Date, showHolidays: true, size: SIZE.M }));
      await expect(getByTestId(TEST_IDS.calendarPlayground)).toHaveAttribute('data-show-holidays', 'true');
    });

    test('fitToContainer=false removes stretch attribute', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildCalendarOptions({ mode: CALENDAR_MODE.Date, fitToContainer: false, size: SIZE.M }));
      await expect(getByTestId(TEST_IDS.calendarPlayground)).not.toHaveAttribute('data-fit-to-container');
    });

    test('date-time showSeconds=false', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildCalendarOptions({
          mode: CALENDAR_MODE.DateTime,
          showSeconds: false,
          size: SIZE.M,
        }),
      );
      await expect(getByTestId(TEST_IDS.calendarPlayground)).toHaveAttribute('data-show-seconds', 'false');
    });
  });

  test.describe('props propagation', () => {
    for (const { size, mode } of KEY_COMBOS) {
      test(`size=${size} + mode=${mode}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildCalendarOptions({ mode, size }));
        const root = getByTestId(TEST_IDS.calendarPlayground);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-mode', mode);
      });
    }

    test('date-time showSeconds=true', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildCalendarOptions({
          mode: CALENDAR_MODE.DateTime,
          showSeconds: true,
          size: SIZE.M,
        }),
      );
      await expect(getByTestId(TEST_IDS.calendarPlayground)).toHaveAttribute('data-show-seconds', 'true');
    });
  });
});
