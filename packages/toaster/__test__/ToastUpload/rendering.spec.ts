import { expect, test } from '#playwright-tooling/fixtures';

import { TOAST_UPLOAD_STATUS } from '../../src/components/ToastUpload/constants';
import { buildStoryOptions, UPLOAD_CLOSE_TEST_ID, UPLOAD_LIST_TEST_ID, UPLOAD_TEST_ID } from './helpers';

test.describe('ToastUpload — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(UPLOAD_TEST_ID)).toBeVisible();
  });

  test('renders title and description', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ title: 'Upload', description: '3 files' }));
    const root = getByTestId(UPLOAD_TEST_ID);
    await expect(root).toContainText('Upload');
    await expect(root).toContainText('3 files');
  });

  for (const status of Object.values(TOAST_UPLOAD_STATUS)) {
    test(`status=${status} renders without errors`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ status }));
      await expect(getByTestId(UPLOAD_TEST_ID)).toBeVisible();
    });
  }

  test('closable=true renders close button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ closable: true }));
    await expect(getByTestId(UPLOAD_CLOSE_TEST_ID)).toBeVisible();
  });

  test('expanded list renders file items', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ collapsed: false }));
    await expect(getByTestId(UPLOAD_LIST_TEST_ID)).toBeVisible();
  });

  test('collapsed=true hides file list', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ collapsed: true }));
    await expect(getByTestId(UPLOAD_LIST_TEST_ID)).toHaveCount(0);
  });
});
