import { expect, test } from '../../../playwright/fixtures';

const PROGRESS_TEST_ID = 'progress-bar-page-test';

const story = {
  story: 'playground',
  name: 'progressbarpage',
  group: 'progressbar',
};

const props = {
  'data-test-id': PROGRESS_TEST_ID,
};

test.describe('ProgressBarPage', () => {
  test('Rendered when enabled', async ({ getByTestId, gotoStory }) => {
    await gotoStory({ ...story, props });

    await expect(getByTestId(PROGRESS_TEST_ID)).toBeVisible();
  });

  test('Not rendered when disabled', async ({ getByTestId, gotoStory }) => {
    await gotoStory({ ...story, props: { ...props, inProgress: 'false' } });

    await expect(getByTestId(PROGRESS_TEST_ID)).not.toBeVisible();
  });
});
