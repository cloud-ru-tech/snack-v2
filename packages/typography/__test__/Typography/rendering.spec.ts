import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('Typography — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    });

    test('renders children text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ children: 'Hello world' }));

      await expect(getByTestId(TEST_IDS.root)).toContainText('Hello world');
    });
  });

  test.describe('props propagation', () => {
    for (const { variant, size, weight } of KEY_COMBOS) {
      test(`variant=${variant} size=${size} weight=${weight}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ variant, size, weight }));

        const root = getByTestId(TEST_IDS.root);
        await expect(root).toHaveAttribute('data-variant', variant);
        await expect(root).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute('data-weight', weight);
      });
    }
  });
});
