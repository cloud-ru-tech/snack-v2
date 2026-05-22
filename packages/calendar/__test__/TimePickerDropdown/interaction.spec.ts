import { expect, test } from '#playwright-tooling/fixtures';

import { SIZE } from '../../src/constants';
import { buildTimePickerDropdownOptions, TEST_IDS, TIME_PICKER_DROPDOWN_LIST_TEST_IDS } from './helpers';

test.describe('TimePickerDropdown — interaction', () => {
  test('click trigger opens panel', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildTimePickerDropdownOptions({ size: SIZE.M }));
    await getByTestId(TEST_IDS.timePickerDropdownTrigger).click();
    await expect(getByTestId(TEST_IDS.timePickerDropdownContent)).toBeVisible();
  });

  test('Escape closes panel', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildTimePickerDropdownOptions({ size: SIZE.M }));
    await getByTestId(TEST_IDS.timePickerDropdownTrigger).click();
    await expect(getByTestId(TEST_IDS.timePickerDropdownContent)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(getByTestId(TEST_IDS.timePickerDropdownContent)).toBeHidden();
  });

  test('when open, time lists are interactable targets in DOM', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildTimePickerDropdownOptions({ size: SIZE.M, showSeconds: true }));
    await getByTestId(TEST_IDS.timePickerDropdownTrigger).click();
    await expect(getByTestId(TIME_PICKER_DROPDOWN_LIST_TEST_IDS.hours(0))).toBeVisible();
    await expect(getByTestId(TIME_PICKER_DROPDOWN_LIST_TEST_IDS.minutes(0))).toBeVisible();
    await expect(getByTestId(TIME_PICKER_DROPDOWN_LIST_TEST_IDS.seconds(0))).toBeVisible();
  });
});
