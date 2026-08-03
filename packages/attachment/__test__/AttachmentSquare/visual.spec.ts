import { expect } from '@playwright/test';
import sharp from 'sharp';

import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import {
  assertVisualMatrixSnapshot,
  composeScreenshots,
  ScreenshotCell,
  screenshotWithPadding,
} from '#playwright-tooling/utils';

import { ATTACHMENT_SQUARE_STORIES, buildStoryOptions, TEST_IDS } from './helpers';

// Матрица повторяет Figma master `attachmentSquare` (5781:59628):
// 2 секции по size (s, m), внутри каждой — 3 колонки (image, icon, image+loading)
// × 7 строк состояний. Колонка loading заполнена только в первой строке.
// Перед строкой `disabled` — визуальный зазор, как в Figma.
const SIZES = ['s', 'm'] as const;
const COLUMNS = ['image', 'icon', 'loading'] as const;

type RowState = {
  key: string;
  checked: boolean;
  error: boolean;
  disabled: boolean;
  hover: boolean;
  noActions?: boolean;
};

// 7 строк: 6 из Figma master 5781:59628 + дополнительный edge-case `error+no-actions`
// (когда callbacks не переданы — слот actions не рендерится). `error+hovered` из Figma
// визуально идентичен `error` (actions всегда видны в error-state, hover ничего не меняет),
// поэтому заменён на более информативный no-actions.
const ROW_STATES: readonly RowState[] = [
  { key: 'default', checked: false, error: false, disabled: false, hover: false },
  { key: 'hovered', checked: false, error: false, disabled: false, hover: true },
  { key: 'selected', checked: true, error: false, disabled: false, hover: false },
  { key: 'selected+hovered', checked: true, error: false, disabled: false, hover: true },
  { key: 'error', checked: false, error: true, disabled: false, hover: false },
  { key: 'error+no-actions', checked: false, error: true, disabled: false, hover: false, noActions: true },
  { key: 'disabled', checked: false, error: false, disabled: true, hover: false },
] as const;

const CELL_PADDING = 8;
/** Отступ от угла карточки для точки hover — см. комментарий в цикле. */
const HOVER_CORNER_INSET = 6;
const ROW_GAP = 4;
const SECTION_GAP = 24;
const DISABLED_GAP = 16;
const ERROR_MESSAGE = 'Hint text';

async function whiteSpacer(width: number, height: number): Promise<Buffer> {
  return sharp({ create: { width, height, channels: 4, background: '#ffffff' } })
    .png()
    .toBuffer();
}

test.describe('AttachmentSquare — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, ATTACHMENT_SQUARE_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (figma matrix)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    test.setTimeout(300_000);

    const cells: ScreenshotCell[] = [];

    for (let sIdx = 0; sIdx < SIZES.length; sIdx += 1) {
      const size = SIZES[sIdx];
      const cellSide = size === 's' ? 80 : 100;

      if (sIdx > 0) {
        const spacer = await whiteSpacer(cellSide, SECTION_GAP);
        for (let c = 0; c < COLUMNS.length; c += 1) cells.push({ label: '', png: spacer });
      }

      for (let rowIdx = 0; rowIdx < ROW_STATES.length; rowIdx += 1) {
        const row = ROW_STATES[rowIdx];

        if (row.key === 'disabled') {
          const spacer = await whiteSpacer(cellSide, DISABLED_GAP);
          for (let c = 0; c < COLUMNS.length; c += 1) cells.push({ label: '', png: spacer });
        }

        for (const col of COLUMNS) {
          const isLoading = col === 'loading';

          // Loading-колонка существует только для первой (default) строки.
          if (isLoading && rowIdx !== 0) {
            const blank = await whiteSpacer(cellSide, cellSide);
            cells.push({ label: '', png: blank });
            continue;
          }

          // Figma error-anatomy: download заменяется на retry, delete остаётся.
          // То есть error-карточка показывает retry + delete (но не download).
          // noActions — edge-case, когда callbacks не переданы и Actions возвращает null.
          const props: Record<string, unknown> = {
            size,
            checked: row.checked,
            disabled: row.disabled,
            showClick: !row.disabled,
            showDownload: !row.noActions && !row.error,
            showDelete: !row.noActions,
            showRetry: !row.noActions && row.error,
          };

          if (col === 'icon') {
            props.file = 'none';
            props.icon = 'default';
          } else {
            props.file = 'image';
          }
          if (isLoading) props.loading = true;
          if (row.error) props.error = ERROR_MESSAGE;

          await gotoStory(buildStoryOptions(props));
          await waitForFonts();

          const target = getByTestId(TEST_IDS.attachmentSquare.root);
          await target.waitFor({ state: 'visible' });

          await page.mouse.move(0, 0);
          if (row.hover) {
            // Наводим в верхний-правый угол карточки, а не в её центр. `:hover` живёт на
            // корне, поэтому overlay с actions раскрывается от любой точки внутри карточки,
            // а в центре лежит усечённый текст: TruncateString (@ds/truncate-string) вешает
            // на него tooltip, который по своему таймингу успевает всплыть и попасть в кадр.
            // Угол свободен во всех строках матрицы (checkbox — слева сверху, actions — снизу).
            const box = await target.boundingBox();
            if (!box) throw new Error(`AttachmentSquare: нет boundingBox для ${size}/${col}/${row.key}`);
            await page.mouse.move(box.x + box.width - HOVER_CORNER_INSET, box.y + HOVER_CORNER_INSET);
            // TruncateString измеряет родителя через ResizeObserver после видимости overlay —
            // без паузы успеваем снять скриншот до пересчёта.
            await page.waitForTimeout(120);
          }

          const colLabel = isLoading ? 'loading' : col;
          const label = `${size} · ${colLabel} · ${row.key}`;

          const png = await screenshotWithPadding(page, target, CELL_PADDING, SCREENSHOT_DEFAULT_OPTS);
          cells.push({ label, png });
        }
      }
    }

    const composite = await composeScreenshots(cells, {
      layout: { type: 'grid', columns: COLUMNS.length },
      gap: ROW_GAP,
      padding: 8,
      labelHeight: 18,
    });
    expect(composite).toMatchSnapshot('interaction-states.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
