import { Page } from '@playwright/test';

import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { composeScreenshots, screenshotWithPadding, waitForFonts } from '#playwright-tooling/utils';

import { buildStoryOptions, KEY_SIZES, TEST_IDS } from './helpers';

const INTERACTION_PADDING = 8;

type InteractionState = 'default' | 'hover' | 'focus' | 'pressed';
const STATES: ReadonlyArray<InteractionState> = ['default', 'hover', 'focus', 'pressed'];

async function resetState(page: Page): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.mouse.move(0, 0);
  await page.waitForTimeout(50);
}

async function captureState(page: Page, state: InteractionState): Promise<Buffer> {
  const trigger = page.getByTestId(TEST_IDS.trigger).first();
  await resetState(page);

  if (state === 'hover') {
    await trigger.hover();
  } else if (state === 'focus') {
    await page.keyboard.press('Tab');
    await expect(trigger).toBeFocused();
  } else if (state === 'pressed') {
    const box = await trigger.boundingBox();
    if (!box) throw new Error('Parent trigger has no boundingBox');
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await trigger.evaluate(el => (el as HTMLElement).blur());
    await page.waitForTimeout(50);
    try {
      return await screenshotWithPadding(page, trigger, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS);
    } finally {
      await page.mouse.up();
    }
  }

  return screenshotWithPadding(page, trigger, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS);
}

test.describe('AiSuggestionParent — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('size × state matrix', async ({ page, gotoStory }) => {
    const cells: Array<{ label: string; png: Buffer }> = [];

    for (const size of KEY_SIZES) {
      await gotoStory(buildStoryOptions({ size }));
      await waitForFonts(page);

      for (const state of STATES) {
        cells.push({ label: `${size} / ${state}`, png: await captureState(page, state) });
      }
    }

    const composite = await composeScreenshots(cells, { layout: 'grid', columns: STATES.length });
    expect(composite).toMatchSnapshot('size-state-matrix.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
