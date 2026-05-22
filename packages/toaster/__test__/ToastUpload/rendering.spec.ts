import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS, UPLOAD_STATUS_KEY_VALUES } from './helpers';

test.describe('ToastUpload — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.uploadRoot)).toBeVisible();
  });

  test('renders title and description', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ title: 'Upload', description: '3 files' }));
    const root = getByTestId(TEST_IDS.uploadRoot);
    await expect(root).toContainText('Upload');
    await expect(root).toContainText('3 files');
  });

  // Параметризация по ключевой выборке status — по 1 представителю успешной и
  // ошибочной ветки. Полный набор статусов — в VisualMatrix.
  for (const status of UPLOAD_STATUS_KEY_VALUES) {
    test(`status=${status} renders without errors`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ status }));
      await expect(getByTestId(TEST_IDS.uploadRoot)).toBeVisible();
    });
  }

  test('closable=true renders close button', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ closable: true }));
    await expect(getByTestId(TEST_IDS.uploadClose)).toBeVisible();
  });

  test('expanded list renders file items', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ collapsed: false }));
    await expect(getByTestId(TEST_IDS.uploadList)).toBeVisible();
  });

  test('collapsed=true hides file list', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ collapsed: true }));
    await expect(getByTestId(TEST_IDS.uploadList)).toHaveCount(0);
  });
});
