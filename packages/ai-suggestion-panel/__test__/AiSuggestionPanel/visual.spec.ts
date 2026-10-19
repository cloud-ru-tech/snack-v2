import {
  MATCH_SNAPSHOT_DEFAULT_OPTS,
  MOBILE_VIEWPORT,
  SCREENSHOT_DEFAULT_OPTS,
} from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, Locator, Page, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  composeScreenshots,
  ScreenshotCell,
  screenshotRegion,
  waitForSettledInViewport,
} from '#playwright-tooling/utils';

import { AI_SUGGESTION_PANEL_STORIES, buildStoryOptions, ITEMS, TEST_IDS } from './helpers';

const STATES = ['default', 'hover', 'focus', 'pressed'] as const;
type State = (typeof STATES)[number];

// Тултип кнопки Giga открывается по hover/focus и перекрыл бы кадр — его снимает отдельный тест.
const HIDE_LOGO_TOOLTIP = `[role='presentation']:has([data-test-id='${TEST_IDS.logoTooltip}']) { visibility: hidden !important; }`;

async function resetState(page: Page): Promise<void> {
  await page.keyboard.press('Escape');
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.mouse.move(0, 0);
  await page.mouse.up();
}

async function applyState(page: Page, target: Locator, state: State): Promise<void> {
  if (state === 'hover') {
    await target.hover();
  } else if (state === 'focus') {
    // Клавиатурное событие перед программным фокусом — иначе браузер не ставит :focus-visible.
    await page.keyboard.press('Shift');
    await target.focus();
    await expect(target).toBeFocused();
  } else if (state === 'pressed') {
    const box = await target.boundingBox();
    if (!box) throw new Error('target is not visible');
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
  }
}

test.describe('AiSuggestionPanel — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, AI_SUGGESTION_PANEL_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Кадр — вся полоса: при hover и focus появляется кнопка закрытия.
  test('interaction states (default × hover × focus × pressed)', async ({
    page,
    gotoStory,
    waitForFonts,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    const item = getByTestId(TEST_IDS.item).first();

    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.root),
      hoverTarget: item,
      pressedTarget: item,
      includePressed: true,
      // Первый Tab — кнопка Giga, второй — первый вопрос.
      focusAction: async p => {
        await p.keyboard.press('Tab');
        await p.keyboard.press('Tab');
      },
      layout: 'col',
    });
  });

  // Крайние ячейки повторяют скругление полосы — рамка фокуса и заливки не должны обрезаться.
  test('size × state matrix (edge cells)', async ({ page, gotoStory, waitForFonts, getByTestId, setStoryArgs }) => {
    const cells: ScreenshotCell[] = [];

    for (const size of ['s', 'm'] as const) {
      await gotoStory(buildStoryOptions({ size }));
      await waitForFonts();
      await page.addStyleTag({ content: HIDE_LOGO_TOOLTIP });

      const targets: Array<{ name: string; locator: Locator; prepare?: () => Promise<void> }> = [
        { name: 'logo', locator: getByTestId(TEST_IDS.logo) },
        { name: '+N', locator: getByTestId(TEST_IDS.more) },
        { name: 'close', locator: getByTestId(TEST_IDS.close) },
        {
          name: 'last item',
          locator: getByTestId(TEST_IDS.item).last(),
          prepare: () => setStoryArgs({ items: ITEMS.slice(0, 2) }),
        },
      ];

      for (const { name, locator, prepare } of targets) {
        await prepare?.();
        const frame = [getByTestId(TEST_IDS.logo), getByTestId(TEST_IDS.close)];

        for (const state of STATES) {
          await resetState(page);
          await applyState(page, locator, state);
          cells.push({ label: `${size} / ${name} / ${state}`, png: await screenshotRegion(page, frame, 8) });
        }
      }

      await resetState(page);
    }

    const composite = await composeScreenshots(cells, { layout: 'grid', columns: STATES.length });
    expect(composite).toMatchSnapshot('size-state-matrix.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('open «+N» list', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await getByTestId(TEST_IDS.more).click();
    const listItem = getByTestId(TEST_IDS.moreListItem).first();
    await expect(listItem).toBeVisible();

    const png = await screenshotRegion(page, [getByTestId(TEST_IDS.root), getByTestId(TEST_IDS.moreList)], 16);
    expect(png).toMatchSnapshot('open-more.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('open Giga tooltip', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await getByTestId(TEST_IDS.logo).hover();
    const tooltip = getByTestId(TEST_IDS.logoTooltip);
    await expect(tooltip).toBeVisible();

    const png = await screenshotRegion(page, [getByTestId(TEST_IDS.root), tooltip], 16);
    expect(png).toMatchSnapshot('open-logo-tooltip.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('open «+N» list (mobile bottom-sheet)', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
    await gotoStory(buildStoryOptions(undefined, AI_SUGGESTION_PANEL_STORIES.playground, { layoutType: 'mobile' }));
    await waitForFonts();
    await getByTestId(TEST_IDS.more).click();
    const listItem = getByTestId(TEST_IDS.moreListItem).first();
    await expect(listItem).toBeVisible();
    await waitForSettledInViewport(listItem);

    expect(await page.screenshot(SCREENSHOT_DEFAULT_OPTS)).toMatchSnapshot(
      'open-mobile.png',
      MATCH_SNAPSHOT_DEFAULT_OPTS,
    );
  });
});
