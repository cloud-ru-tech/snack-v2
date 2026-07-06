import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, PROMO_TAG_STORIES, TEST_IDS } from './helpers';

test.describe('PromoTag — polymorphism', () => {
  test.describe("as='a'", () => {
    test('renders anchor with href', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, PROMO_TAG_STORIES.polymorphic));

      const root = getByTestId(TEST_IDS.polymorphicAnchor);
      const tag = await root.evaluate(el => el.tagName.toLowerCase());
      expect(tag).toBe('a');
      await expect(root).toHaveAttribute('href', 'https://example.com');
      await expect(root).toHaveAttribute('data-clickable', 'true');
    });

    test("target='_blank' injects rel='noopener noreferrer'", async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, PROMO_TAG_STORIES.polymorphic));

      const root = getByTestId(TEST_IDS.polymorphicAnchor);
      await expect(root).toHaveAttribute('target', '_blank');
      const rel = await root.getAttribute('rel');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    });
  });

  test('as={Link} forwards to prop to href', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, PROMO_TAG_STORIES.polymorphic));

    await expect(getByTestId(TEST_IDS.polymorphicLink)).toHaveAttribute('href', 'https://example.com');
  });
});
