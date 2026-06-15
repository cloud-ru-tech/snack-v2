import { Page } from '@playwright/test';

import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertVisualMatrixSnapshot,
  composeScreenshots,
  screenshotWithPadding,
  waitForStableBbox,
} from '#playwright-tooling/utils';

import { buildStoryOptions, itemTestId, LIST_INTERNAL_TEST_IDS, LIST_STORIES, TEST_IDS } from './helpers';

const INTERACTION_PADDING = 8;

type InteractionState = 'default' | 'hover' | 'focus' | 'pressed';
const STATES: ReadonlyArray<InteractionState> = ['default', 'hover', 'focus', 'pressed'];

// Строки матрицы variant × state (`data-variant` item'а: single | multiple).
// single checked — state-layer `activatedFilled` (зелёная тонировка + маркер),
// multiple unchecked — `regularFilled` (серый hover/pressed) + чекбокс в кадре.
// `tabs` — сколько Tab нужно до корня соответствующего списка фикстуры: item'ы
// вне tab-order (roving tabindex, Tab пропускает их через HiddenTabButton),
// на item фокус спускает ArrowDown с корня списка.
const VARIANT_ROWS = [
  { itemId: 'x', label: 'single checked', tabs: 1 },
  { itemId: 'y', label: 'multiple', tabs: 2 },
] as const;

type VariantRow = (typeof VARIANT_ROWS)[number];

async function resetState(page: Page): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.mouse.move(0, 0);
  await page.waitForTimeout(50);
}

async function captureState(page: Page, row: VariantRow, state: InteractionState): Promise<Buffer> {
  const item = page.getByTestId(itemTestId(row.itemId));
  await resetState(page);

  if (state === 'hover') {
    await item.hover();
  } else if (state === 'focus') {
    for (let i = 0; i < row.tabs; i += 1) {
      await page.keyboard.press('Tab');
    }
    await page.keyboard.press('ArrowDown');
    await expect(item).toBeFocused();
  } else if (state === 'pressed') {
    const box = await item.boundingBox();
    if (!box) throw new Error('List item has no boundingBox');
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    // mouse.down даёт item'у focus (focus-visible heuristic в chromium от синтетических
    // pointer-событий). Чтобы получить чистое :active без focus-ring, снимаем фокус
    // удержанием мыши (blur не отпускает :active).
    await item.evaluate(el => (el as HTMLElement).blur());
    await page.waitForTimeout(50);
    try {
      return await screenshotWithPadding(page, item, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS);
    } finally {
      await page.mouse.up();
    }
  }
  return screenshotWithPadding(page, item, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS);
}

test.describe('List — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // Главный артефакт: вся VisualMatrix (size × selection × состояния × составные типы айтемов
  // × separator × chrome × pinned × empty × truncate) одним снимком.
  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Variant × State (2 × 4 = 8 cells): псевдоклассовые состояния обоих selection-режимов.
  // single checked → activated-токены, multiple → regular-токены + чекбокс — их
  // hover/focus/pressed VM-статика не показывает. Первая строка (single checked) служит
  // и как baseline interaction-state — отдельный interaction-states.png не нужен.
  test('variant × state matrix', async ({ page, gotoStory, waitForFonts }) => {
    const cells: Array<{ label: string; png: Buffer }> = [];
    for (const row of VARIANT_ROWS) {
      // Каждая строка — со свежей загрузки story: mouse.up после pressed-cell кликает
      // item (toggle selection), чистый state между строками обязателен.
      await gotoStory(buildStoryOptions(undefined, LIST_STORIES.interactionStatesFixture));
      await waitForFonts();
      for (const state of STATES) {
        cells.push({ label: `${row.label} / ${state}`, png: await captureState(page, row, state) });
      }
    }
    const composite = await composeScreenshots(cells, { layout: 'grid', columns: STATES.length });
    expect(composite).toMatchSnapshot('variant-state-matrix.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  // Раскрытый collapse (accordion): дерево с вложенным уровнем — состояние, которого нет в VM.
  test('collapse expanded tree', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, LIST_STORIES.collapse));
    await waitForFonts();
    const root = getByTestId(TEST_IDS.list.collapseScenario);

    // Стартово раскрыты `general` и `workspace-resources`. Раскрываем `billing` и вложенный
    // `Payment methods` явной кнопкой-триггером (шеврон `groupIndicator`) — клик по телу строки
    // больше не переключает collapse. `.first()` — header-шеврон самого accordion'а (до детей).
    await getByTestId(`${LIST_INTERNAL_TEST_IDS.accordionItem}-billing`)
      .getByTestId(LIST_INTERNAL_TEST_IDS.groupIndicator)
      .first()
      .click();
    await getByTestId(`${LIST_INTERNAL_TEST_IDS.accordionItem}-billing-methods`)
      .getByTestId(LIST_INTERNAL_TEST_IDS.groupIndicator)
      .first()
      .click();
    await expect(getByTestId(`${LIST_INTERNAL_TEST_IDS.baseItem}_billing-card`)).toBeVisible();

    // Увести курсор, чтобы hover-фон последнего кликнутого ряда не попал в кадр.
    await page.mouse.move(0, 0);
    await waitForStableBbox(root);
    const png = await screenshotWithPadding(page, root, 16, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('collapse-expanded.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
