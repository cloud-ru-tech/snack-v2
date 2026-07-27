import { expect, test } from '#playwright-tooling/fixtures';

import { SIZE } from '../../src/constants';
import { buildTimePickerOptions, TEST_IDS, TIME_PICKER_LIST_TEST_IDS } from './helpers';

test.describe('TimePicker — interaction', () => {
  /** У ячеек часов один и тот же `data-test-id` на каждой строке `TimeList`; берём произвольный индекс. */
  test('click hour updates value holder', async ({ gotoStory, page }) => {
    await gotoStory(
      buildTimePickerOptions({
        size: SIZE.M,
        valueHours: undefined,
        valueMinutes: undefined,
        valueSeconds: undefined,
      }),
    );

    const holder = page.getByTestId(TEST_IDS.timePickerValueHolder);
    const before = (await holder.textContent()) ?? '';

    await page.getByTestId(TIME_PICKER_LIST_TEST_IDS.hours(7)).click();

    // Значение приезжает после ре-рендера списка — ретраим ассершен, а не читаем текст одним снимком.
    await expect(holder).not.toHaveText(before);
  });
});
