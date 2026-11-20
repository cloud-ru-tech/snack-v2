import { MOBILE_VIEWPORT } from '#playwright-tooling/constants/common';
import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';
import { buildStoryOptions, CARD_SERVICE_LIGHT_STORIES, TEST_IDS } from './helpers';

test.describe('CardServiceLight — rendering', () => {
  test('favorite toggle shows a tooltip on desktop', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, CARD_SERVICE_LIGHT_STORIES.interactionTest));
    await expect(getByTestId(TEST_IDS.cardServiceLight)).toBeVisible();
    await getByTestId(COMPONENT_TEST_IDS.cardServiceLightFavorite).click();
    await expect(page.getByRole('tooltip')).toBeVisible();
  });

  // Мобильной ветки у карточки нет: мастер `cardServiceLightMobile` из макета удалён, а размеры
  // на mobile даёт платформа темы. Тест сторожит, чтобы ветка по раскладке не вернулась.
  test('mobile layout renders the same container and toggles favorite without a tooltip', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(
      buildStoryOptions({ actionsVisibility: 'always' }, CARD_SERVICE_LIGHT_STORIES.playground, {
        layoutType: 'mobile',
      }),
    );
    await expect(getByTestId(TEST_IDS.cardServiceLight)).toBeVisible();
    await expect(getByTestId(TEST_IDS.cardServiceLight).locator('[data-mobile]')).toHaveCount(0);

    const favorite = getByTestId(COMPONENT_TEST_IDS.cardServiceLightFavorite);
    await favorite.click();
    await expect(favorite).toHaveAttribute('aria-pressed', 'true');
    await expect(page.getByRole('tooltip')).toHaveCount(0);
  });
});
