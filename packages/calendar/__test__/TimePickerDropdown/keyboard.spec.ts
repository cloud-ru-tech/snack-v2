import { expect, test } from '#playwright-tooling/fixtures';

import { SIZE } from '../../src/constants';
import { buildTimePickerDropdownOptions, TEST_IDS } from './helpers';

test.describe('TimePickerDropdown — keyboard', () => {
  /** Триггер — кнопка вне панели; фокус с Tab должен попасть на неё до открытия dropdown. */
  test('Tab focuses trigger', async ({ page, gotoStory }) => {
    await gotoStory(buildTimePickerDropdownOptions({ size: SIZE.M }));

    await expect
      .poll(async () => {
        for (let i = 0; i < 20; i++) {
          await page.keyboard.press('Tab');
          const focusedInsideTrigger = await page.evaluate((testId: string) => {
            const host = document.querySelector(`[data-test-id="${testId}"]`);
            const el = document.activeElement;
            return Boolean(host && el && (host === el || host.contains(el)));
          }, TEST_IDS.timePickerDropdownTrigger);
          if (focusedInsideTrigger) {
            return true;
          }
        }
        return false;
      })
      .toBe(true);
  });
});
