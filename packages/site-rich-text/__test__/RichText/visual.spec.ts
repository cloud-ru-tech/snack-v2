import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, RICH_TEXT_STORIES, TEST_IDS } from './helpers';

test.describe('RichText — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, RICH_TEXT_STORIES.visualMatrix));
    await waitForFonts();

    await assertVisualMatrixSnapshot(page);
  });

  // Hover меняет цвет ссылки; фокус у ссылки — нативный, своего стиля в RichText нет.
  // Кадр — весь блок: по bbox одной ссылки по краям снимка попадают обрезанные куски соседнего текста.
  test('interaction states (default × hover)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.root),
      hoverTarget: getByTestId(TEST_IDS.link),
      states: ['default', 'hover'],
      // Блок на всю ширину панели — ячейки друг под другом.
      layout: 'col',
    });
  });
});
