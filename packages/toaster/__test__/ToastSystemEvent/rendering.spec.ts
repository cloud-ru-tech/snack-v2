import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, SYSTEM_EVENT_APPEARANCE_KEY_VALUES, TEST_IDS } from './helpers';

test.describe('ToastSystemEvent — rendering', () => {
  test.describe('render', () => {
    test('renders with default props', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions());
      await expect(getByTestId(TEST_IDS.systemEventRoot)).toBeVisible();
    });

    test('renders title text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ title: 'Custom title' }));
      await expect(getByTestId(TEST_IDS.systemEventRoot)).toContainText('Custom title');
    });

    test('renders description text', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ description: 'Custom description' }));
      await expect(getByTestId(TEST_IDS.systemEventRoot)).toContainText('Custom description');
    });
  });

  test.describe('props propagation', () => {
    // Параметризация по ключевой выборке appearance — по 1 представителю
    // neutral/success/errorCritical. Полный набор — в VisualMatrix.
    for (const appearance of SYSTEM_EVENT_APPEARANCE_KEY_VALUES) {
      test(`appearance=${appearance}`, async ({ gotoStory, getByTestId }) => {
        await gotoStory(buildStoryOptions({ appearance }));
        await expect(getByTestId(TEST_IDS.systemEventRoot)).toHaveAttribute('data-appearance', appearance);
      });
    }
  });

  test.describe('slots', () => {
    test('closable=true renders close button', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ closable: true }));
      await expect(getByTestId(TEST_IDS.systemEventButtonClose)).toBeVisible();
    });

    test('closable=false hides close button', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ closable: false }));
      await expect(getByTestId(TEST_IDS.systemEventButtonClose)).toHaveCount(0);
    });

    test('progressBar=true with autoClose renders progress', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ progressBar: true, autoClose: 5000 }));
      await expect(getByTestId(TEST_IDS.systemEventProgressBar)).toBeVisible();
    });

    test('progressBar=false hides progress (даже при autoClose)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ progressBar: false, autoClose: 5000 }));
      await expect(getByTestId(TEST_IDS.systemEventProgressBar)).toHaveCount(0);
    });

    test('link=withHref renders link slot', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ link: 'withHref' }));
      await expect(getByTestId(TEST_IDS.systemEventLink)).toBeVisible();
    });

    test('action=twoPrimarySecondary renders two action buttons', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions({ action: 'twoPrimarySecondary' }));
      await expect(getByTestId(TEST_IDS.systemEventButtonAction)).toHaveCount(2);
    });
  });
});
