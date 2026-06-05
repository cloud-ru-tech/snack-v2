import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AiIconGiga — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
  });

  for (const variant of ['neutral', 'logoDark', 'logoLight'] as const) {
    test(`variant=${variant} → data-variant propagation`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ variant }));
      await expect(getByTestId(TEST_IDS.root)).toHaveAttribute('data-variant', variant);
    });
  }

  test('size propagates to svg width/height', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ size: 48 }));
    const icon = getByTestId(TEST_IDS.root);
    await expect(icon).toHaveAttribute('width', '48');
    await expect(icon).toHaveAttribute('height', '48');
  });
});
