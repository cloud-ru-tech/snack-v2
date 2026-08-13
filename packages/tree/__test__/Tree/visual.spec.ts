import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, TEST_IDS, TREE_STORIES } from './helpers';

test.describe('Tree — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(TREE_STORIES.visualMatrix));
    await waitForFonts();

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('visual-matrix.png', SCREENSHOT_DEFAULT_OPTS);
  });

  test('interaction states (default × hover × focus)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    const firstNode = getByTestId(TEST_IDS.tree.nodes.fruits).getByTestId(TEST_IDS.treeNode.item).first();
    await assertInteractionStatesSnapshot(page, { target: firstNode });
  });

  // У выбранного узла своя палитра фокуса, поэтому снимок отдельный от default-узла.
  test('interaction states (selected node)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions(TREE_STORIES.playground, { selected: 'apple' }));
    await waitForFonts();

    const selectedNode = getByTestId(TEST_IDS.tree.nodes.apple).getByTestId(TEST_IDS.treeNode.item).first();
    await assertInteractionStatesSnapshot(page, {
      target: selectedNode,
      // Roving tabindex держит нулевой узел, поэтому до выбранного доходим стрелкой.
      focusAction: async page => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowDown');
      },
      snapshotName: 'interaction-states-selected.png',
    });
  });

  test('figma compare', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(TREE_STORIES.figmaCompare));
    await waitForFonts();

    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('figma-compare.png', SCREENSHOT_DEFAULT_OPTS);
  });
});
