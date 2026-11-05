import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('RichText — rendering', () => {
  test('renders HTML string as markup', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await expect(getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(getByTestId(TEST_IDS.link)).toHaveAttribute('href', 'https://cloud.ru');
  });

  test('tag sets the root element', async ({ gotoStory, getByTestId, setStoryArgs }) => {
    await gotoStory(buildStoryOptions());
    const root = getByTestId(TEST_IDS.root);

    await expect(root).toHaveJSProperty('tagName', 'DIV');
    await setStoryArgs({ tag: 'h2' });
    await expect(root).toHaveJSProperty('tagName', 'H2');
  });

  test('applies custom className', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ className: 'custom-rich-text' }));

    await expect(getByTestId(TEST_IDS.root)).toHaveClass(/custom-rich-text/);
  });
});
