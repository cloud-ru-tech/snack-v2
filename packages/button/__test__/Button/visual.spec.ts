import { Page } from '@playwright/test';

import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot, composeScreenshots, screenshotWithPadding } from '#playwright-tooling/utils';

import { APPEARANCE, VIEW } from '../../src/Button/constants';
import { buildStoryOptions, BUTTON_STORIES, TEST_IDS } from './helpers';

const INTERACTION_PADDING = 8;

type InteractionState = 'default' | 'hover' | 'focus' | 'pressed';
const STATES: ReadonlyArray<InteractionState> = ['default', 'hover', 'focus', 'pressed'];
const APPEARANCES = [APPEARANCE.Primary, APPEARANCE.Neutral, APPEARANCE.Critical] as const;

async function resetState(page: Page): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.mouse.move(0, 0);
  await page.waitForTimeout(50);
}

async function captureState(page: Page, state: InteractionState): Promise<Buffer> {
  const button = page.getByTestId(TEST_IDS.button.root);
  await resetState(page);

  if (state === 'hover') {
    await button.hover();
  } else if (state === 'focus') {
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
  } else if (state === 'pressed') {
    const box = await button.boundingBox();
    if (!box) throw new Error('Button has no boundingBox');
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    // mouse.down даёт <button> focus (focus-visible heuristic в chromium от
    // синтетических pointer-событий). Чтобы получить чистое :active без focus-ring,
    // снимаем фокус удержанием мыши (.button.blur() не отпускает :active).
    await button.evaluate(el => (el as HTMLElement).blur());
    await page.waitForTimeout(50);
    try {
      return await screenshotWithPadding(page, button, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS);
    } finally {
      await page.mouse.up();
    }
  }
  return screenshotWithPadding(page, button, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS);
}

test.describe('Button — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, BUTTON_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Appearance × State (3 × 4 = 12 cells). Покрывает per-appearance hover/focus/pressed
  // окраску, которую VisualMatrix статика не показывает. Первая строка (primary) служит
  // и как baseline interaction-state — отдельный interaction-states.png не нужен.
  test('appearance × state matrix (filled view)', async ({ page, gotoStory, waitForFonts }) => {
    // view=filled на всех ячейках → цвет appearance максимально различим.
    const cells: Array<{ label: string; png: Buffer }> = [];
    for (const appearance of APPEARANCES) {
      await gotoStory(buildStoryOptions({ appearance, view: VIEW.Filled }));
      await waitForFonts();
      for (const state of STATES) {
        cells.push({ label: `${appearance} / ${state}`, png: await captureState(page, state) });
      }
    }
    const composite = await composeScreenshots(cells, { layout: 'grid', columns: STATES.length });
    expect(composite).toMatchSnapshot('appearance-state-matrix.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
