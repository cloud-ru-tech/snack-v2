import { STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, waitForStableRender } from '#playwright-tooling/utils';

/** Матрица собирается из нескольких таблиц с measure-based раскладкой; на нагруженном раннере
 * финальный проход измерений приходит позже первого кадра и сдвигает ячейки на пиксель. */
const TABLE_LAYOUT_SETTLE_MS = 400;

import { buildStoryOptions, SERVER_TABLE_STORIES } from './helpers';

// ServerTable — тонкая обёртка над Table (search debounce + offset/limit →
// pageIndex/pageCount): все уникальные состояния (loading, empty, search
// loading, page 2, rows-per-page) собраны строками VM — один снимок.
// Интерактивные состояния строк/порталов покрыты в __test__/Table/visual.spec.

test.describe('ServerTable — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    // Матрица из нескольких measure-based таблиц: ~25s на нагруженном раннере против
    // дефолтных 30s. Утраиваем лимит, иначе тест уходит в таймаут до сравнения кадра.
    test.slow();
    await gotoStory(buildStoryOptions(undefined, SERVER_TABLE_STORIES.visualMatrix));
    await waitForFonts();
    await waitForStableRender(page.locator(STORYBOOK_ROOT_SELECTOR), { stableForMs: TABLE_LAYOUT_SETTLE_MS });
    await assertVisualMatrixSnapshot(page);
  });
});
