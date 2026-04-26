import { expect, test } from '#playwright-tooling/fixtures';

import { CALENDAR_MODE, SIZE } from '../../src/constants';
import { buildCalendarOptions, CALENDAR_STORIES, TEST_IDS } from './helpers';

test.describe('Calendar — rendering', () => {
  /** Монтирование Playground и Visual Matrix; атрибуты корня `calendar-playground`. */
  test.describe('render', () => {
    test(`story ${CALENDAR_STORIES.playground} renders root`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildCalendarOptions(undefined, CALENDAR_STORIES.playground));
      await expect(getByTestId(TEST_IDS.calendarPlayground)).toBeVisible();
    });

    test(`story ${CALENDAR_STORIES.visualMatrix} renders matrix calendars`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildCalendarOptions(undefined, CALENDAR_STORIES.visualMatrix));
      await expect(getByTestId('calendar-matrix-date-s')).toBeVisible();
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
    for (const size of Object.values(SIZE)) {
      test(`data-size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildCalendarOptions({ mode: CALENDAR_MODE.Date, size }));
        await expect(getByTestId(TEST_IDS.calendarPlayground)).toHaveAttribute('data-size', size);
      });
    }

    for (const mode of Object.values(CALENDAR_MODE)) {
      test(`data-mode=${mode}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildCalendarOptions({ mode, size: SIZE.M }));
        await expect(getByTestId(TEST_IDS.calendarPlayground)).toHaveAttribute('data-mode', mode);
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
