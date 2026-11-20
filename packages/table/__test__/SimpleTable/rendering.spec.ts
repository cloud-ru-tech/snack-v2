import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, SIMPLE_TABLE_STORIES, TEST_IDS } from './helpers';

test.describe('SimpleTable — rendering', () => {
  test('switches between filtered, empty and populated states', async ({
    gotoStory,
    setStoryArgs,
    page,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions({}, SIMPLE_TABLE_STORIES.playground));
    await setStoryArgs({ dataFiltered: true });
    await expect(page.getByText('Nothing found', { exact: true })).toBeVisible();
    await expect(getByTestId(TEST_IDS.component.bodyRow)).toHaveCount(0);

    await setStoryArgs({ dataFiltered: false, showEmpty: true });
    await expect(page.getByText('No data', { exact: true })).toBeVisible();

    await setStoryArgs({ showEmpty: false });
    await expect(getByTestId(TEST_IDS.component.bodyRow)).toHaveCount(8);
  });

  test('renders all rows without a toolbar or pagination', async ({ gotoStory, getByTestId, setStoryArgs, page }) => {
    await gotoStory(buildStoryOptions({}, SIMPLE_TABLE_STORIES.playground));
    const data = Array.from({ length: 15 }, (_, index) => ({
      id: String(index),
      name: `User ${index}`,
      email: '',
      role: '',
      balance: 0,
    }));
    await setStoryArgs({ data });
    await expect(getByTestId(TEST_IDS.component.bodyRow)).toHaveCount(data.length);
    await expect(getByTestId(TEST_IDS.component.toolbar)).toHaveCount(0);
    await expect(page.getByRole('navigation')).toHaveCount(0);
  });

  test('keeps rows visually unchanged on hover', async ({ gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions({}, SIMPLE_TABLE_STORIES.playground));
    await waitForFonts();

    const rows = getByTestId(TEST_IDS.component.bodyRow);
    const table = getByTestId(TEST_IDS.table.root);
    const before = await table.screenshot();
    await rows.nth(1).hover();
    expect(await table.screenshot()).toEqual(before);
  });

  test('keeps the table layout on mobile', async ({ gotoStory, getByTestId }) => {
    await gotoStory({ ...buildStoryOptions({}, SIMPLE_TABLE_STORIES.playground), globals: { layoutType: 'mobile' } });
    await expect(getByTestId(TEST_IDS.component.headerRow)).toBeVisible();
    await expect(getByTestId(TEST_IDS.component.bodyRow)).toHaveCount(8);
  });
});
