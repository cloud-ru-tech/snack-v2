import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { ALERT_STORIES, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Alert — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, ALERT_STORIES.visualMatrix));
    await waitForFonts();

    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus) — on close-button', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    // Сам Alert в дефолтной конфигурации интерактивных слотов не имеет — заводим
    // отдельную story с onClose + actions и снимаем состояния на close-кнопке
    // (Tab фокусирует её первой; hover/pressed на ней же).
    await gotoStory(buildStoryOptions(undefined, ALERT_STORIES.withActions));
    await waitForFonts();

    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.alert.root),
      hoverTarget: getByTestId(TEST_IDS.alert.closeButton),
      pressedTarget: getByTestId(TEST_IDS.alert.closeButton),
      includePressed: true,
      layout: 'col',
    });
  });
});
