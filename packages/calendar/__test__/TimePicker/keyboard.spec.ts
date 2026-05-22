import { expect, test } from '#playwright-tooling/fixtures';

import { SIZE } from '../../src/constants';
import { buildTimePickerOptions, TIME_PICKER_LIST_TEST_IDS } from './helpers';

test.describe('TimePicker — keyboard', () => {
  /** Дойти Tab-ом до фокусируемой ячейки в колонке часов (`TimeList`). */
  test('Tab reaches hours column', async ({ page, gotoStory }) => {
    await gotoStory(buildTimePickerOptions({ size: SIZE.M }));

    // Колонка часов: индексированные id `hours-<root>-<i>`; берём префикс без индекса.
    const prefix = TIME_PICKER_LIST_TEST_IDS.hours(0).replace(/-0$/, '');
    await expect
      .poll(async () => {
        for (let i = 0; i < 25; i++) {
          await page.keyboard.press('Tab');
          const id =
            (await page.evaluate(() =>
              document.activeElement?.closest('[data-test-id]')?.getAttribute('data-test-id'),
            )) ?? '';
          if (id.startsWith(prefix)) {
            return true;
          }
        }
        return false;
      })
      .toBe(true);
  });
});
