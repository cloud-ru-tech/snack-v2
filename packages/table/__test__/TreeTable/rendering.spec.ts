import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS, TREE_TABLE_STORIES } from './helpers';

test.describe('TreeTable — rendering', () => {
  test('keeps root rows beyond the first page accessible', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions({}, TREE_TABLE_STORIES.playground));
    const data = Array.from({ length: 15 }, (_, index) => ({
      id: String(index),
      name: `Root ${index}`,
      email: '',
      role: '',
    }));
    await setStoryArgs({ data, pageSize: 10 });
    await expect(getByTestId(TEST_IDS.component.bodyRow)).toHaveCount(10);
    await setStoryArgs({ pagination: { state: { pageIndex: 1, pageSize: 10 } } });
    await expect(getByTestId(TEST_IDS.component.bodyRow)).toHaveCount(5);
    await expect(getByTestId(TEST_IDS.table.root)).toContainText('Root 14');
  });
});
