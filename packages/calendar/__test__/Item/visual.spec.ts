import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildItemOptions, ITEM_STORIES } from './helpers';

// Item не экспортируется из пакета, но несёт собственную ось состояний ячейки
// (checked × rangePosition × disabled × another × holiday), которой нет в матрице Calendar:
// там выбранные дни не бывают disabled. Без этого снимка правки заливки и state-layer
// ячейки не покрыты visual regression ни одним baseline'ом пакета.
test.describe('Item — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildItemOptions(undefined, ITEM_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });
});
