import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import { SIZE } from '../../src/constants';
import { buildTimePickerDropdownOptions, TEST_IDS } from './helpers';

test.describe('TimePickerDropdown — visual regression', () => {
  /** Снимки панели с `TimePickerBase` (колонки `TimeList`). При смене вёрстки времени — обновить baseline (`test:e2e:update-snapshots`). */
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('playground closed', async ({ page, gotoStory }) => {
    await gotoStory(buildTimePickerDropdownOptions({ size: SIZE.M }));
    await waitForFonts(page);
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
      'visual-playground.png',
      SCREENSHOT_DEFAULT_OPTS,
    );
  });

  test('dropdown open', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildTimePickerDropdownOptions({ size: SIZE.M }));
    await waitForFonts(page);
    await getByTestId(TEST_IDS.timePickerDropdownTrigger).click();
    await expect(getByTestId(TEST_IDS.timePickerDropdownContent)).toBeVisible();
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-open.png', SCREENSHOT_DEFAULT_OPTS);
  });
});
