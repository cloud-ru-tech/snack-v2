import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';
import { buildStoryOptions, CARD_SERVICE_LIGHT_STORIES, TEST_IDS } from './helpers';

test.describe('CardServiceLight — rendering', () => {
  test('favorite.enabled=true → favourite toggle renders', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, CARD_SERVICE_LIGHT_STORIES.interactionTest));
    await expect(getByTestId(TEST_IDS.cardServiceLight)).toBeVisible();
    await expect(getByTestId(COMPONENT_TEST_IDS.cardServiceLightFavorite)).toBeVisible();
  });

  test('desktop container has no data-mobile', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await expect(getByTestId(TEST_IDS.cardServiceLight).locator('[data-mobile]')).toHaveCount(0);
  });

  test('mobile container sets data-mobile', async ({ page, gotoStory, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions(undefined, CARD_SERVICE_LIGHT_STORIES.playground, { layoutType: 'mobile' }));
    await expect(getByTestId(TEST_IDS.cardServiceLight).locator('[data-mobile]')).toHaveAttribute(
      'data-mobile',
      'true',
    );
  });
});
