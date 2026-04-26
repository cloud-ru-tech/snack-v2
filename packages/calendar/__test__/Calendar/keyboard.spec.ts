import { expect, test } from '#playwright-tooling/fixtures';

import { CALENDAR_MODE, SIZE } from '../../src/constants';
import { buildCalendarOptions, TEST_IDS } from './helpers';

test.describe('Calendar — keyboard', () => {
  /** Фокус-менеджмент шапки и сетки (`period-level-*`, `item-*`). */
  test('Tab moves focus into header navigation', async ({ page, gotoStory }) => {
    await gotoStory(
      buildCalendarOptions({
        mode: CALENDAR_MODE.Date,
        size: SIZE.M,
        localeName: 'en-US',
      }),
    );

    const targetId = `period-level-${TEST_IDS.calendarPlayground}`;
    await expect
      .poll(async () => {
        for (let i = 0; i < 20; i++) {
          await page.keyboard.press('Tab');
          const id = await page.evaluate(() => document.activeElement?.getAttribute('data-test-id') ?? '');
          if (id === targetId) {
            return true;
          }
        }
        return false;
      })
      .toBe(true);
  });

  test('ArrowDown from period level moves focus to grid', async ({ page, gotoStory }) => {
    await gotoStory(
      buildCalendarOptions({
        mode: CALENDAR_MODE.Date,
        size: SIZE.M,
        localeName: 'en-US',
      }),
    );

    const targetId = `period-level-${TEST_IDS.calendarPlayground}`;
    await expect
      .poll(async () => {
        for (let i = 0; i < 20; i++) {
          await page.keyboard.press('Tab');
          const id = await page.evaluate(() => document.activeElement?.getAttribute('data-test-id') ?? '');
          if (id === targetId) {
            return true;
          }
        }
        return false;
      })
      .toBe(true);

    await page.keyboard.press('ArrowDown');
    const focusedId = await page.evaluate(() => document.activeElement?.getAttribute('data-test-id') ?? '');
    await expect(focusedId).toContain(`item-${TEST_IDS.calendarPlayground}`);
  });
});
