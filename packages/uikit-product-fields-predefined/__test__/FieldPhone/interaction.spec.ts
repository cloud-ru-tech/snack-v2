import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, TEST_IDS } from './helpers';

// Portal open/close — browser-specific (click-outside / Escape закрытие портала),
// невыразимо в Storybook play. См. e2e-testing-standard.md §interaction.spec.
// У дроплиста @ds/list нет test-id на контейнере; «открыт» детектим по элементу
// страны по умолчанию (Россия) — он всегда присутствует, когда список открыт.
const RUSSIA_ITEM_TEST_ID = 'list__base-item_russia';

test.describe('FieldPhone — interaction', () => {
  test('opens the country droplist on trigger click', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await getByTestId(TEST_IDS.fieldPhoneCountrySelect).click();
    await expect(page.getByTestId(RUSSIA_ITEM_TEST_ID)).toBeVisible();
  });

  test('closes the country droplist on Escape', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await getByTestId(TEST_IDS.fieldPhoneCountrySelect).click();
    const item = page.getByTestId(RUSSIA_ITEM_TEST_ID);
    await expect(item).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(item).toBeHidden();
  });

  test('closes the country droplist on outside click', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions());

    await getByTestId(TEST_IDS.fieldPhoneCountrySelect).click();
    const item = page.getByTestId(RUSSIA_ITEM_TEST_ID);
    await expect(item).toBeVisible();

    // Клик в пустую область вне портала.
    await page.mouse.click(5, 5);
    await expect(item).toBeHidden();
  });
});
