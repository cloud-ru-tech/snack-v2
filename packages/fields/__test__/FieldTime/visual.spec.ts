import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  screenshotRegion,
} from '#playwright-tooling/utils';

import { buildStoryOptions, FIELD_TIME_STORIES, TEST_IDS, TIME_PICKER_CONTENT_TEST_ID } from './helpers';

test.describe('FieldTime — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_TIME_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // showClearButton=false убирает clear из таб-порядка, чтобы Tab фокусировал input; hover — на input.
  test('interaction states (default × hover × focus)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions({ showClearButton: false }));
    await waitForFonts();
    // Текстовое поле — без pressed.
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.fieldTime),
      hoverTarget: getByTestId(TEST_IDS.fieldTimeInput),
    });
  });

  // Открытый time-picker — портальный overlay, в VisualMatrix не собирается: отдельный снимок
  // триггера + контента (барабаны часов/минут/секунд, футер Apply/Current).
  test('open-picker', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    const root = getByTestId(TEST_IDS.fieldTime);
    // Иконка часов декоративна; клик по ней доходит до триггера Dropdown и открывает picker.
    await root.getByTestId(TEST_IDS.fieldTimeIcon).click();
    const content = getByTestId(TIME_PICKER_CONTENT_TEST_ID);
    await expect(content).toBeVisible();
    const png = await screenshotRegion(page, [root, content], 16, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('open-picker.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
