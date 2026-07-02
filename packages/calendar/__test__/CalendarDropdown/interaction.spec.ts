import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { CALENDAR_MODE, SIZE } from '../../src/constants';
import { buildCalendarDropdownOptions, CALENDAR_DROPDOWN_STORIES, TEST_IDS } from './helpers';

const MOBILE_GLOBALS = { layoutType: 'mobile' };

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

test.describe('CalendarDropdown — mobile (bottom sheet)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
  });

  test('surface-swaps to bottom sheet with level-dropdown header', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildCalendarDropdownOptions({ mode: CALENDAR_MODE.Date }, CALENDAR_DROPDOWN_STORIES.playground, MOBILE_GLOBALS),
    );
    await getByTestId(TEST_IDS.calendarDropdownTrigger).click();

    await expect(getByTestId(TEST_IDS.calendarDropdown)).toBeVisible();
    await expect(getByTestId(TEST_IDS.calendarMobileHeaderLevel)).toBeVisible();
  });

  test('header dropdown moves the level up (month → year)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildCalendarDropdownOptions({ mode: CALENDAR_MODE.Date }, CALENDAR_DROPDOWN_STORIES.playground, MOBILE_GLOBALS),
    );
    await getByTestId(TEST_IDS.calendarDropdownTrigger).click();

    const level = getByTestId(TEST_IDS.calendarMobileHeaderLevel);
    const monthLabel = (await level.textContent())?.trim() ?? '';
    await level.click();
    // Подпись месяца (`Month YYYY`) сменяется подписью года (`YYYY`).
    await expect(level).not.toHaveText(monthLabel);
  });

  test('Current selects the current period (year mode) and enables Apply', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildCalendarDropdownOptions({ mode: CALENDAR_MODE.Year }, CALENDAR_DROPDOWN_STORIES.playground, MOBILE_GLOBALS),
    );
    await getByTestId(TEST_IDS.calendarDropdownTrigger).click();

    await getByTestId(TEST_IDS.calendarMobileCurrent).click();
    await expect(getByTestId(TEST_IDS.calendarMobileApply)).toBeEnabled();
  });

  test('date-time opens the time drum sub-screen', async ({ gotoStory, getByTestId }) => {
    await gotoStory(
      buildCalendarDropdownOptions(
        { mode: CALENDAR_MODE.DateTime },
        CALENDAR_DROPDOWN_STORIES.playground,
        MOBILE_GLOBALS,
      ),
    );
    await getByTestId(TEST_IDS.calendarDropdownTrigger).click();

    await getByTestId(TEST_IDS.calendarMobileTimeButton).click();
    await expect(getByTestId(TEST_IDS.timePickerDrum)).toBeVisible();
  });

  test('overlay click on the time sub-screen returns to calendar (not full close)', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(
      buildCalendarDropdownOptions(
        { mode: CALENDAR_MODE.DateTime },
        CALENDAR_DROPDOWN_STORIES.playground,
        MOBILE_GLOBALS,
      ),
    );
    await getByTestId(TEST_IDS.calendarDropdownTrigger).click();
    await getByTestId(TEST_IDS.calendarMobileTimeButton).click();
    await expect(getByTestId(TEST_IDS.timePickerDrum)).toBeVisible();

    // Под-экран времени — компактный sheet снизу; верх вьюпорта занимает затемнение. Клик по нему
    // = шаг назад на главный экран календаря, а НЕ полное закрытие: барабан скрывается, шапка-уровень
    // снова видна.
    await page.mouse.click(MOBILE_VIEWPORT.width / 2, 40);

    await expect(getByTestId(TEST_IDS.timePickerDrum)).toBeHidden();
    await expect(getByTestId(TEST_IDS.calendarMobileHeaderLevel)).toBeVisible();
  });
});
