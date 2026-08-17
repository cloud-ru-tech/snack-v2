import { expect, test } from '#playwright-tooling/fixtures';

import { TEST_IDS as INTERNAL_TEST_IDS } from '../../src/constants';
import { buildStoryOptions, DROPLIST_STORIES, itemTestId, SEARCH_INPUT_TEST_ID, TEST_IDS } from './helpers';

// Фокус-флоу: ArrowDown на триггере → search-поле/список,
// ArrowUp/Down между search и item'ами. Фокус возвращается на триггер при закрытии по Escape
// и по клику на item; при outside-click фокус на триггер НЕ возвращается (см. тесты ниже).

test.describe('Droplist — keyboard / focus flow', () => {
  test('ArrowDown on trigger opens droplist and focuses the search field', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, DROPLIST_STORIES.search));

    await getByTestId(TEST_IDS.droplist.triggerOpen).focus();
    await page.keyboard.press('ArrowDown');

    await expect(getByTestId(INTERNAL_TEST_IDS.searchItem)).toBeVisible();
    await expect(getByTestId(SEARCH_INPUT_TEST_ID)).toBeFocused();
  });

  test('focus moves search → items → back to search', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, DROPLIST_STORIES.search));
    await getByTestId(TEST_IDS.droplist.triggerOpen).focus();
    await page.keyboard.press('ArrowDown');

    const searchInput = getByTestId(SEARCH_INPUT_TEST_ID);
    await expect(searchInput).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(getByTestId(itemTestId('overview'))).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(getByTestId(itemTestId('analytics'))).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(getByTestId(itemTestId('overview'))).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(searchInput).toBeFocused();
  });

  test('typing in the search field filters items', async ({ gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, DROPLIST_STORIES.search));
    await getByTestId(TEST_IDS.droplist.triggerOpen).click();

    await getByTestId(SEARCH_INPUT_TEST_ID).fill('bil');

    await expect(getByTestId(itemTestId('billing'))).toBeVisible();
    await expect(getByTestId(itemTestId('overview'))).toHaveCount(0);
  });

  test('Escape closes and returns focus to the trigger', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, DROPLIST_STORIES.search));
    const trigger = getByTestId(TEST_IDS.droplist.triggerOpen);
    await trigger.click();
    await expect(getByTestId(INTERNAL_TEST_IDS.searchItem)).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(getByTestId(INTERNAL_TEST_IDS.searchItem)).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test('outside click closes without stealing focus back to the trigger', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, DROPLIST_STORIES.search));
    const trigger = getByTestId(TEST_IDS.droplist.triggerOpen);
    await trigger.click();
    await expect(getByTestId(INTERNAL_TEST_IDS.searchItem)).toBeVisible();

    await page.mouse.click(5, 5);
    await expect(getByTestId(INTERNAL_TEST_IDS.searchItem)).toHaveCount(0);
    await expect(trigger).not.toBeFocused();
  });

  // closeDroplistOnItemClick проверяется в `tests/Droplist.InteractionTest.stories.tsx::play`
  // (гоняется через `pnpm test:stories`) — дубль здесь не нужен.

  // renderFnTrigger: children как render-функция `({ onKeyDown }) => ReactNode`. Потребитель
  // прокидывает onKeyDown в свой триггер, и клавиатурное открытие (ArrowDown с фокуса) работает.
  test('render-fn trigger opens via onKeyDown (ArrowDown) from focus', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, DROPLIST_STORIES.renderFnTrigger));

    await getByTestId(TEST_IDS.droplist.renderFnTrigger).focus();
    await page.keyboard.press('ArrowDown');

    await expect(getByTestId(itemTestId('overview'))).toBeVisible();
  });

  // Controlled open: родитель владеет state через open + onOpenChange. Внешняя кнопка открывает
  // список (контролируемый open долетает до UI), Escape закрывает через onOpenChange→parent.
  // (Закрытие тем же внешним кликом конфликтует с outsideClick дропдауна — это не проверяем.)
  test('controlled: external button opens the droplist, Escape closes it via onOpenChange', async ({
    gotoStory,
    page,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(undefined, DROPLIST_STORIES.controlled));

    await getByTestId(TEST_IDS.droplist.controlledClose).click();
    await expect(getByTestId(itemTestId('overview'))).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(getByTestId(itemTestId('overview'))).toHaveCount(0);
  });
});
