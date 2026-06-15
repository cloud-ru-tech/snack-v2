import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  screenshotRegion,
} from '#playwright-tooling/utils';

import { buildStoryOptions, COLOR_PICKER_ROOT_TEST_ID, FIELD_COLOR_STORIES, TEST_IDS } from './helpers';

test.describe('FieldColor — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_COLOR_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Hover навешиваем на input — mouseenter всплывает на fieldWrapper (acrylic + focus-glow).
  // Текстовый триггер — без pressed.
  test('interaction states (default × hover × focus)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.fieldColor),
      hoverTarget: getByTestId(TEST_IDS.fieldColorInput),
    });
  });

  // Открытая палитра — портальный overlay (@ds/dropdown), в VisualMatrix не собирается из-за
  // overlay'я над DemoPage-оболочкой. Кадр клипим по union триггера и корня ColorPicker
  // (НЕ STORYBOOK_ROOT — портал лёг бы поверх demo-shell с лишними полями). Open-story форсит
  // open + withAlpha + autoApply=false + filled rgba → checkerboard-swatch, переключатель моделей,
  // alpha-row и кнопки Cancel/Apply собираются детерминированно.
  test('open-picker', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_COLOR_STORIES.open));
    await waitForFonts();
    const trigger = getByTestId(TEST_IDS.fieldColor);
    const colorPickerRoot = page.getByTestId(COLOR_PICKER_ROOT_TEST_ID);
    await expect(colorPickerRoot).toBeVisible();
    const png = await screenshotRegion(page, [trigger, colorPickerRoot], 16, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('open-picker.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
