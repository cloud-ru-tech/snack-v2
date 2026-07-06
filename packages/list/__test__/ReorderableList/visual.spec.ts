import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, REORDERABLE_LIST_STORIES } from './helpers';

test.describe('ReorderableList — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // Главный артефакт: вся VisualMatrix (size × структура «плоский / с группой и disabled-строкой»
  // + truncate) одним снимком. Ручка перетаскивания рендерится у каждой строки — её посадка по icon-сетке и
  // сдвиг в заголовке группы видны здесь же. Состояния самого драга (ghost, DragOverlay, границы
  // группы) статикой не берутся — они покрыты interaction.spec.ts.
  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, REORDERABLE_LIST_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });
});
