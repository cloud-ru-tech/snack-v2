import { expect, test } from '#playwright-tooling/fixtures';
import { dataTestIdSelector } from '#playwright-tooling/utils';

import { buildStoryOptions, INFINITE_TABLE_STORIES, TEST_IDS } from './helpers';

test.describe('InfiniteTable — rendering', () => {
  test.describe('render', () => {
    test('playground renders the table root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({}, INFINITE_TABLE_STORIES.playground));
      await expect(getByTestId(TEST_IDS.table.root)).toBeVisible();
    });

    test('loadMoreButton story renders the table root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({}, INFINITE_TABLE_STORIES.loadMoreButton));
      await expect(getByTestId(TEST_IDS.table.root)).toBeVisible();
    });
  });

  test.describe('props propagation', () => {
    // Playground вычисляет hasMore из state (items.length < ALL_USERS.length),
    // поэтому URL-аргумент hasMore=true всегда соответствует начальному состоянию.
    test("loadMoreTrigger='button' + hasMore=true renders the load-more button", async ({
      gotoStory,
      page,
      getByTestId,
    }) => {
      await gotoStory(
        buildStoryOptions({ loadMoreTrigger: 'button', hasMore: true }, INFINITE_TABLE_STORIES.playground),
      );
      await expect(getByTestId(TEST_IDS.table.root)).toBeVisible();
      await expect(page.locator(dataTestIdSelector(TEST_IDS.component.loadMoreButton))).toBeVisible();
    });

    test("loadMoreTrigger='scroll' (default) does not render the load-more button", async ({
      gotoStory,
      page,
      getByTestId,
    }) => {
      await gotoStory(
        buildStoryOptions({ loadMoreTrigger: 'scroll', hasMore: true }, INFINITE_TABLE_STORIES.playground),
      );
      await expect(getByTestId(TEST_IDS.table.root)).toBeVisible();
      await expect(page.locator(dataTestIdSelector(TEST_IDS.component.loadMoreButton))).not.toBeVisible();
    });

    // loadMoreButton story: кнопка видима при начальном состоянии (hasMore=true)
    test('loadMoreButton story: load-more button is visible initially', async ({ gotoStory, page, getByTestId }) => {
      await gotoStory(buildStoryOptions({}, INFINITE_TABLE_STORIES.loadMoreButton));
      await expect(getByTestId(TEST_IDS.table.root)).toBeVisible();
      await expect(page.locator(dataTestIdSelector(TEST_IDS.component.loadMoreButton))).toBeVisible();
    });
  });
});
