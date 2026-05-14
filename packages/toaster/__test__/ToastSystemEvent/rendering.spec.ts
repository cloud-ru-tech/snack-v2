import { expect, test } from '#playwright-tooling/fixtures';

import { TOAST_SYSTEM_EVENT_APPEARANCE } from '../../src/components/ToastSystemEvent/constants';
import {
  buildStoryOptions,
  SYSTEM_EVENT_BUTTON_ACTION_TEST_ID,
  SYSTEM_EVENT_BUTTON_CLOSE_TEST_ID,
  SYSTEM_EVENT_LINK_TEST_ID,
  SYSTEM_EVENT_PROGRESS_BAR_TEST_ID,
  SYSTEM_EVENT_TEST_ID,
} from './helpers';

test.describe('ToastSystemEvent — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await expect(getByTestId(SYSTEM_EVENT_TEST_ID)).toBeVisible();
    });

    test('renders title text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ title: 'Custom title' }));
      await expect(getByTestId(SYSTEM_EVENT_TEST_ID)).toContainText('Custom title');
    });

    test('renders description text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ description: 'Custom description' }));
      await expect(getByTestId(SYSTEM_EVENT_TEST_ID)).toContainText('Custom description');
    });
  });

  test.describe('props propagation', () => {
    for (const appearance of Object.values(TOAST_SYSTEM_EVENT_APPEARANCE)) {
      test(`appearance=${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ appearance }));
        await expect(getByTestId(SYSTEM_EVENT_TEST_ID)).toHaveAttribute('data-appearance', appearance);
      });
    }
  });

  test.describe('slots', () => {
    test('closable=true renders close button', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ closable: true }));
      await expect(getByTestId(SYSTEM_EVENT_BUTTON_CLOSE_TEST_ID)).toBeVisible();
    });

    test('closable=false hides close button', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ closable: false }));
      await expect(getByTestId(SYSTEM_EVENT_BUTTON_CLOSE_TEST_ID)).toHaveCount(0);
    });

    test('progressBar=true with autoClose renders progress', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ progressBar: true, autoClose: 5000 }));
      await expect(getByTestId(SYSTEM_EVENT_PROGRESS_BAR_TEST_ID)).toBeVisible();
    });

    test('progressBar=false hides progress (даже при autoClose)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ progressBar: false, autoClose: 5000 }));
      await expect(getByTestId(SYSTEM_EVENT_PROGRESS_BAR_TEST_ID)).toHaveCount(0);
    });

    test('link=withHref renders link slot', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ link: 'withHref' }));
      await expect(getByTestId(SYSTEM_EVENT_LINK_TEST_ID)).toBeVisible();
    });

    test('action=twoPrimarySecondary renders two action buttons', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ action: 'twoPrimarySecondary' }));
      await expect(getByTestId(SYSTEM_EVENT_BUTTON_ACTION_TEST_ID)).toHaveCount(2);
    });
  });
});
