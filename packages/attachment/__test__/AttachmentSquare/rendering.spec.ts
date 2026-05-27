import { expect, test } from '#playwright-tooling/fixtures';

import { ATTACHMENT_SQUARE_KEY_COMBOS, buildStoryOptions, TEST_IDS } from './helpers';

test.describe('AttachmentSquare — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.attachmentSquare.root)).toBeVisible();
  });

  test.describe('props propagation', () => {
    for (const { size, state } of ATTACHMENT_SQUARE_KEY_COMBOS) {
      const stateKey = Object.keys(state)[0];
      test(`size=${size} + ${stateKey}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size, ...state }));
        const root = getByTestId(TEST_IDS.attachmentSquare.root);
        await expect(root.locator('[data-size]').first()).toHaveAttribute('data-size', size);
        await expect(root).toHaveAttribute(`data-${stateKey}`, 'true');
      });
    }
  });

  test.describe('states', () => {
    test('loading → aria-busy + data-loading на внутреннем composition', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ loading: true }));
      const root = getByTestId(TEST_IDS.attachmentSquare.root);
      await expect(root).toHaveAttribute('aria-busy', 'true');
      // data-loading живёт на .composition div, не на корне: на корне (Card)
      // этот атрибут триггерит pressed-state materials state-layer.
      await expect(root.locator('[data-loading="true"]').first()).toBeVisible();
    });

    test('error → data-attachment-error + retry-кнопка появляется', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ error: 'Upload failed' }));
      const root = getByTestId(TEST_IDS.attachmentSquare.root);
      await expect(root).toHaveAttribute('data-attachment-error', 'true');
      await expect(getByTestId(TEST_IDS.attachmentSquare.retryAction)).toBeVisible();
    });
  });
});
