import { Page } from '@playwright/test';

import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertVisualMatrixSnapshot,
  composeScreenshots,
  dataTestIdSelector,
  ScreenshotCell,
  screenshotRegion,
  screenshotWithPadding,
  waitForStableBbox,
} from '#playwright-tooling/utils';

import {
  buildStoryOptions,
  getPageNumberTestId,
  headerCellById,
  MOBILE_COMFORT_GLOBALS,
  TABLE_STORIES,
  TEST_IDS,
} from './helpers';

/** Локальные копии test-id из `@ds/chips` — без импорта пакета (CSS в playwright-compile). */
const CHIP_CHOICE_TEST_IDS = {
  droplist: 'chip-choice__droplist',
} as const;

/** Story Filters: id чипа роли на корне триггера ChipChoice */
const FILTER_CHIP_ROLE_TEST_ID = 'table-filter-role';

// Снимки за пределами VM — только то, что статикой не выразить:
// - row-states.png — клиентские состояния строки (hover/selected); классический
//   interaction-states.png не заводится: у строки нет :focus-visible на корне;
// - sorted-before-after.png — before/after ключевой XL-интеракции (sort);
// - open-row-actions.png / open-column-settings.png — портальные droplist'ы,
//   в StoryTable-ячейке VM их не открыть;
// - filters-row.png — filter-row тулбара (chips columnFilters), в VM нет.
// - mobile-sticky-controls-offset.png — mobile sticky chrome при скролле страницы
//   (toolbar/pagination с offsetTop/offsetBottom), в VM нет.

const COMPONENT = TEST_IDS.component;
const INTERACTION_PADDING = 8;
const PORTAL_PADDING = 16;

/** Строк на странице в StickyControlsOffset (pageSize=20) — меньше не скроллится. */
const MOBILE_STICKY_CONTROLS_PAGE_SIZE = 20;

// DEFAULT_PAGE_SIZE таблицы — конечное число строк Filters story после play
const FILTERS_PAGE_SIZE = 10;

/**
 * Storybook автозапускает play-функцию story при загрузке iframe. Для story
 * с мутирующим play (Filters: фильтрация → сброс) ждём фазу `completed` у всех
 * текущих render'ов, чтобы кадр не поймал промежуточное состояние. При
 * недоступности приватного API — fallback на state-based ожидание в тесте.
 */
async function waitForStoryPlayCompletion(page: Page): Promise<void> {
  await page
    .waitForFunction(
      () => {
        const preview = (window as unknown as { __STORYBOOK_PREVIEW__?: { storyRenders?: Array<{ phase?: string }> } })
          .__STORYBOOK_PREVIEW__;
        const renders = preview?.storyRenders ?? [];
        return (
          renders.length > 0 &&
          renders.every(render => ['completed', 'errored', 'aborted'].includes(render.phase ?? ''))
        );
      },
      { timeout: 30_000 },
    )
    .catch(() => {});
}

test.describe('Table — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.visualMatrix));
    await waitForFonts();
    // Секция loading (полный skeleton при data=[]): ждём скелетон именно в ней.
    // `.first()` по всей странице ловит tail из «infinite loading» ниже по DOM и маскирует
    // пустой кадр, если full-load skeleton ещё не отрисован.
    const loadingSection = page.locator(`[data-test-id="${TEST_IDS.visualMatrix.loadingSection}"]`);
    await expect(loadingSection.getByTestId(TEST_IDS.component.loadingCellSkeleton).first()).toBeVisible();
    await assertVisualMatrixSnapshot(page);
  });

  test('row states (default × hover × selected)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    const firstRow = getByTestId(COMPONENT.bodyRow).first();
    await expect(firstRow).toBeVisible();
    await waitForStableBbox(firstRow);

    const cells: ScreenshotCell[] = [];

    await page.mouse.move(0, 0);
    cells.push({
      label: 'default',
      png: await screenshotWithPadding(page, firstRow, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS),
    });

    await firstRow.hover();
    cells.push({
      label: 'hover',
      png: await screenshotWithPadding(page, firstRow, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS),
    });

    await firstRow.locator(dataTestIdSelector(COMPONENT.rowSelect)).click();
    await expect(firstRow).toHaveAttribute('data-selected', 'true');
    await page.mouse.move(0, 0);
    cells.push({
      label: 'selected',
      png: await screenshotWithPadding(page, firstRow, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS),
    });

    const composite = await composeScreenshots(cells, { layout: 'col' });
    expect(composite).toMatchSnapshot('row-states.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('sorted column (before/after header click)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    const headerRow = getByTestId(COMPONENT.headerRow);
    const rows = getByTestId(COMPONENT.bodyRow);
    await expect(rows.first()).toBeVisible();
    // кадр — шапка + первые три строки: видно и индикатор, и перестановку строк
    const frame = [headerRow, rows.nth(0), rows.nth(1), rows.nth(2)];

    await page.mouse.move(0, 0);
    const before = await screenshotRegion(page, frame, INTERACTION_PADDING);

    const amountHeader = headerCellById(page, 'amount');
    await amountHeader.click();
    // первый клик по числовой колонке — desc (tanstack sortDescFirst для number):
    // первой становится строка с максимальным amount=23400 (u-9)
    await expect(rows.first()).toHaveAttribute('data-row-id', 'u-9');
    await expect(amountHeader.locator(dataTestIdSelector(COMPONENT.headerSortIndicator))).toBeVisible();
    await page.mouse.move(0, 0);
    const after = await screenshotRegion(page, frame, INTERACTION_PADDING);

    const composite = await composeScreenshots(
      [
        { label: 'before (unsorted)', png: before },
        { label: 'after (sorted by amount desc)', png: after },
      ],
      { layout: 'col' },
    );
    expect(composite).toMatchSnapshot('sorted-before-after.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('open row actions droplist', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.rowActions));
    await waitForFonts();

    const trigger = getByTestId(COMPONENT.rowActions.droplistTrigger).first();
    await trigger.click();
    const droplist = getByTestId(COMPONENT.rowActions.droplist);
    await expect(droplist).toBeVisible();

    // кадр = строка-владелец + портальный контент: видно позиционирование
    // droplist'а относительно триггера
    const png = await screenshotRegion(page, [getByTestId(COMPONENT.bodyRow).first(), droplist], PORTAL_PADDING);
    expect(png).toMatchSnapshot('open-row-actions.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('open column settings menu', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    // columnsSettings.enableSettingsMenu включён в args Playground'а
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    const trigger = getByTestId(COMPONENT.columnSettings.trigger);
    await trigger.click();
    const droplist = getByTestId(COMPONENT.columnSettings.droplist);
    await expect(droplist).toBeVisible();

    const png = await screenshotRegion(page, [trigger, droplist], PORTAL_PADDING);
    expect(png).toMatchSnapshot('open-column-settings.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('column settings menu — show all', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    const trigger = getByTestId(COMPONENT.columnSettings.trigger);
    await trigger.click();
    const droplist = getByTestId(COMPONENT.columnSettings.droplist);
    await expect(droplist).toBeVisible();

    // Часть колонок скрыта по умолчанию (DefaultFalse), поэтому кнопка показывает «Show all»
    const bulkBtn = page.locator(dataTestIdSelector(TEST_IDS.list.bulkSelectButton));
    await expect(bulkBtn).toHaveText('Show all');
    await bulkBtn.click();
    // После «Show all» все колонки включены — кнопка переключается на «Hide all»
    await expect(bulkBtn).toHaveText('Hide all');

    const png = await screenshotRegion(page, [trigger, droplist], PORTAL_PADDING);
    expect(png).toMatchSnapshot('open-column-settings-show-all.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('filters row in toolbar', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.filters));
    await waitForFonts();
    // play Filters story мутирует фильтры и сбрасывает их в конце
    await waitForStoryPlayCompletion(page);
    await expect(getByTestId(COMPONENT.bodyRow)).toHaveCount(FILTERS_PAGE_SIZE);

    // filter-row (чипы columnFilters) рендерится внутри тулбара — кадр по нему
    const toolbar = getByTestId(COMPONENT.toolbar);
    await waitForStableBbox(toolbar);
    const png = await screenshotWithPadding(page, toolbar, PORTAL_PADDING, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('filters-row.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Mobile chrome: composite filter-row + открытый droplist чипа (как CalendarDropdown visual-matrix).
  test('mobile filters and filter droplist (composite)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions({}, TABLE_STORIES.filters, MOBILE_COMFORT_GLOBALS));
    await waitForFonts();
    await waitForStoryPlayCompletion(page);

    const toolbar = getByTestId(COMPONENT.toolbar);
    await waitForStableBbox(toolbar);

    const cells: ScreenshotCell[] = [
      {
        label: 'filter row',
        png: await screenshotWithPadding(page, toolbar, PORTAL_PADDING, SCREENSHOT_DEFAULT_OPTS),
      },
    ];

    const filterTrigger = getByTestId(FILTER_CHIP_ROLE_TEST_ID);
    await filterTrigger.click();
    const droplist = getByTestId(CHIP_CHOICE_TEST_IDS.droplist);
    await expect(droplist).toBeVisible();
    cells.push({
      label: 'role filter droplist',
      png: await screenshotRegion(page, [filterTrigger, droplist], PORTAL_PADDING),
    });
    await page.keyboard.press('Escape');
    await expect(droplist).toHaveCount(0);

    const composite = await composeScreenshots(cells, { layout: 'col' });
    expect(composite).toMatchSnapshot('mobile-filters-droplist.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Mobile surface-swap: column settings в BottomSheet — full-viewport (visual-regression-standard §portal).
  test('open-mobile column settings bottom sheet', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions({ showSorting: false }, TABLE_STORIES.playground, MOBILE_COMFORT_GLOBALS));
    await waitForFonts();

    await getByTestId(TEST_IDS.toolbar.moreActionsButton).click();
    await getByTestId(`${TEST_IDS.toolbar.afterOption}__1`).click();

    const sheet = getByTestId(COMPONENT.columnSettings.droplist);
    await expect(sheet).toBeVisible();
    await waitForStableBbox(sheet);

    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile-column-settings.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });

  // Mobile stickyControls: toolbar и pagination липнут с offsetTop/offsetBottom (mock app chrome).
  test('mobile sticky controls with offsets (composite)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions({}, TABLE_STORIES.stickyControlsOffset, MOBILE_COMFORT_GLOBALS));
    await waitForFonts();

    const root = getByTestId(TEST_IDS.table.root);
    await expect(root).toHaveAttribute('data-sticky-controls', 'true');
    await expect(root).toHaveAttribute('data-layout-type', 'mobile');
    const rows = getByTestId(COMPONENT.bodyRow);
    await expect(rows.first()).toBeVisible();
    await expect(rows).toHaveCount(MOBILE_STICKY_CONTROLS_PAGE_SIZE);
    await expect(getByTestId(getPageNumberTestId(2))).toBeVisible();
    await waitForStableBbox(root);

    const cells: ScreenshotCell[] = [
      {
        label: 'top of page',
        png: await page.screenshot(SCREENSHOT_DEFAULT_OPTS),
      },
    ];

    await rows.nth(MOBILE_STICKY_CONTROLS_PAGE_SIZE - 5).scrollIntoViewIfNeeded();
    await waitForStableBbox(getByTestId(COMPONENT.toolbar));
    cells.push({
      label: 'scrolled (sticky toolbar + pagination)',
      png: await page.screenshot(SCREENSHOT_DEFAULT_OPTS),
    });

    const composite = await composeScreenshots(cells, { layout: 'col' });
    expect(composite).toMatchSnapshot('mobile-sticky-controls-offset.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('fullWidth comparison (full vs fit-content)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, TABLE_STORIES.fullWidth));
    await waitForFonts();

    const fullRoot = getByTestId(`${TEST_IDS.table.root}-full`);
    const fitRoot = getByTestId(`${TEST_IDS.table.root}-fit`);
    await expect(fullRoot).toBeVisible();
    await expect(fitRoot).toBeVisible();
    await expect(fullRoot).not.toHaveAttribute('data-fit-content');
    await expect(fitRoot).toHaveAttribute('data-fit-content', 'true');
    await waitForStableBbox(fullRoot);
    await waitForStableBbox(fitRoot);

    const composite = await composeScreenshots(
      [
        {
          label: 'fullWidth=true',
          png: await screenshotWithPadding(page, fullRoot, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS),
        },
        {
          label: 'fullWidth=false',
          png: await screenshotWithPadding(page, fitRoot, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS),
        },
      ],
      { layout: 'col' },
    );
    expect(composite).toMatchSnapshot('full-width-comparison.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
