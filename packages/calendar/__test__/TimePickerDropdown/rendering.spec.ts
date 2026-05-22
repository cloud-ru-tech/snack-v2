import { expect, test } from '#playwright-tooling/fixtures';

import { SIZE } from '../../src/constants';
import {
  buildTimePickerDropdownOptions,
  TEST_IDS,
  TIME_PICKER_DROPDOWN_LIST_TEST_IDS,
  TIME_PICKER_DROPDOWN_STORIES,
} from './helpers';

/** Ключевая выборка `size`: по одному представителю на каждое значение. */
const KEY_SIZES = [SIZE.S, SIZE.M, SIZE.L] as const;

test.describe('TimePickerDropdown — rendering', () => {
  test.describe('render', () => {
    test(`story ${TIME_PICKER_DROPDOWN_STORIES.playground} renders trigger`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildTimePickerDropdownOptions(undefined, TIME_PICKER_DROPDOWN_STORIES.playground));
      await expect(getByTestId(TEST_IDS.timePickerDropdownTrigger)).toBeVisible();
    });
  });

  test.describe('states', () => {
    test('dropdown shell has test id when panel is open', async ({ gotoStory, getByTestId, page }) => {
      await gotoStory(buildTimePickerDropdownOptions({ size: SIZE.M }));
      await getByTestId(TEST_IDS.timePickerDropdownTrigger).click();
      await expect(page.locator(`[data-test-id="${TEST_IDS.timePickerDropdown}"]`)).toBeVisible();
    });

    test('opened panel lists hours and minutes; seconds column depends on showSeconds', async ({
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory(buildTimePickerDropdownOptions({ size: SIZE.M, showSeconds: true }));
      await getByTestId(TEST_IDS.timePickerDropdownTrigger).click();
      await expect(getByTestId(TEST_IDS.timePickerDropdownContent)).toBeVisible();
      await expect(getByTestId(TIME_PICKER_DROPDOWN_LIST_TEST_IDS.hours(0))).toBeVisible();
      await expect(getByTestId(TIME_PICKER_DROPDOWN_LIST_TEST_IDS.minutes(0))).toBeVisible();
      await expect(getByTestId(TIME_PICKER_DROPDOWN_LIST_TEST_IDS.seconds(0))).toBeVisible();
    });

    test('showSeconds=false hides seconds column', async ({ gotoStory, getByTestId, page }) => {
      await gotoStory(buildTimePickerDropdownOptions({ size: SIZE.M, showSeconds: false }));
      await getByTestId(TEST_IDS.timePickerDropdownTrigger).click();
      await expect(getByTestId(TEST_IDS.timePickerDropdownContent)).toBeVisible();
      await expect(page.getByTestId(TIME_PICKER_DROPDOWN_LIST_TEST_IDS.seconds(0))).toHaveCount(0);
    });
  });

  test.describe('props propagation', () => {
    for (const size of KEY_SIZES) {
      test(`opened panel exposes data-size=${size} on inner chrome`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildTimePickerDropdownOptions({ size, showSeconds: true }));
        await getByTestId(TEST_IDS.timePickerDropdownTrigger).click();
        await expect(getByTestId(TEST_IDS.timePickerDropdownContent)).toBeVisible();

        const sized = getByTestId(TEST_IDS.timePickerDropdownContent).locator('[data-size]').first();
        await expect(sized).toHaveAttribute('data-size', size);
      });
    }
  });
});
