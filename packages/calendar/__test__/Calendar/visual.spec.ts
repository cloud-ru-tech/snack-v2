import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import { CALENDAR_MODE, SIZE } from '../../src/constants';
import { buildCalendarOptions, CALENDAR_STORIES, TEST_IDS } from './helpers';

test.describe('Calendar — visual regression', () => {
  /** Снимки `Calendar` / `CalendarBase`. При смене сетки или темы — обновить baseline. */
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory }) => {
    await gotoStory(buildCalendarOptions(undefined, CALENDAR_STORIES.visualMatrix));
    await waitForFonts(page);
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
  });

  test.describe('interaction (Playground)', () => {
    test('hover', async ({ page, gotoStory, getByTestId }) => {
      await gotoStory(buildCalendarOptions({ mode: CALENDAR_MODE.Date, size: SIZE.M }));
      await waitForFonts(page);
      await getByTestId(`period-next-${TEST_IDS.calendarPlayground}`).hover();
      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        'interaction-hover.png',
        SCREENSHOT_DEFAULT_OPTS,
      );
    });

    test('focus', async ({ page, gotoStory }) => {
      await gotoStory(buildCalendarOptions({ mode: CALENDAR_MODE.Date, size: SIZE.M }));
      await waitForFonts(page);
      await page.keyboard.press('Tab');
      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        'interaction-focus.png',
        SCREENSHOT_DEFAULT_OPTS,
      );
    });
  });
});
