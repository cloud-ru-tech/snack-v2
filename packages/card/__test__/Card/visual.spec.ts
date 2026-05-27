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

import { buildStoryOptions, CARD_STORIES, CARD_TEST_ID } from './helpers';

const VIEWS = ['simple', 'outline', 'shadow'] as const;
const RADII = ['s', 'm', 'l'] as const;
const ROW_STATES = [
  { key: 'default', disabled: false, checked: false, hover: false },
  { key: 'hovered', disabled: false, checked: false, hover: true },
  { key: 'disabled', disabled: true, checked: false, hover: false },
  { key: 'checked', disabled: false, checked: true, hover: false },
  { key: 'checked+hovered', disabled: false, checked: true, hover: true },
  { key: 'checked+disabled', disabled: true, checked: true, hover: false },
] as const;

const CELL_PADDING = 8;
const CELL_WIDTH = 164;

test.describe('Card — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, CARD_STORIES.visualMatrix));
    await waitForFonts();

    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (figma matrix)', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    // 54 ячейки = 54 gotoStory; дефолтных 30s не хватает даже на тёплом Storybook-кеше.
    test.setTimeout(300_000);

    const cells: ScreenshotCell[] = [];
    const groupSpacer = await sharp({
      create: { width: CELL_WIDTH, height: 24, channels: 4, background: '#ffffff' },
    })
      .png()
      .toBuffer();

    let firstGroup = true;
    for (const radius of RADII) {
      if (!firstGroup) {
        for (let i = 0; i < VIEWS.length; i += 1) cells.push({ label: '', png: groupSpacer });
      }
      firstGroup = false;
      for (const row of ROW_STATES) {
        for (const view of VIEWS) {
          await gotoStory(
            buildStoryOptions({
              radius,
              view,
              disabled: row.disabled,
              checked: row.checked,
              multiSelect: row.checked,
              interactive: true,
              style: { width: `${CELL_WIDTH}px` },
            }),
          );
          await waitForFonts();

          const card = getByTestId(CARD_TEST_ID);
          await card.waitFor({ state: 'visible' });

          await page.mouse.move(0, 0);
          if (row.hover) {
            await card.hover();
          }

          const png = await screenshotWithPadding(page, card, CELL_PADDING, SCREENSHOT_DEFAULT_OPTS);
          cells.push({ label: '', png });
        }
      }
    }

    const composite = await composeScreenshots(cells, {
      layout: { type: 'grid', columns: VIEWS.length },
      gap: 4,
      padding: 8,
      labelHeight: 0,
    });
    expect(composite).toMatchSnapshot('interaction-states.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
