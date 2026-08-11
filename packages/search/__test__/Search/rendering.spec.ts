import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Search — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  test('disabled state propagates data-disabled', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-disabled', 'true');
  });

  test('loading state propagates data-loading', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ loading: true }));
    await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-loading', 'true');
  });

  test('afterContent slot renders inside the field', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.afterContentButton)).toBeVisible();
  });

  test('afterContent slot is empty when preset is none', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ afterContentPreset: 'none' }));
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.afterContentButton)).toHaveCount(0);
  });
});
