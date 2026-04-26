import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import { SIZE } from '../../src/constants';
import { buildTimePickerDrumOptions, TEST_IDS, TIME_PICKER_DRUM_STORIES } from './helpers';

test.describe('TimePickerDrum — visual regression', () => {
  /** Снимки Playground и VisualMatrix (`TimePickerDrum` + `TimePickerDrumWheelColumn`). Baselines — только chrome. */
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildTimePickerDrumOptions(undefined, TIME_PICKER_DRUM_STORIES.visualMatrix));
    await waitForFonts(page);
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
  });

  test.describe('interaction (Playground)', () => {
    test('hover', async ({ page, gotoStory }) => {
      await gotoStory(
        buildTimePickerDrumOptions({
          size: SIZE.M,
          showSeconds: true,
          options: 'all',
        }),
      );
      await waitForFonts(page);
      await page.getByTestId(TEST_IDS.hoursColumn).hover();
      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        'interaction-hover.png',
        SCREENSHOT_DEFAULT_OPTS,
      );
    });

    test('focus', async ({ page, gotoStory }) => {
      await gotoStory(
        buildTimePickerDrumOptions({
          size: SIZE.M,
          showSeconds: true,
          options: 'all',
        }),
      );
      await waitForFonts(page);
      await page.keyboard.press('Tab');
      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        'interaction-focus.png',
        SCREENSHOT_DEFAULT_OPTS,
      );
    });
  });
});
