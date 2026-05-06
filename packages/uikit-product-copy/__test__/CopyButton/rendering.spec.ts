import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, COPY_BUTTON_SIZES, COPY_BUTTON_TEST_ID } from './helpers';

test.describe('CopyButton — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(COPY_BUTTON_TEST_ID)).toBeVisible();
    });

    test('renders as a button element', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      const button = getByTestId(COPY_BUTTON_TEST_ID);
      await expect(button).toHaveJSProperty('tagName', 'BUTTON');
    });

    test('has aria-label="Copy" when no label provided', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());

      await expect(getByTestId(COPY_BUTTON_TEST_ID)).toHaveAttribute('aria-label', 'Copy');
    });

    test('renders provided label and drops aria-label', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ label: 'Copy value' }));

      const button = getByTestId(COPY_BUTTON_TEST_ID);
      await expect(button).toContainText('Copy value');
      await expect(button).not.toHaveAttribute('aria-label', /.+/);
    });

    test('applies custom className', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ className: 'custom-copy' }));

      await expect(getByTestId(COPY_BUTTON_TEST_ID)).toHaveClass(/custom-copy/);
    });
  });

  test.describe('props propagation', () => {
    for (const size of COPY_BUTTON_SIZES) {
      test(`size=${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));

        await expect(getByTestId(COPY_BUTTON_TEST_ID)).toHaveAttribute('data-size', size);
      });
    }
  });
});
