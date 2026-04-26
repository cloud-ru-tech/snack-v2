import { expect, test } from '#playwright-tooling/fixtures';

import { SIZE } from '../../src/constants';
import { buildTimePickerDrumOptions, TEST_IDS, TIME_PICKER_DRUM_KEY_COMBOS, TIME_PICKER_DRUM_STORIES } from './helpers';

test.describe('TimePickerDrum — rendering', () => {
  test.describe('render', () => {
    for (const story of Object.values(TIME_PICKER_DRUM_STORIES)) {
      test(`story ${story} renders drum`, async ({ gotoStory, page }) => {
        await gotoStory(buildTimePickerDrumOptions(undefined, story));
        await expect(page.locator(`[data-test-id="${TEST_IDS.root}"]`).first()).toBeVisible();
      });
    }
  });

  test.describe('states', () => {
    test('showSeconds=false removes data-show-seconds on root', async ({ gotoStory, page }) => {
      await gotoStory(
        buildTimePickerDrumOptions({
          size: SIZE.M,
          showSeconds: false,
          options: 'all',
        }),
      );
      const root = page.getByTestId(TEST_IDS.root).first();
      await expect(root).not.toHaveAttribute('data-show-seconds');
    });

    test('showSeconds=true sets data-show-seconds on root', async ({ gotoStory, page }) => {
      await gotoStory(
        buildTimePickerDrumOptions({
          size: SIZE.M,
          showSeconds: true,
          options: 'all',
        }),
      );
      const root = page.getByTestId(TEST_IDS.root).first();
      await expect(root).toHaveAttribute('data-show-seconds', 'true');
    });

    test('showSeconds=false hides seconds column', async ({ gotoStory, page }) => {
      await gotoStory(
        buildTimePickerDrumOptions({
          size: SIZE.M,
          showSeconds: false,
          options: 'all',
        }),
      );
      await expect(page.getByTestId(TEST_IDS.secondsColumn)).toHaveCount(0);
    });

    test('showSeconds=true shows hours, minutes and seconds columns', async ({ gotoStory, page }) => {
      await gotoStory(
        buildTimePickerDrumOptions({
          size: SIZE.M,
          showSeconds: true,
          options: 'all',
        }),
      );
      await expect(page.getByTestId(TEST_IDS.hoursColumn)).toBeVisible();
      await expect(page.getByTestId(TEST_IDS.minutesColumn)).toBeVisible();
      await expect(page.getByTestId(TEST_IDS.secondsColumn)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    for (const { size, showSeconds, options } of TIME_PICKER_DRUM_KEY_COMBOS) {
      test(`size=${size} showSeconds=${showSeconds} options=${options}`, async ({ gotoStory, page }) => {
        await gotoStory(
          buildTimePickerDrumOptions({
            size,
            showSeconds,
            options,
          }),
        );
        const root = page.getByTestId(TEST_IDS.root).first();
        await expect(root).toHaveAttribute('data-size', size);
        if (showSeconds) {
          await expect(root).toHaveAttribute('data-show-seconds', 'true');
        } else {
          await expect(root).not.toHaveAttribute('data-show-seconds');
        }
      });
    }
  });
});
