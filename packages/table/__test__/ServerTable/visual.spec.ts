import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

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
    await gotoStory(buildStoryOptions(undefined, SERVER_TABLE_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });
});
