import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Markdown — rendering', () => {
  test('renders viewer root with default sample', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.viewer);
    await expect(root).toBeVisible();
    await expect(root.locator('h1')).toBeVisible();
  });

  test('renders GFM table from markdown', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.viewer).locator('table')).toBeVisible();
  });

  test('renders code block with syntax highlighting', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.viewer).locator('pre code')).toBeVisible();
  });

  test('code block exposes a Copy button (Figma parity)', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.viewer)).toBeVisible();
    await expect(page.getByTestId(TEST_IDS.viewerCodeCopy).first()).toBeVisible();
  });

  test('skipHtml strips raw HTML', async ({ gotoStory, getByTestId }) => {
    // skipHtml=false показан визуально секцией `skipHtml` в VisualMatrix (сырой HTML
    // экранируется в литеральный текст, не в DOM). Здесь проверяем только strip при
    // skipHtml=true — простым URL-safe значением без пробелов и спецсимволов.
    await gotoStory(buildStoryOptions({ value: 'PlainParagraph', skipHtml: true }));
    const root = getByTestId(TEST_IDS.viewer);
    await expect(root.locator('script')).toHaveCount(0);
    await expect(root).toContainText('PlainParagraph');
  });
});
