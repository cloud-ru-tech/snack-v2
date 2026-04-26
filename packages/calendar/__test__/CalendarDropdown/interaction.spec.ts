import { expect, test } from '#playwright-tooling/fixtures';

import { CALENDAR_MODE, SIZE } from '../../src/constants';
import { buildCalendarDropdownOptions, TEST_IDS } from './helpers';

test.describe('CalendarDropdown — interaction', () => {
  /** Панель: `Calendar` внутри `content-calendar-dropdown`. */
  test('click trigger opens calendar panel', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildCalendarDropdownOptions({ mode: CALENDAR_MODE.Date, size: SIZE.M }));
    await getByTestId(TEST_IDS.calendarDropdownTrigger).click();
    await expect(getByTestId(TEST_IDS.calendarDropdownContent)).toBeVisible();
  });

  test('Escape closes panel', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildCalendarDropdownOptions({ mode: CALENDAR_MODE.Date, size: SIZE.M }));
    await getByTestId(TEST_IDS.calendarDropdownTrigger).click();
    await expect(getByTestId(TEST_IDS.calendarDropdownContent)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.calendarDropdownContent)).toBeHidden();
  });
});
