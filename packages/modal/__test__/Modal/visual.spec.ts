import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { composeScreenshots } from '#playwright-tooling/utils';

import { MODE, WIDTH } from '../../src/constants';
import { buildStoryOptions, MAIN_TEST_ID, MODAL_TRIGGER_TEST_ID } from './helpers';

test.describe('Modal — visual regression', () => {
  // Modal — overlay+focus-trap; одновременно открыть несколько модалок нельзя.
  // VisualMatrix story показывает только триггеры, поэтому baseline снимков идёт с
  // Playground через `open=true`. Per-mode и per-width сворачиваем композитами
  // (`modes.png`, `widths.png`), уникальные сценарии — отдельными снимками.
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('modes (regular × aggressive × forced)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    const modes = [
      { label: 'regular', mode: MODE.Regular },
      { label: 'aggressive', mode: MODE.Aggressive },
      { label: 'forced', mode: MODE.Forced },
    ] as const;

    const cells = [];
    for (const { label, mode } of modes) {
      // open=true через URL-args синхронизируется в Playground через useEffect
      // после mount — race с React reconcile иногда не успевает к моменту снимка.
      // Кликаем триггер: трeиггер существует синхронно с render Playground'а.
      await gotoStory(
        buildStoryOptions({
          mode,
          showAfterHeadline: false,
          showMedia: false,
        }),
      );
      await getByTestId(MODAL_TRIGGER_TEST_ID).click();
      await expect(getByTestId(MAIN_TEST_ID)).toBeVisible();
      await waitForFonts();
      cells.push({ label, png: await page.screenshot(SCREENSHOT_DEFAULT_OPTS) });
    }

    const composite = await composeScreenshots(cells, { layout: 'col' });
    expect(composite).toMatchSnapshot('modes.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('widths (s × m × l)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    const widths = [
      { label: 's', width: WIDTH.S },
      { label: 'm', width: WIDTH.M },
      { label: 'l', width: WIDTH.L },
    ] as const;

    const cells = [];
    for (const { label, width } of widths) {
      await gotoStory(
        buildStoryOptions({
          width,
          showAfterHeadline: false,
          showMedia: false,
        }),
      );
      await getByTestId(MODAL_TRIGGER_TEST_ID).click();
      await expect(getByTestId(MAIN_TEST_ID)).toBeVisible();
      await waitForFonts();
      cells.push({ label, png: await page.screenshot(SCREENSHOT_DEFAULT_OPTS) });
    }

    const composite = await composeScreenshots(cells, { layout: 'col' });
    expect(composite).toMatchSnapshot('widths.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('open scrollable (long body)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(
      buildStoryOptions({
        longBodyContent: true,
        showAfterHeadline: false,
        showMedia: false,
      }),
    );
    await getByTestId(MODAL_TRIGGER_TEST_ID).click();
    await expect(getByTestId(MAIN_TEST_ID)).toBeVisible();
    await waitForFonts();
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-scrollable.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });

  test('open minimal (no header, no footer)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(
      buildStoryOptions({
        showHeader: false,
        showFooter: false,
        showMedia: false,
        showAfterHeadline: false,
      }),
    );
    await getByTestId(MODAL_TRIGGER_TEST_ID).click();
    await expect(getByTestId(MAIN_TEST_ID)).toBeVisible();
    await waitForFonts();
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-minimal.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });

  test('open loading', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(
      buildStoryOptions({
        loading: true,
        loadingState: 'Loading…',
        showAfterHeadline: false,
        showMedia: false,
      }),
    );
    await getByTestId(MODAL_TRIGGER_TEST_ID).click();
    await expect(getByTestId(MAIN_TEST_ID)).toBeVisible();
    await waitForFonts();
    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-loading.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
