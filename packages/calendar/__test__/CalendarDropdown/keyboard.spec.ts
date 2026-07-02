import { expect, test } from '#playwright-tooling/fixtures';

import { CALENDAR_MODE, SIZE } from '../../src/constants';
import { buildCalendarDropdownOptions, TEST_IDS } from './helpers';

// Playwright WebKit (mobile-ios) не симулирует hardware-клавиатуру: `page.keyboard.press(...)`
// не дотягивает до DOM-listener'ов. На реальном iOS клавиатуры тоже обычно нет.
const HAS_HW_KEYBOARD = (projectName: string) => projectName !== 'mobile-ios';

test.describe('CalendarDropdown — keyboard', () => {
  test.beforeEach(() => {
    test.skip(!HAS_HW_KEYBOARD(test.info().project.name), 'no hw keyboard on mobile-ios emulation');
  });

  /** Триггер — кнопка вне панели; Tab должен сфокусировать её до открытия. */
  test('Tab moves focus to trigger from page', async ({ page, gotoStory }) => {
    await gotoStory(buildCalendarDropdownOptions({ mode: CALENDAR_MODE.Date, size: SIZE.M }));

    await expect
      .poll(async () => {
        for (let i = 0; i < 20; i++) {
          await page.keyboard.press('Tab');
          const focusedInsideTrigger = await page.evaluate((testId: string) => {
            const host = document.querySelector(`[data-test-id="${testId}"]`);
            const el = document.activeElement;
            return Boolean(host && el && (host === el || host.contains(el)));
          }, TEST_IDS.calendarDropdownTrigger);
          if (focusedInsideTrigger) {
            return true;
          }
        }
        return false;
      })
      .toBe(true);
  });
});
