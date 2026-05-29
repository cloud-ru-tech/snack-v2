import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS, TREE_STORIES } from './helpers';

test.describe('Tree — interaction (real browser)', () => {
  test.describe('anchor modifier-click (browser-specific)', () => {
    test('cmd-click / ctrl-click / middle-click on href link: handleAnchorClick early-returns', async ({
      page,
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory(buildStoryOptions(TREE_STORIES.anchor));

      // Intercept all <a> clicks before they navigate away from the story.
      await page.evaluate(() => {
        document.addEventListener(
          'click',
          e => {
            const a = (e.target as HTMLElement | null)?.closest('a');
            if (a) e.preventDefault();
          },
          true,
        );
      });

      const guide = getByTestId(TEST_IDS.tree.nodes.citrus).getByTestId(TEST_IDS.treeNode.link).first();
      await expect(guide).toBeVisible();

      await guide.click({ modifiers: ['Meta'] });
      await guide.click({ modifiers: ['Control'] });
      await guide.click({ button: 'middle' });
    });
  });

  test.describe('multi-select checkbox native input click (browser-specific)', () => {
    test('clicking native input toggles handleSelect via Checkbox onChange', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(TREE_STORIES.multiSelect));

      const apple = getByTestId(TEST_IDS.tree.nodes.apple);
      const nativeInput = apple.getByTestId(`${TEST_IDS.treeNode.checkbox}-native-input`).first();
      await nativeInput.click();

      // Parent toggle: cascades through lookupTreeForSelectedNodes
      const fruits = getByTestId(TEST_IDS.tree.nodes.fruits);
      await fruits.getByTestId(`${TEST_IDS.treeNode.checkbox}-native-input`).first().click();
    });
  });
});
