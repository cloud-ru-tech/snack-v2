import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, DROPZONE_STORIES, TEST_IDS } from './helpers';

const SIZE_COMBOS = ['s', 'm', 'l'] as const;

test.describe('Dropzone — rendering', () => {
  test('renders root', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.dropzone.root)).toBeVisible();
  });

  test('hidden file input is present', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.dropzone.nativeInput)).toBeAttached();
  });

  test.describe('props propagation', () => {
    for (const size of SIZE_COMBOS) {
      test(`size=${size} → data-size`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ size }));
        await expect(getByTestId(TEST_IDS.dropzone.root)).toHaveAttribute('data-size', size);
      });
    }

    test('disabled → data-disabled + native disabled', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ disabled: true }));
      const root = getByTestId(TEST_IDS.dropzone.root);
      await expect(root).toHaveAttribute('data-disabled', 'true');
      await expect(root).toBeDisabled();
    });

    test('mode=single → input without multiple', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ mode: 'single' }));
      await expect(getByTestId(TEST_IDS.dropzone.nativeInput)).not.toHaveAttribute('multiple', /.*/);
    });

    test('mode=multiple → input with multiple', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ mode: 'multiple' }));
      await expect(getByTestId(TEST_IDS.dropzone.nativeInput)).toHaveAttribute('multiple', '');
    });

    test('accept propagates to input', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(undefined, DROPZONE_STORIES.acceptImage));
      await expect(getByTestId(TEST_IDS.dropzone.nativeInput)).toHaveAttribute('accept', 'image/*');
    });
  });
});
