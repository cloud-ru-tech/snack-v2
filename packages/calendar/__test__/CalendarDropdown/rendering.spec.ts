import { expect, test } from '#playwright-tooling/fixtures';

import { CALENDAR_MODE, SIZE } from '../../src/constants';
import { buildCalendarDropdownOptions, CALENDAR_DROPDOWN_STORIES, TEST_IDS } from './helpers';

test.describe('CalendarDropdown — rendering', () => {
  /** Триггер, открытая панель и прокидывание пропов во вложенный `Calendar`. */
  test.describe('render', () => {
    for (const story of Object.values(CALENDAR_DROPDOWN_STORIES)) {
      test(`story ${story} renders trigger`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildCalendarDropdownOptions(undefined, story));
        await expect(getByTestId(TEST_IDS.calendarDropdownTrigger)).toBeVisible();
      });
    }
  });

  test.describe('states', () => {
    test('dropdown shell has test id when panel is open', async ({ gotoStory, getByTestId, page }) => {
      await gotoStory(buildCalendarDropdownOptions({ mode: CALENDAR_MODE.Date, size: SIZE.M }));
      await getByTestId(TEST_IDS.calendarDropdownTrigger).click();
      await expect(page.locator(`[data-test-id="${TEST_IDS.calendarDropdown}"]`)).toBeVisible();
    });

    test('date-time: showSeconds=false на корне календаря внутри панели', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildCalendarDropdownOptions({
          mode: CALENDAR_MODE.DateTime,
          showSeconds: false,
          size: SIZE.M,
        }),
      );
      await getByTestId(TEST_IDS.calendarDropdownTrigger).click();
      const calendarRoot = getByTestId(TEST_IDS.calendarDropdownContent).locator('[data-mode]').first();
      await expect(calendarRoot).toHaveAttribute('data-mode', CALENDAR_MODE.DateTime);
      await expect(calendarRoot).toHaveAttribute('data-show-seconds', 'false');
    });
  });

  test.describe('props propagation', () => {
    test('opened calendar inherits mode and size', async ({ gotoStory, getByTestId }) => {
      await gotoStory(
        buildCalendarDropdownOptions({
          mode: CALENDAR_MODE.DateRange,
          size: SIZE.L,
        }),
      );
      await getByTestId(TEST_IDS.calendarDropdownTrigger).click();
      await expect(getByTestId(TEST_IDS.calendarDropdownContent)).toBeVisible();

      const calendarRoot = getByTestId(TEST_IDS.calendarDropdownContent).locator('[data-mode]').first();
      await expect(calendarRoot).toHaveAttribute('data-mode', CALENDAR_MODE.DateRange);
      await expect(calendarRoot).toHaveAttribute('data-size', SIZE.L);
    });

    for (const size of Object.values(SIZE)) {
      test(`opened panel: календарь наследует data-size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildCalendarDropdownOptions({ mode: CALENDAR_MODE.Date, size }));
        await getByTestId(TEST_IDS.calendarDropdownTrigger).click();
        await expect(getByTestId(TEST_IDS.calendarDropdownContent)).toBeVisible();

        const calendarRoot = getByTestId(TEST_IDS.calendarDropdownContent).locator('[data-mode]').first();
        await expect(calendarRoot).toHaveAttribute('data-size', size);
      });
    }
  });
});
