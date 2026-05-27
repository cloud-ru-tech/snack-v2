import { expect, test } from '#playwright-tooling/fixtures';

import { ATTACHMENT_KEY_COMBOS, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('Attachment — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.attachment.root)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const { size, state } of ATTACHMENT_KEY_COMBOS) {
      const stateKey = Object.keys(state)[0];
      test(`size=${size} + ${stateKey}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, ...state }));
        const root = getByTestId(TEST_IDS.attachment.root);
        await expect(root.locator('[data-size]').first()).toHaveAttribute('data-size', size);
        if ('loading' in state) {
          await expect(root).toHaveAttribute('aria-busy', 'true');
        }
        if ('disabled' in state) {
          await expect(root).toHaveAttribute('data-disabled', 'true');
        }
      });
    }
  });

  test.describe('states', () => {
    test('error → data-attachment-error + retry-кнопка появляется', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ error: 'Upload failed' }));
      const root = getByTestId(TEST_IDS.attachment.root);
      await expect(root).toHaveAttribute('data-attachment-error', 'true');
      await expect(root).toContainText('Upload failed');
      await expect(getByTestId(TEST_IDS.attachment.retryAction)).toBeVisible();
    });

    test('checked → data-checked', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ checked: true }));
      await expect(getByTestId(TEST_IDS.attachment.root)).toHaveAttribute('data-checked', 'true');
    });
  });
});
