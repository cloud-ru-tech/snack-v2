import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Accordion — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.accordion.root)).toBeVisible();
  });

  test('renders nested CollapseBlock items', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    // VisualMatrix-стори с Playground раскладкой содержит три верхнеуровневых CollapseBlock'а
    // и вложенные блоки. Тест проверяет, что хотя бы три collapse-блока отрендерились —
    // более точная адресация конкретных слотов делается в CollapseBlockPrimary/* spec'ах.
    const blocks = getByTestId(TEST_IDS.collapseBlock.collapseBlock);
    expect(await blocks.count()).toBeGreaterThanOrEqual(3);
  });
});
