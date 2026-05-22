import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, SPINNER_KEY_SIZES, TEST_IDS } from './helpers';

test.describe('Spinner — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.spinner.root)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const size of SPINNER_KEY_SIZES) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));

        await expect(getByTestId(TEST_IDS.spinner.root)).toHaveAttribute('data-size', size);
      });
    }
  });
});
