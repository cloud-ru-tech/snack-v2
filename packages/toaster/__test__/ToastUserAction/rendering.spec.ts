import { expect, test } from '#playwright-tooling/fixtures';

import { TOAST_USER_ACTION_APPEARANCE } from '../../src/components/ToastUserAction/constants';
import { buildStoryOptions, USER_ACTION_LINK_TEST_ID, USER_ACTION_TEST_ID, USER_ACTION_TIMER_TEST_ID } from './helpers';

test.describe('ToastUserAction — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(USER_ACTION_TEST_ID)).toBeVisible();
  });

  test('renders label text', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ label: 'Done' }));
    await expect(getByTestId(USER_ACTION_TEST_ID)).toContainText('Done');
  });

  for (const appearance of Object.values(TOAST_USER_ACTION_APPEARANCE)) {
    test(`appearance=${appearance}`, async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ appearance }));
      await expect(getByTestId(USER_ACTION_TEST_ID)).toHaveAttribute('data-appearance', appearance);
    });
  }

  test('action slot is rendered when provided', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ action: 'labelOnly' }));
    await expect(getByTestId(USER_ACTION_LINK_TEST_ID)).toBeVisible();
  });

  test('timer=true renders timer SVG ring', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ timer: true }));
    await expect(getByTestId(USER_ACTION_TIMER_TEST_ID)).toBeVisible();
  });

  test('timer=false hides timer', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ timer: false }));
    await expect(getByTestId(USER_ACTION_TIMER_TEST_ID)).toHaveCount(0);
  });
});
