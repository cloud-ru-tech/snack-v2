import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  screenshotRegion,
} from '#playwright-tooling/utils';

import { buildStoryOptions, CALENDAR_DROPDOWN_CONTENT_TEST_ID, FIELD_DATE_STORIES, TEST_IDS } from './helpers';

test.describe('FieldDate — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_DATE_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    // Текстовое поле — без pressed.
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.fieldDate),
    });
  });

  // Открытый календарь — портальный overlay, в VisualMatrix не собирается: отдельный снимок.
  // date-time режим, чтобы в кадр попала колонка времени календаря.
  test('open-calendar', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions({ mode: 'date-time' }));
    await waitForFonts();
    const root = getByTestId(TEST_IDS.fieldDate);
    await root.getByTestId(TEST_IDS.fieldDateCalendar).click();
    const content = getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID);
    await expect(content).toBeVisible();
    const png = await screenshotRegion(page, [root, content], 16, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('open-calendar.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Mobile: календарь открывается в BottomSheet (адаптивный @ds/calendar), full-viewport overlay.
  // Форсим раскладку тулбар-глобалом `layoutType='mobile'` + mobile viewport; снимок — весь viewport.
  test('open-calendar-mobile', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions({ mode: 'date-time' }, FIELD_DATE_STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();
    const root = getByTestId(TEST_IDS.fieldDate);
    await root.getByTestId(TEST_IDS.fieldDateCalendar).click();
    await expect(getByTestId(CALENDAR_DROPDOWN_CONTENT_TEST_ID)).toBeVisible();
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
