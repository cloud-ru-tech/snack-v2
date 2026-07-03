import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';
import { buildStoryOptions, CARD_SERVICE_LIGHT_STORIES, TEST_IDS } from './helpers';

test.describe('CardServiceLight — rendering', () => {
  test('favorite.enabled=true → favourite toggle renders', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, CARD_SERVICE_LIGHT_STORIES.interactionTest));
    await expect(getByTestId(TEST_IDS.cardServiceLight)).toBeVisible();
    await expect(getByTestId(COMPONENT_TEST_IDS.cardServiceLightFavorite)).toBeVisible();
  });
});
