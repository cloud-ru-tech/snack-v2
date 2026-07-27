import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { composeScreenshots, screenshotRegion, waitForSettledInViewport } from '#playwright-tooling/utils';

import { CALENDAR_DROPDOWN_MATRIX } from '../../stories/testIds';
import { buildCalendarDropdownOptions, CALENDAR_DROPDOWN_STORIES, TEST_IDS } from './helpers';

const MOBILE_GLOBALS = { layoutType: 'mobile' };

test.describe('CalendarDropdown — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // visual-matrix — composite открытых dropdown'ов 3×3 (size × mode).
  // Click-loop по триггерам VM-story: открыть → snap union(trigger, content) → Escape → следующий.
  test('visual-matrix', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildCalendarDropdownOptions(undefined, CALENDAR_DROPDOWN_STORIES.visualMatrix));
    await waitForFonts();

    const cells = [];
    for (const { size, mode, triggerTestId, contentTestId } of CALENDAR_DROPDOWN_MATRIX) {
      const trigger = getByTestId(triggerTestId);
      await trigger.click();
      const content = getByTestId(contentTestId);
      await expect(content).toBeVisible();
      const png = await screenshotRegion(page, [trigger, content], 16);
      cells.push({ label: `${size} / ${mode}`, png });
      await page.keyboard.press('Escape');
      await expect(content).toHaveCount(0);
    }

    const composite = await composeScreenshots(cells, { layout: 'grid', columns: 3 });
    expect(composite).toMatchSnapshot('visual-matrix.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Mobile surface-swap: на layoutType=mobile + mobile-viewport триггер открывает BottomSheet.
  // Full-viewport overlay → снимаем page целиком (см. visual-regression-standard §portal).
  test('open-mobile (bottom sheet, date-range)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(
      buildCalendarDropdownOptions(
        { mode: 'date-range', showPeriodPresets: true },
        CALENDAR_DROPDOWN_STORIES.playground,
        MOBILE_GLOBALS,
      ),
    );
    await waitForFonts();

    await getByTestId(TEST_IDS.calendarDropdownTrigger).click();
    const sheet = getByTestId(TEST_IDS.calendarDropdown);
    await expect(sheet).toBeVisible();
    await waitForSettledInViewport(sheet);

    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });

  // date-time: кнопка времени в шапке открывает под-экран с барабаном (TimePickerDrum).
  test('open-mobile-time (date-time drum)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(
      buildCalendarDropdownOptions({ mode: 'date-time' }, CALENDAR_DROPDOWN_STORIES.playground, MOBILE_GLOBALS),
    );
    await waitForFonts();

    await getByTestId(TEST_IDS.calendarDropdownTrigger).click();
    await getByTestId(TEST_IDS.calendarMobileTimeButton).click();
    const drum = getByTestId(TEST_IDS.timePickerDrum);
    await expect(drum).toBeVisible();
    await waitForSettledInViewport(drum);

    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile-time.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
