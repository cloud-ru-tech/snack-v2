import { Page } from '@playwright/test';

import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { composeScreenshots, screenshotWithPadding, waitForFonts } from '#playwright-tooling/utils';

import { buildStoryOptions, KEY_APPEARANCES, TEST_IDS } from './helpers';

const INTERACTION_PADDING = 8;

type InteractionState = 'default' | 'hover' | 'focus';
const STATES: ReadonlyArray<InteractionState> = ['default', 'hover', 'focus'];

async function resetState(page: Page): Promise<void> {
  await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
  await page.mouse.move(0, 0);
  await page.waitForTimeout(50);
}

async function captureState(page: Page, state: InteractionState): Promise<Buffer> {
  const chip = page.getByTestId(TEST_IDS.root);
  await resetState(page);

  if (state === 'hover') {
    await chip.hover();
  } else if (state === 'focus') {
    await page.keyboard.press('Tab');
    await expect(chip).toBeFocused();
  }

  return screenshotWithPadding(page, chip, INTERACTION_PADDING, SCREENSHOT_DEFAULT_OPTS);
}

test.describe('AiSuggestionSimple — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('appearance × state matrix', async ({ page, gotoStory }) => {
    const cells: Array<{ label: string; png: Buffer }> = [];

    for (const appearance of KEY_APPEARANCES) {
      await gotoStory(buildStoryOptions({ appearance }));
      await waitForFonts(page);

      for (const state of STATES) {
        cells.push({ label: `${appearance} / ${state}`, png: await captureState(page, state) });
      }
    }

    const composite = await composeScreenshots(cells, { layout: 'grid', columns: STATES.length });
    expect(composite).toMatchSnapshot('appearance-state-matrix.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
