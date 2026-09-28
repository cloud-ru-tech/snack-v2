import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, buildTestStoryOptions, INTERACTIVE_CHART_STORIES, TEST_IDS } from './helpers';

test.describe('InteractiveChart — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, INTERACTIVE_CHART_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Box plot при наведении: подсветка столбца и тултип-легенда. Фокусируемых элементов у графика нет.
  test('interaction states (default × hover)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    const { name, story } = INTERACTIVE_CHART_STORIES.interactionTest;
    await gotoStory(buildTestStoryOptions(name, story));
    await waitForFonts();
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.interactiveChart.plot),
      hoverTarget: getByTestId(TEST_IDS.interactiveChart.overlay),
      states: ['default', 'hover'],
    });
  });
});
