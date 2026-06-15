import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, FIELD_SLIDER_STORIES, TEST_IDS } from './helpers';

test.describe('FieldSlider — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_SLIDER_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // hover/focus меняют acrylic-уровень поля (getAcrylicProps) — этого нет в статичной VM.
  // hover живёт на внутренней оболочке (fieldSliderField); focus — Tab фокусирует input.
  // Кадр клипим по [input, handle], чтобы захватить и поле, и слайдер под ним.
  test('interaction states (default × hover × focus)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.fieldSliderField),
      hoverTarget: getByTestId(TEST_IDS.fieldSliderField),
      frame: [getByTestId(TEST_IDS.fieldSliderInput), getByTestId(TEST_IDS.fieldSliderHandle)],
      focusAction: async page => {
        await page.keyboard.press('Tab');
      },
    });
  });
});
