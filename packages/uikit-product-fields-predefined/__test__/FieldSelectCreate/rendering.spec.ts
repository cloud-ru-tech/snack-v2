import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

// Открытие формы создания (клик → модалка/дровер → submitHandler) живёт в
// stories/FieldSelectCreate/tests/FieldSelectCreate.InteractionTest.stories.tsx::play.
// Все оси визуально покрывает снапшот FieldSelectCreate.VisualMatrix.

test.describe('FieldSelectCreate — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldSelectCreate)).toBeVisible();
  });

  test('renders the create button under the field', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fieldSelectCreateButton)).toBeVisible();
  });

  test('permission=canRead disables the create button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ permission: 'canRead' }));
    await expect(getByTestId(TEST_IDS.fieldSelectCreateButton)).toHaveAttribute('data-disabled', 'true');
  });

  test('permission=none disables the create button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ permission: 'none' }));
    await expect(getByTestId(TEST_IDS.fieldSelectCreateButton)).toHaveAttribute('data-disabled', 'true');
  });
});
