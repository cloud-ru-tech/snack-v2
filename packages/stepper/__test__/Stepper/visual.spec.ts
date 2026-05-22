import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  composeScreenshots,
  screenshotWithPadding,
} from '#playwright-tooling/utils';

import { buildStoryOptions, STEPPER_STORIES, TEST_IDS } from './helpers';

test.describe('Stepper — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // modes.png — composite по двум layout-режимам: desktop (basic-flow) и mobile.
  // Каждый требует своей story-композиции (Stepper + buttons), что не выражается
  // в одной VisualMatrix-сетке.
  test('modes', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.basicFlow));
    await waitForFonts();
    const desktop = await screenshotWithPadding(page, getByTestId(TEST_IDS.example), 16, SCREENSHOT_DEFAULT_OPTS);

    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.mobile));
    await waitForFonts();
    const mobile = await screenshotWithPadding(page, getByTestId(TEST_IDS.example), 16, SCREENSHOT_DEFAULT_OPTS);

    const composite = await composeScreenshots(
      [
        { label: 'desktop', png: desktop },
        { label: 'mobile', png: mobile },
      ],
      { layout: 'col' },
    );
    expect(composite).toMatchSnapshot('modes.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });

  test('interaction states (default × hover × focus × pressed) — next button', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions(undefined, STEPPER_STORIES.basicFlow));
    await waitForFonts();

    const next = getByTestId(TEST_IDS.next);
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.example),
      hoverTarget: next,
      pressedTarget: next,
      focusAction: async () => {
        await next.focus();
      },
      includePressed: true,
      layout: 'col',
    });
  });
});
