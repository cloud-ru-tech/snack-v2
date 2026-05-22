import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, COPY_BUTTON_KEY_COMBOS, TEST_IDS } from './helpers';

test.describe('CopyButton — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.copyButton.root)).toBeVisible();
    });

    test('renders as a button element', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      const button = getByTestId(TEST_IDS.copyButton.root);
      await expect(button).toHaveJSProperty('tagName', 'BUTTON');
    });

    test('has aria-label="Copy" when no label provided', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(TEST_IDS.copyButton.root)).toHaveAttribute('aria-label', 'Copy');
    });

    test('renders provided label and drops aria-label', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label: 'Copy value' }));

      const button = getByTestId(TEST_IDS.copyButton.root);
      await expect(button).toContainText('Copy value');
      await expect(button).not.toHaveAttribute('aria-label', /.+/);
    });

    test('applies custom className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ className: 'custom-copy' }));

      await expect(getByTestId(TEST_IDS.copyButton.root)).toHaveClass(/custom-copy/);
    });
  });

  test('props propagation', async ({ gotoStory, getByTestId }) => {
    for (const { size, label } of COPY_BUTTON_KEY_COMBOS) {
      await gotoStory(buildStoryOptions({ size, label }));

      const button = getByTestId(TEST_IDS.copyButton.root);
      await expect(button).toHaveAttribute('data-size', size);
    }
  });
});
