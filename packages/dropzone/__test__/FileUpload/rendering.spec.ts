import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, FILE_UPLOAD_STORIES, TEST_IDS } from './helpers';

test.describe('FileUpload — rendering', () => {
  test('renders hidden input and trigger', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.fileUpload.root)).toBeAttached();
    await expect(getByTestId(TEST_IDS.fileUpload.trigger)).toBeVisible();
  });

  test.describe('props propagation', () => {
    test('mode=single → input without multiple', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ mode: 'single' }));
      await expect(getByTestId(TEST_IDS.fileUpload.root)).not.toHaveAttribute('multiple', /.*/);
    });

    test('mode=multiple → input with multiple', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ mode: 'multiple' }));
      await expect(getByTestId(TEST_IDS.fileUpload.root)).toHaveAttribute('multiple', '');
    });

    test('accept=image/* propagates to input', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, FILE_UPLOAD_STORIES.acceptImage));
      await expect(getByTestId(TEST_IDS.fileUpload.root)).toHaveAttribute('accept', 'image/*');
    });

    test('accept=.pdf,.doc propagates to input', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, FILE_UPLOAD_STORIES.acceptPdfDoc));
      await expect(getByTestId(TEST_IDS.fileUpload.root)).toHaveAttribute('accept', '.pdf,.doc');
    });

    test('input is of type=file', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await expect(getByTestId(TEST_IDS.fileUpload.root)).toHaveAttribute('type', 'file');
    });
  });
});
