import { expect, test } from '#playwright-tooling/fixtures';

import { DEFAULT_STAR_COUNT } from '../../src/constants';
import { buildStoryOptions, RATING_KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('Rating — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions());

    const rating = getByTestId(TEST_IDS.root);
    await expect(rating).toBeVisible();
    await expect(page.locator(`[data-test-id^="${TEST_IDS.star}-"]:not([data-test-id*="-half-"])`)).toHaveCount(
      DEFAULT_STAR_COUNT,
    );
  });

  test('renders with custom count', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions({ count: 10 }));

    await expect(page.locator(`[data-test-id^="${TEST_IDS.star}-"]:not([data-test-id*="-half-"])`)).toHaveCount(10);
  });

  test('applies custom className', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ className: 'custom-rating' }));

    await expect(getByTestId(TEST_IDS.root)).toHaveClass(/custom-rating/);
  });

  test.describe('props propagation', () => {
    for (const { size, appearance } of RATING_KEY_COMBOS) {
      test(`size=${size} + appearance=${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, appearance, defaultValue: 2 }));

        const firstStar = getByTestId(`${TEST_IDS.star}-1`);
        await expect(firstStar).toHaveAttribute('data-size', size);
        await expect(firstStar).toHaveAttribute('data-appearance', appearance);
      });
    }
  });
});
