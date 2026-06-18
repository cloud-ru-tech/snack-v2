import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  CHIP_CHOICE_VALUE_TEST_ID,
  COMFORT_DENSITY_GLOBALS,
  getPageNumberTestId,
  SEARCH_LOADING_SPINNER_TEST_ID,
  SERVER_TABLE_KEY_COMBOS,
  SERVER_TABLE_STORIES,
  TEST_IDS,
} from './helpers';

// Scenario-driven render checks for Playground and VisualMatrix.

// Playground: state-обвязка отдаёт limit=10, total=15 (SAMPLE_USERS) → 2 страницы.
const PLAYGROUND_LIMIT = 10;

const COMPONENT = TEST_IDS.component;

test.describe('ServerTable — rendering', () => {
  test('renders root with current page rows', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.serverTable.root)).toBeVisible();
    await expect(getByTestId(COMPONENT.headerRow)).toBeVisible();
    await expect(getByTestId(COMPONENT.bodyRow)).toHaveCount(PLAYGROUND_LIMIT);
  });

  test('pagination derives page count from total/limit', async ({ gotoStory, getByTestId }) => {
    // total=15, limit=10 → ceil(15/10) = 2 страницы
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(getPageNumberTestId(1))).toBeVisible();
    await expect(getByTestId(getPageNumberTestId(2))).toBeVisible();
    await expect(getByTestId(getPageNumberTestId(3))).toHaveCount(0);
  });

  test('rows-per-page chip renders current limit from pagination options', async ({ gotoStory, getByTestId }) => {
    // Playground args: pagination.options = [5, 10, 20], текущий limit = 10
    await gotoStory(buildStoryOptions());
    const chipValue = getByTestId(CHIP_CHOICE_VALUE_TEST_ID);
    await expect(chipValue).toBeVisible();
    await expect(chipValue).toContainText(String(PLAYGROUND_LIMIT));
  });

  test('search.loading shows spinner in the search field', async ({ gotoStory, getByTestId }) => {
    // VisualMatrix: единственная ячейка с search.loading=true рендерит Sun-спиннер
    // вместо иконки поиска
    await gotoStory(buildStoryOptions(undefined, SERVER_TABLE_STORIES.visualMatrix));
    await expect(getByTestId(SEARCH_LOADING_SPINNER_TEST_ID)).toHaveCount(1);
  });

  test.describe('props propagation', () => {
    for (const { layoutType, defaultView } of SERVER_TABLE_KEY_COMBOS) {
      test(`${layoutType} + ${defaultView}`, async ({ gotoStory, getByTestId }) => {
        const globals = layoutType === 'mobile' ? COMFORT_DENSITY_GLOBALS : undefined;
        await gotoStory(buildStoryOptions({ layoutType, defaultView }, SERVER_TABLE_STORIES.playground, globals));
        const root = getByTestId(TEST_IDS.serverTable.root);
        await expect(root).toHaveAttribute('data-layout-type', layoutType);
        await expect(root).toHaveAttribute('data-view', defaultView);
      });
    }
  });
});
