import { expect, test } from '#playwright-tooling/fixtures';

import { CALENDAR_MODE } from '../../src/constants';
import { buildCalendarOptions, TEST_IDS } from './helpers';
import { getCalendarTextSnapshot } from './snapshotUtils';

/**
 * Поведенческие проверки по мотивам migration/calendar/__test__ (не «подгонка» под баги).
 * Явная таймзона — стабильные даты в снимках и holder.
 */
test.describe('Calendar — behavior (migration parity)', () => {
  test.use({ timezoneId: 'UTC' });

  test('keyboard: Tab → ArrowDown → Enter выбирает первую доступную дату при for-tests (1–13 off)', async ({
    page,
    gotoStory,
  }) => {
    await gotoStory(
      buildCalendarOptions({
        mode: CALENDAR_MODE.Date,
        localeName: 'en-US',
        dateToday: 1697371200000,
        modeBuildCellProps: 'for-tests',
        dateValue: null,
        dateDefaultValue: undefined,
      }),
    );

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');

    const snap = await getCalendarTextSnapshot(page, TEST_IDS.calendarPlayground);
    expect(snap.periodLevelName).toBe('October 2023');
    expect(snap.items).toContain('[14]');

    await expect(page.getByTestId(TEST_IDS.calendarValueHolder)).not.toHaveText('');
  });

  test('клик по отключённой ячейке (force) не меняет выбор', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(
      buildCalendarOptions({
        mode: CALENDAR_MODE.Date,
        localeName: 'en-US',
        dateToday: 1697371200000,
        modeBuildCellProps: 'for-tests',
        dateValue: null,
      }),
    );

    const before = await getCalendarTextSnapshot(page, TEST_IDS.calendarPlayground);

    await getByTestId(`item-${TEST_IDS.calendarPlayground}`).nth(7).click({ force: true });

    const after = await getCalendarTextSnapshot(page, TEST_IDS.calendarPlayground);
    expect(after).toEqual(before);
  });

  test('ru locale: заголовок недели и период (Май 2023)', async ({ page, gotoStory }) => {
    await gotoStory(
      buildCalendarOptions({
        mode: CALENDAR_MODE.Date,
        localeName: 'ru-RU',
        dateToday: 1684141200000,
        dateValue: null,
      }),
    );

    const snap = await getCalendarTextSnapshot(page, TEST_IDS.calendarPlayground);
    expect(snap.periodLevelName).toBe('Май 2023');
    expect(snap.header).toBe('Пн,Вт,Ср,Чт,Пт,Сб,Вс');
  });

  test('режим date: пресеты периода не показываются даже при showPeriodPresets в args', async ({ gotoStory, page }) => {
    await gotoStory(
      buildCalendarOptions({
        mode: CALENDAR_MODE.Date,
        dateToday: 1684141200000,
        dateValue: null,
        showPeriodPresets: true,
      }),
    );

    await expect(page.locator(`[data-test-id="presets-${TEST_IDS.calendarPlayground}"]`)).toHaveCount(0);
  });
});
