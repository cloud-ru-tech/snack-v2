import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';
import { buildStoryOptions, TEST_IDS } from './helpers';

test.describe('CardBanner — rendering', () => {
  test('renders with default props', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.cardBanner)).toBeVisible();
  });

  // Playground story has onClose: fn() in its args by default.
  test('onClose provided (story default) → close button renders on hover', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await getByTestId(TEST_IDS.cardBanner).hover();
    await expect(getByTestId(COMPONENT_TEST_IDS.cardBannerClose)).toBeVisible();
  });

  test('disabled → data-disabled="true"', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions({ disabled: true }));
    await expect(getByTestId(TEST_IDS.cardBanner)).toHaveAttribute('data-disabled', 'true');
  });
});
