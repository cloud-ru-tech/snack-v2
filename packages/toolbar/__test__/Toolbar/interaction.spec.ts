import { LAYOUT_TYPE } from '@ds/utils';

import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TOOLBAR_COMPONENT_TEST_IDS } from './helpers';

test.describe('Toolbar — interaction', () => {
  // Browser-only: outside-click по координатам страницы закрывает портальный Droplist «Ещё».
  // Эквивалента в Storybook play нет — InteractionTest не покрывает more-actions.
  test('closes more-actions droplist on outside click (portal-aware)', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(buildStoryOptions({ showMoreActions: true }));

    await getByTestId(TOOLBAR_COMPONENT_TEST_IDS.moreActionsButton).click();
    await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.droplist)).toBeVisible();

    await page.mouse.click(5, 5);
    await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.droplist)).toBeHidden();
  });

  // Browser-only: mobile overflow в BottomSheet — закрытие по клику вне портала.
  test('closes mobile more-actions bottom sheet on outside click', async ({ gotoStory, getByTestId, page }) => {
    await gotoStory(
      buildStoryOptions({
        layoutType: LAYOUT_TYPE.Mobile,
        showRefresh: true,
        showMoreActions: true,
        showExtraSlot: true,
      }),
    );

    await getByTestId(TOOLBAR_COMPONENT_TEST_IDS.moreActionsButton).click();
    await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.refreshOption)).toBeVisible();

    await page.mouse.click(5, 5);
    await expect(getByTestId(TOOLBAR_COMPONENT_TEST_IDS.refreshOption)).toBeHidden();
  });
});
