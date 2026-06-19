import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PROMO_TAG_PREDEFINED_STORIES, TEST_IDS } from './helpers';

test.describe('PromoTagPredefined — polymorphism', () => {
  test('as={Link} forwards to prop to href', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, PROMO_TAG_PREDEFINED_STORIES.polymorphic));

    const link = getByTestId(TEST_IDS.promoTag);
    await expect(link).toHaveAttribute('href', 'https://example.com');
    await expect(link).toHaveAttribute('target', '_blank');
  });
});
