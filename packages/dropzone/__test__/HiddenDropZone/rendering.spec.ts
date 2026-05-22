import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

const HIDDEN_DROPZONE_WRAPPER_TEST_ID = 'hidden-dropzone-wrapper';

test.describe('HiddenDropZone — rendering', () => {
  test('renders form (children visible)', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.hiddenDropZone.form)).toBeVisible();
  });

  test.describe('props propagation', () => {
    test('data-test-id propagates to wrapper', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ 'data-test-id': HIDDEN_DROPZONE_WRAPPER_TEST_ID }));
      await expect(getByTestId(HIDDEN_DROPZONE_WRAPPER_TEST_ID)).toBeAttached();
    });

    test('disabled state preserves children', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));
      await expect(getByTestId(TEST_IDS.hiddenDropZone.form)).toBeVisible();
    });
  });
});
