import { expect, test } from '#playwright-tooling/fixtures';

import { buildStoryOptions, COMFORT_DENSITY_GLOBALS, TABLE_STORIES, TEST_IDS } from './helpers';

// Escape закрывает портальные droplist'ы / mobile BottomSheet — сценарии из
// закрытого списка keyboard.spec (e2e-testing-standard §keyboard.spec.ts п.3).
// Клик по option / сортировка / поиск — в Table.InteractionTest::play.

const COMPONENT = TEST_IDS.component;

test.describe('Table — keyboard', () => {
  test('Escape closes column settings droplist and returns focus to trigger', async ({
    gotoStory,
    page,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions());
    const trigger = getByTestId(COMPONENT.columnSettings.trigger);
    await trigger.click();

    const droplist = getByTestId(COMPONENT.columnSettings.droplist);
    await expect(droplist).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(droplist).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });

  test('Escape closes row actions droplist and returns focus to trigger', async ({ gotoStory, page, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.rowActions));
    const trigger = getByTestId(COMPONENT.rowActions.droplistTrigger).first();
    await trigger.click();

    const droplist = getByTestId(COMPONENT.rowActions.droplist);
    await expect(droplist).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(droplist).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });

  test('Escape closes mobile column settings bottom sheet', async ({ gotoStory, page, getByTestId }) => {
    // showSorting=false — единственный after-слот в overflow: column settings (index 0).
    // Иначе sort + settings монтируют два BottomSheet с одним test-id `bottom-sheet`.
    await gotoStory(
      buildStoryOptions(
        { layoutType: 'mobile', showSorting: false },
        TABLE_STORIES.playground,
        COMFORT_DENSITY_GLOBALS,
      ),
    );

    await getByTestId(TEST_IDS.toolbar.moreActionsButton).click();
    // export в after-слоте — index 0; column settings — index 1 (showSorting=false).
    await getByTestId(`${TEST_IDS.toolbar.afterOption}__1`).click();

    const columnSettings = getByTestId(COMPONENT.columnSettings.droplist);
    await expect(columnSettings).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(columnSettings).not.toBeVisible();
  });
});
