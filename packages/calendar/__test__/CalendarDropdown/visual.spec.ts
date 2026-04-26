import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import { CALENDAR_MODE, SIZE } from '../../src/constants';
import { buildCalendarDropdownOptions, TEST_IDS } from './helpers';

test.describe('CalendarDropdown — visual regression', () => {
  /** Снимки триггера и панели с `Calendar` + `Footer`. При смене вёрстки — обновить baseline. */
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('playground closed', async ({ page, gotoStory }) => {
    await gotoStory(buildCalendarDropdownOptions({ mode: CALENDAR_MODE.Date, size: SIZE.M }));
    await waitForFonts(page);
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
      'visual-playground.png',
      SCREENSHOT_DEFAULT_OPTS,
    );
  });

  test('dropdown open', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildCalendarDropdownOptions({ mode: CALENDAR_MODE.Date, size: SIZE.M }));
    await waitForFonts(page);
    await getByTestId(TEST_IDS.calendarDropdownTrigger).click();
    await expect(getByTestId(TEST_IDS.calendarDropdownContent)).toBeVisible();
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-open.png', SCREENSHOT_DEFAULT_OPTS);
  });
});
