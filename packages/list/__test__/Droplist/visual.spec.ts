import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  SCREENSHOT_DEFAULT_OPTS,
  STORYBOOK_ROOT_SELECTOR,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertVisualMatrixSnapshot,
  composeScreenshots,
  ScreenshotCell,
  screenshotRegion,
} from '#playwright-tooling/utils';

import { buildStoryOptions, DROPLIST_STORIES, LIST_INTERNAL_TEST_IDS, TEST_IDS } from './helpers';

test.describe('Droplist — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, DROPLIST_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Прогрессивное раскрытие next-list: open → +L1 (Workspace) → +L2 (Projects).
  test('expansion levels (open / +L1 / +L2)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, DROPLIST_STORIES.submenu));
    await waitForFonts();
    const trigger = getByTestId(TEST_IDS.droplist.triggerOpen);
    const items = page.locator(`[data-test-id^="${LIST_INTERNAL_TEST_IDS.baseItem}_"]`);

    await trigger.click();
    await expect(items).toHaveCount(4);
    const openPng = await screenshotRegion(page, [trigger, items.first(), items.last()], 16);

    // Workspace = index 1 — раскрывает L2 popover (Overview / Analytics / Projects).
    await items.nth(1).hover();
    await expect(items).toHaveCount(7);
    const l1Png = await screenshotRegion(page, [trigger, items.first(), items.last()], 16);

    // Projects = index 6 — раскрывает L3 popover (Frontend / Backend).
    await items.nth(6).hover();
    await expect(items).toHaveCount(9);
    const l2Png = await screenshotRegion(page, [trigger, items.first(), items.last()], 16);

    const composite = await composeScreenshots(
      [
        { label: 'open', png: openPng },
        { label: '+L1 (Workspace)', png: l1Png },
        { label: '+L2 (Projects)', png: l2Png },
      ],
      { layout: 'row', gap: 24, padding: 16 },
    );
    expect(composite).toMatchSnapshot('expansion-levels.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // open-droplist по size: popover — portal вне StoryTable bbox, VM не собирается. Composite через click-loop.
  test('open sizes composite', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    const SIZES = ['s', 'm', 'l'] as const;
    const cells: ScreenshotCell[] = [];
    for (const size of SIZES) {
      await gotoStory(buildStoryOptions({ size }));
      await waitForFonts();
      const trigger = getByTestId(TEST_IDS.droplist.triggerOpen);
      await trigger.click();
      const items = page.locator(`[data-test-id^="${LIST_INTERNAL_TEST_IDS.baseItem}_"]`);
      await items.first().waitFor({ state: 'visible' });
      const png = await screenshotRegion(page, [trigger, items.first(), items.last()], 24);
      cells.push({ label: size.toUpperCase(), png });
    }
    const composite = await composeScreenshots(cells, { layout: 'row', gap: 24, padding: 16 });
    expect(composite).toMatchSnapshot('open-sizes.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('placements composite', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    const PLACEMENTS = ['bottom-start', 'bottom-end', 'top-start', 'top-end'] as const;
    const cells: ScreenshotCell[] = [];
    for (const placement of PLACEMENTS) {
      await gotoStory(buildStoryOptions({ placement }));
      await waitForFonts();
      const trigger = getByTestId(TEST_IDS.droplist.triggerOpen);
      await trigger.click();
      // Кадр = union trigger + первый/последний item: popover уходит вверх или вниз — нужны оба якоря.
      const items = page.locator(`[data-test-id^="${LIST_INTERNAL_TEST_IDS.baseItem}_"]`);
      await items.first().waitFor({ state: 'visible' });
      const png = await screenshotRegion(page, [trigger, items.first(), items.last()], 24);
      cells.push({ label: placement, png });
    }
    const composite = await composeScreenshots(cells, { layout: { type: 'grid', columns: 2 }, gap: 24, padding: 16 });
    expect(composite).toMatchSnapshot('placements.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('open with search', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, DROPLIST_STORIES.search));
    await waitForFonts();
    await getByTestId(TEST_IDS.droplist.triggerOpen).click();
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
      'open-with-search.png',
      SCREENSHOT_DEFAULT_OPTS,
    );
  });

  // header / footer + dividers (topBar / bottomBar слоты Dropdown).
  test('open with header and footer', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, DROPLIST_STORIES.withHeader));
    await waitForFonts();
    const trigger = getByTestId(TEST_IDS.droplist.triggerOpen);
    await trigger.click();
    const items = page.locator(`[data-test-id^="${LIST_INTERNAL_TEST_IDS.baseItem}_"]`);
    await items.first().waitFor({ state: 'visible' });
    const png = await screenshotRegion(page, [trigger, items.first(), items.last()], 24);
    expect(png).toMatchSnapshot('open-with-header.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Virtualized: оконный рендер (виден срез большой коллекции) + ширина не схлопывается
  // (widthStrategy=auto при virtualized резолвится в gte — регрессия MR!101).
  test('open virtualized', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions({ virtualized: true, widthStrategy: 'auto' }));
    await waitForFonts();
    const trigger = getByTestId(TEST_IDS.droplist.triggerOpen);
    await trigger.click();
    const items = page.locator(`[data-test-id^="${LIST_INTERNAL_TEST_IDS.baseItem}_"]`);
    await items.first().waitFor({ state: 'visible' });
    const png = await screenshotRegion(page, [trigger, items.first()], 24);
    expect(png).toMatchSnapshot('open-virtualized.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
