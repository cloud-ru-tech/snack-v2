import { expect, test } from '#playwright-tooling/fixtures';

import { SELECTION_MODE, SIZE } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Tree — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.tree.root)).toBeVisible();
    });

    test('applies role=tree on the root', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.tree.root)).toHaveAttribute('role', 'tree');
    });
  });

  test.describe('props propagation', () => {
    for (const size of Object.values(SIZE)) {
      test(`size=${size} → data-size`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions(undefined, { size }));

        await expect(getByTestId(TEST_IDS.tree.root)).toHaveAttribute('data-size', size);
      });
    }

    test('selectionMode=multi renders checkboxes', async ({ gotoStory, page }) => {
      await gotoStory(
        buildStoryOptions(undefined, {
          selectionMode: SELECTION_MODE.Multi,
          expandedNodes: ['fruits'],
        }),
      );

      await expect(page.getByTestId(TEST_IDS.treeNode.checkbox).first()).toBeVisible();
    });

    test('selectionMode=single + showToggle renders radio', async ({ gotoStory, page }) => {
      await gotoStory(
        buildStoryOptions(undefined, {
          selectionMode: SELECTION_MODE.Single,
          showToggle: true,
          expandedNodes: ['fruits'],
        }),
      );

      await expect(page.getByTestId(TEST_IDS.treeNode.radio).first()).toBeVisible();
    });
  });

  test.describe('states', () => {
    test('expandedNodes reveals nested children', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, { expandedNodes: ['fruits'] }));

      await expect(getByTestId(TEST_IDS.tree.nodes.apple)).toBeVisible();
    });

    test('collapsed parent hides its children', async ({ gotoStory, page }) => {
      // citrus is a sub-parent inside fruits — fruits is expanded by Playground default,
      // citrus itself is not, so its children (orange/lemon) must stay hidden.
      await gotoStory(buildStoryOptions(undefined, { expandedNodes: ['fruits'] }));

      await expect(page.getByTestId(TEST_IDS.tree.nodes.orange)).toBeHidden();
    });

    test('disabled node carries aria-disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, { expandedNodes: ['fruits'] }));

      const meatItem = getByTestId(TEST_IDS.tree.nodes.meat).getByTestId(TEST_IDS.treeNode.item);
      await expect(meatItem).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
