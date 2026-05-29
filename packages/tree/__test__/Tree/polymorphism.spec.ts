import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS, TREE_STORIES } from './helpers';

test.describe('Tree — polymorphism (href → <a>)', () => {
  test('href prop renders <a> with href attribute on the link slot', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(TREE_STORIES.anchor));

    const link = getByTestId(TEST_IDS.tree.nodes.apple).getByTestId(TEST_IDS.treeNode.link).first();
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', 'https://example.invalid/readme');
    expect(await link.evaluate(el => el.tagName.toLowerCase())).toBe('a');
  });
});
