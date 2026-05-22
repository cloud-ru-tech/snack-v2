import { expect, test } from '#playwright-tooling/fixtures';

import { PAGINATION_SIZE, VARIANT } from '../../src/constants';
import { buildStoryOptions, PAGINATION_TEST_ID } from './helpers';

const KEY_COMBOS = [
  { size: PAGINATION_SIZE.S, variant: VARIANT.Button },
  { size: PAGINATION_SIZE.M, variant: VARIANT.Link },
] as const;

test.describe('Pagination — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(PAGINATION_TEST_ID)).toBeVisible();
  });

  test('renders with truncation when total > maxLength', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ total: 20, page: 10, maxLength: 7 }));
    await expect(getByTestId(PAGINATION_TEST_ID)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const { size, variant } of KEY_COMBOS) {
      test(`size=${size} + variant=${variant}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, variant }));
        const root = getByTestId(PAGINATION_TEST_ID);
        await expect(root).toBeVisible();
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-variant', variant);
      });
    }
  });
});
