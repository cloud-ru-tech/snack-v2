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
    // Mobile-дефолт вида — cards (TABLE_LAYOUT_PRESETS.mobile); column settings доступен и там.
    await gotoStory(buildStoryOptions({ layoutType: 'mobile' }, TABLE_STORIES.playground, COMFORT_DENSITY_GLOBALS));

    // Mobile: слоты `after` уезжают в more-actions overflow. На cards собранный порядок —
    // [export, sorting, columnSettings], значит column settings — afterOption__2.
    await getByTestId(TEST_IDS.toolbar.moreActionsButton).click();
    await getByTestId(`${TEST_IDS.toolbar.afterOption}__2`).click();

    const columnSettings = getByTestId(COMPONENT.columnSettings.droplist);
    await expect(columnSettings).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(columnSettings).not.toBeVisible();
  });
});
