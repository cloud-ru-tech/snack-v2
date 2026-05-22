import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { CALENDAR_MODE, SIZE } from '../../src/constants';
import { buildCalendarOptions, CALENDAR_STORIES, getPeriodNextTestId, TEST_IDS } from './helpers';

test.describe('Calendar — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildCalendarOptions(undefined, CALENDAR_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus) — period-next', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildCalendarOptions({ mode: CALENDAR_MODE.Date, size: SIZE.M }));
    await waitForFonts();

    // Снимаем весь календарь; hover и focus — оба на кнопке next-period (чтобы
    // diff между ячейками показывал именно её state-фон + focus-ring, а не разные слоты).
    const periodNext = getByTestId(getPeriodNextTestId(TEST_IDS.calendarPlayground));
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.calendarPlayground),
      hoverTarget: periodNext,
      focusAction: async () => {
        // Используем Playwright keyboard для focus-visible — устойчиво в chromium, без нестандартного FocusOptions.
        await periodNext.focus();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Shift+Tab');
      },
      layout: 'col',
    });
  });
});
