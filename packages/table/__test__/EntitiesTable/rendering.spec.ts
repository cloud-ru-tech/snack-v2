import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  COMFORT_DENSITY_GLOBALS,
  ENTITIES_TABLE_KEY_COMBOS,
  ENTITIES_TABLE_STORIES,
  getPageNumberTestId,
  TEST_IDS,
} from './helpers';

const COMPONENT = TEST_IDS.component;
const DEFAULT_LIMIT = 10;

test.describe('EntitiesTable — rendering', () => {
  test.describe('render', () => {
    test('playground renders the server table root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({}, ENTITIES_TABLE_STORIES.playground));
      await expect(getByTestId(TEST_IDS.serverTable.root)).toBeVisible();
      await expect(getByTestId(COMPONENT.headerRow)).toBeVisible();
      await expect(getByTestId(COMPONENT.bodyRow).first()).toBeVisible();
    });

    test('visual matrix renders the server table root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({}, ENTITIES_TABLE_STORIES.visualMatrix));
      await expect(getByTestId(TEST_IDS.serverTable.root)).toHaveCount(5);
    });
  });

  test.describe('states', () => {
    test('defaultLimit controls page size on playground', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ defaultLimit: 5 }, ENTITIES_TABLE_STORIES.playground));
      await expect(getByTestId(COMPONENT.bodyRow)).toHaveCount(5);
    });
  });

  test.describe('props propagation', () => {
    for (const { layoutType } of ENTITIES_TABLE_KEY_COMBOS) {
      test(`layoutType=${layoutType}`, async ({ gotoStory, getByTestId }) => {
        const globals = layoutType === 'mobile' ? COMFORT_DENSITY_GLOBALS : undefined;
        await gotoStory(buildStoryOptions({ layoutType }, ENTITIES_TABLE_STORIES.playground, globals));
        await expect(getByTestId(TEST_IDS.serverTable.root)).toHaveAttribute('data-layout-type', layoutType);
      });
    }

    test('pagination renders page controls for mock data', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ defaultLimit: DEFAULT_LIMIT }, ENTITIES_TABLE_STORIES.playground));
      await expect(getByTestId(getPageNumberTestId(1))).toBeVisible();
      await expect(getByTestId(getPageNumberTestId(2))).toBeVisible();
    });
  });
});
