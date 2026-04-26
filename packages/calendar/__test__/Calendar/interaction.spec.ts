import { expect, test } from '#playwright-tooling/fixtures';

import { CALENDAR_MODE, SIZE } from '../../src/constants';
import { buildCalendarOptions, TEST_IDS } from './helpers';

test.describe('Calendar — interaction', () => {
  /** Навигация по периоду и выбор даты на сетке `CalendarBase`. */
  test('click period next updates calendar view', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(
      buildCalendarOptions({
        mode: CALENDAR_MODE.Date,
        size: SIZE.M,
        localeName: 'en-US',
      }),
    );

    const periodNameBefore = await getByTestId(`period-level-${TEST_IDS.calendarPlayground}`).textContent();
    await getByTestId(`period-next-${TEST_IDS.calendarPlayground}`).click();
    const periodNameAfter = await getByTestId(`period-level-${TEST_IDS.calendarPlayground}`).textContent();

    await expect(periodNameBefore).toBeTruthy();
    await expect(periodNameAfter).not.toEqual(periodNameBefore);
    await expect(page.getByTestId(TEST_IDS.calendarPlayground)).toBeVisible();
  });

  test('click selectable day updates value holder', async ({ gotoStory, page }) => {
    await gotoStory(
      buildCalendarOptions({
        mode: CALENDAR_MODE.Date,
        size: SIZE.M,
        localeName: 'en-US',
      }),
    );

    const holder = page.getByTestId(TEST_IDS.calendarValueHolder);
    const before = await holder.textContent();

    await page
      .locator(`[data-test-id="item-${TEST_IDS.calendarPlayground}"]:not([data-disabled]):not([data-another])`)
      .nth(4)
      .click();

    const after = await holder.textContent();
    await expect(after).not.toEqual(before);
  });
});
