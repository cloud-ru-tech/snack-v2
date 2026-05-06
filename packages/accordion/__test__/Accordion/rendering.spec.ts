import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, COLLAPSE_BLOCK_TEST_ID } from './helpers';

test.describe('Accordion — rendering', () => {
  test('renders three top-level CollapseBlockPrimary items', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions());

    const topLevel = page.locator(`[data-test-id="${COLLAPSE_BLOCK_TEST_ID}"][data-component="accordionPrimary"]`);

    await expect(topLevel).toHaveCount(3);
  });

  test('all top-level blocks start collapsed', async ({ gotoStory, page }) => {
    await gotoStory(buildStoryOptions());

    const topLevel = page.locator(`[data-test-id="${COLLAPSE_BLOCK_TEST_ID}"][data-component="accordionPrimary"]`);
    const count = await topLevel.count();

    for (let i = 0; i < count; i++) {
      await expect(topLevel.nth(i)).toHaveAttribute('data-expanded', 'false');
    }
  });
});
