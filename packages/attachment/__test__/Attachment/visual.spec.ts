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

import { ATTACHMENT_STORIES, buildStoryOptions, TEST_IDS } from './helpers';

// Матрица повторяет Figma master `attachment` (5778:49181).
const SIZES = ['s', 'm'] as const;
const COLUMNS = ['image', 'icon', 'loading'] as const;
const ROW_STATES = [
  { key: 'default', disabled: false, checked: false, error: false, hover: false },
  { key: 'hovered', disabled: false, checked: false, error: false, hover: true },
  { key: 'checked', disabled: false, checked: true, error: false, hover: false },
  { key: 'checked+hovered', disabled: false, checked: true, error: false, hover: true },
  { key: 'error', disabled: false, checked: false, error: true, hover: false },
  { key: 'error+hovered', disabled: false, checked: false, error: true, hover: true },
  { key: 'disabled', disabled: true, checked: false, error: false, hover: false },
] as const;

const CELL_PADDING = 8;
const SPACER_WIDTH = 256;
const ERROR_MESSAGE = 'Hint text';

test.describe('Attachment — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, ATTACHMENT_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (figma matrix)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    // 30 ячеек = 30 навигаций; дефолтных 30s не хватает.
    test.setTimeout(300_000);

    const cells: ScreenshotCell[] = [];

    let firstGroup = true;
    for (const size of SIZES) {
      if (!firstGroup) {
        const spacer = await sharp({
          create: { width: SPACER_WIDTH, height: 24, channels: 4, background: '#ffffff' },
        })
          .png()
          .toBuffer();
        for (let i = 0; i < COLUMNS.length; i += 1) cells.push({ label: '', png: spacer });
      }
      firstGroup = false;

      for (let rowIdx = 0; rowIdx < ROW_STATES.length; rowIdx += 1) {
        const row = ROW_STATES[rowIdx];
        for (const col of COLUMNS) {
          // Loading-колонка в Figma только в row[0] (default); остальные клетки — spacer'ы.
          if (col === 'loading' && rowIdx !== 0) {
            const blank = await sharp({
              create: { width: SPACER_WIDTH, height: size === 's' ? 48 : 72, channels: 4, background: '#ffffff' },
            })
              .png()
              .toBuffer();
            cells.push({ label: '', png: blank });
            continue;
          }

          const props: Record<string, unknown> = {
            size,
            checked: row.checked,
            disabled: row.disabled,
            showClick: true,
          };
          if (col === 'icon') {
            props.file = 'none';
            props.icon = 'default';
          } else {
            props.file = 'image';
          }
          if (col === 'loading') props.loading = true;
          if (row.error) props.error = ERROR_MESSAGE;

          await gotoStory(buildStoryOptions(props));
          await waitForFonts();

          const target = getByTestId(TEST_IDS.attachment.root);
          await target.waitFor({ state: 'visible' });

          await page.mouse.move(0, 0);
          if (row.hover) await target.hover();

          const png = await screenshotWithPadding(page, target, CELL_PADDING, SCREENSHOT_DEFAULT_OPTS);
          cells.push({ label: '', png });
        }
      }
    }

    const composite = await composeScreenshots(cells, {
      layout: { type: 'grid', columns: COLUMNS.length },
      gap: 4,
      padding: 8,
      labelHeight: 0,
    });
    expect(composite).toMatchSnapshot('interaction-states.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
