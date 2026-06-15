import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  screenshotRegion,
} from '#playwright-tooling/utils';

import { buildStoryOptions, FIELD_STEPPER_STORIES, TEST_IDS } from './helpers';

test.describe('FieldStepper — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_STEPPER_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Кнопки шага — tabIndex=-1, Tab фокусирует сам инпут (focus-glow на shell).
  test('interaction states (default × hover × focus)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.fieldStepper),
      hoverTarget: getByTestId(TEST_IDS.fieldStepperInput),
      focusAction: async page => {
        await page.keyboard.press('Tab');
      },
    });
  });

  // Тултип границы поднимается на blur при выходе за min/max (allowMoreThanLimits=false по
  // дефолту Playground'а). Кадр клипим по union поля и портального тултипа — STORYBOOK_ROOT
  // захватил бы пустую demo-оболочку под порталом. Снимаем сразу после blur, пока 2с-таймер
  // авто-скрытия не сработал.
  test('open-limit-tooltip', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    const input = getByTestId(TEST_IDS.fieldStepperInput);
    await input.click();
    await input.fill('150');
    await input.blur();

    const root = getByTestId(TEST_IDS.fieldStepper);
    const tooltip = getByTestId(TEST_IDS.fieldStepperLimitTooltip);
    await expect(tooltip).toBeVisible();

    const png = await screenshotRegion(page, [root, tooltip], 16, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('open-limit-tooltip.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
