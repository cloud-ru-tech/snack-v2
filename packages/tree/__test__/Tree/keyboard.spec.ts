import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS, TREE_STORIES } from './helpers';

test.describe('Tree — keyboard (real browser)', () => {
  test('ArrowDown moves focus to next row; ArrowUp moves back', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(TREE_STORIES.interaction));

    const fruitsRow = getByTestId(TEST_IDS.tree.nodes.fruits).getByTestId(TEST_IDS.treeNode.item).first();
    const appleRow = getByTestId(TEST_IDS.tree.nodes.apple).getByTestId(TEST_IDS.treeNode.item).first();

    await fruitsRow.focus();
    await expect(fruitsRow).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(appleRow).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(fruitsRow).toBeFocused();
  });

  test('ArrowUp on first row clamps focus at first', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(TREE_STORIES.interaction));

    const fruitsRow = getByTestId(TEST_IDS.tree.nodes.fruits).getByTestId(TEST_IDS.treeNode.item).first();
    await fruitsRow.focus();
    await page.keyboard.press('ArrowUp');
    await expect(fruitsRow).toBeFocused();
  });

  test('ArrowRight on row with actions moves focus to kebab trigger', async ({ page, gotoStory, getByTestId }) => {
    // Playground имеет expandedNodes=['fruits']; parentActions=rowActions через
    // mapping argTypes — URL-arg резолвится в реальный callback, kebab рендерится.
    await gotoStory(buildStoryOptions(TREE_STORIES.playground, { parentActions: 'rowActions' }));

    const fruits = getByTestId(TEST_IDS.tree.nodes.fruits);
    const fruitsRow = fruits.getByTestId(TEST_IDS.treeNode.item).first();
    const fruitsKebab = fruits.getByTestId(TEST_IDS.treeNode.droplistTrigger).first();

    await fruitsRow.focus();
    await expect(fruitsRow).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(fruitsKebab).toBeFocused();
  });

  test('selecting droplist item via Enter returns focus to row and unsticks kebab', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(TREE_STORIES.playground, { parentActions: 'rowActions' }));

    const fruits = getByTestId(TEST_IDS.tree.nodes.fruits);
    const fruitsRow = fruits.getByTestId(TEST_IDS.treeNode.item).first();
    const fruitsKebab = fruits.getByTestId(TEST_IDS.treeNode.droplistTrigger).first();

    // open dropdown via keyboard
    await fruitsRow.focus();
    await page.keyboard.press('ArrowRight');
    await expect(fruitsKebab).toBeFocused();
    await page.keyboard.press('ArrowDown');

    // Enter on first action — droplist closes via closeDroplistOnItemClick
    await page.keyboard.press('Enter');

    // фокус вернулся на строку, не залип на kebab
    await expect(fruitsRow).toBeFocused();
    // и data-droplist-active снят → kebab снова невидим
    await expect(fruitsRow).not.toHaveAttribute('data-droplist-active', /.*/);
  });

  test('ArrowLeft from kebab trigger returns focus to row', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(TREE_STORIES.playground, { parentActions: 'rowActions' }));

    const fruits = getByTestId(TEST_IDS.tree.nodes.fruits);
    const fruitsRow = fruits.getByTestId(TEST_IDS.treeNode.item).first();
    const fruitsKebab = fruits.getByTestId(TEST_IDS.treeNode.droplistTrigger).first();

    await fruitsRow.focus();
    await page.keyboard.press('ArrowRight');
    await expect(fruitsKebab).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(fruitsRow).toBeFocused();
  });
});
