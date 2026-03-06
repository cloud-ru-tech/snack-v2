import { expect, test } from '../../../playwright/fixtures';
import { SIZE } from '../src/constants';
import { dropzoneStoryProps, fileUploadStoryProps, hiddenDropZoneStoryProps, TEST_IDS } from './helpers';

test.describe('Dropzone', () => {
  test('should render with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(dropzoneStoryProps());

    const dropzone = getByTestId(TEST_IDS.dropzone);
    await expect(dropzone).toBeVisible();
  });

  test('should display slot content', async ({ gotoStory, page }) => {
    await gotoStory(dropzoneStoryProps());

    await expect(page.getByText('# slot content')).toBeVisible();
  });

  test.describe('Sizes', () => {
    for (const size of Object.values(SIZE)) {
      test(`should render with size ${size}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(dropzoneStoryProps({ size }));

        const dropzone = getByTestId(TEST_IDS.dropzone);
        await expect(dropzone).toBeVisible();
        await expect(dropzone).toHaveAttribute('data-size', size);
      });
    }
  });

  test('should render in disabled state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(dropzoneStoryProps({ disabled: true }));

    const dropzone = getByTestId(TEST_IDS.dropzone);
    await expect(dropzone).toBeVisible();
    await expect(dropzone).toHaveAttribute('data-disabled');
    await expect(dropzone).toBeDisabled();
  });

  test('should upload file via file input', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(dropzoneStoryProps());

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: 'test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('test content'),
    });

    const filesList = getByTestId(TEST_IDS.filesList);
    await expect(filesList).toBeVisible();
    await expect(filesList).toHaveText(/test\.txt/);
  });
});

test.describe('FileUpload', () => {
  test('should render with default props', async ({ gotoStory, page }) => {
    await gotoStory(fileUploadStoryProps());

    const button = page.getByRole('button', { name: /загрузить/i });
    await expect(button).toBeVisible();
  });

  test('should have file input in DOM', async ({ gotoStory, getByTestId }) => {
    await gotoStory(fileUploadStoryProps());

    const fileInput = getByTestId(TEST_IDS.fileUpload);
    await expect(fileInput).toBeAttached();
  });

  test('should upload file via input', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(fileUploadStoryProps());

    const fileInput = page.locator('input[type="file"]').first();
    await fileInput.setInputFiles({
      name: 'fileupload-test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('test'),
    });

    const filesList = getByTestId(TEST_IDS.filesList);
    await expect(filesList).toBeVisible();
    await expect(filesList).toHaveText(/fileupload-test\.txt/);
  });
});

test.describe('HiddenDropZone', () => {
  test('should render with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(hiddenDropZoneStoryProps());

    const wrapper = getByTestId(TEST_IDS.hiddenDropZone);
    await expect(wrapper).toBeVisible();
  });

  test('should display form content', async ({ gotoStory, getByTestId }) => {
    await gotoStory(hiddenDropZoneStoryProps());

    const formCard = getByTestId('hidden-dropzone-form');
    await expect(formCard).toBeVisible();
    await expect(formCard.getByLabel(/имя/i)).toBeVisible();
    await expect(formCard.getByLabel(/фамилия/i)).toBeVisible();
  });

  test('should render in disabled state', async ({ gotoStory, getByTestId }) => {
    await gotoStory(hiddenDropZoneStoryProps({ disabled: true }));

    const wrapper = getByTestId(TEST_IDS.hiddenDropZone);
    await expect(wrapper).toBeVisible();
  });

  test('should upload file when overlay is shown', async ({ gotoStory, getByTestId }) => {
    await gotoStory(hiddenDropZoneStoryProps({ _storybookForceOver: true }));

    const wrapper = getByTestId(TEST_IDS.hiddenDropZone);
    const fileInput = wrapper.locator('input[type="file"]');
    await expect(fileInput).toBeAttached();
    await fileInput.setInputFiles({
      name: 'hidden-dropzone-test.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('test'),
    });

    const filesList = getByTestId(TEST_IDS.filesList);
    await expect(filesList).toBeVisible();
    await expect(filesList).toHaveText(/hidden-dropzone-test\.txt/);
  });
});
