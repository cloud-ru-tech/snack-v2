import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import { SIZE } from '../../src/constants';
import { buildTimePickerOptions, TIME_PICKER_LIST_TEST_IDS } from './helpers';

test.describe('TimePicker — visual regression', () => {
  /** Снимки `TimePicker` + `TimePickerBase` / `TimeList`. При смене вёрстки — `pnpm test:e2e:update-snapshots`. */
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('playground', async ({ page, gotoStory }) => {
    await gotoStory(buildTimePickerOptions({ size: SIZE.M }));
    await waitForFonts(page);
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
      'visual-playground.png',
      SCREENSHOT_DEFAULT_OPTS,
    );
  });

  test.describe('interaction (Playground)', () => {
    test('hover', async ({ page, gotoStory }) => {
      await gotoStory(buildTimePickerOptions({ size: SIZE.M }));
      await waitForFonts(page);
      await page.getByTestId(TIME_PICKER_LIST_TEST_IDS.hours).nth(5).hover();
      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        'interaction-hover.png',
        SCREENSHOT_DEFAULT_OPTS,
      );
    });

    test('focus', async ({ page, gotoStory }) => {
      await gotoStory(buildTimePickerOptions({ size: SIZE.M }));
      await waitForFonts(page);
      await page.keyboard.press('Tab');
      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        'interaction-focus.png',
        SCREENSHOT_DEFAULT_OPTS,
      );
    });
  });
});
