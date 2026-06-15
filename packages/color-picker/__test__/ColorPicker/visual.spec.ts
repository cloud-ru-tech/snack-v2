import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, COLOR_PICKER_STORIES, TEST_IDS } from './helpers';

test.describe('ColorPicker — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, COLOR_PICKER_STORIES.visualMatrix));
    await waitForFonts();

    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (hex field) — default × hover × focus', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions({ autoApply: true }));
    await waitForFonts();

    const field = getByTestId(TEST_IDS.fieldHex);
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.root),
      hoverTarget: field,
      focusAction: async () => {
        // Field не имеет TEST_IDS на нативном <input> — берём единственный input внутри fieldHex.
        await field
          .locator('input')
          .first()
          .evaluate((el: HTMLInputElement) => el.focus({ focusVisible: true } as FocusOptions));
      },
      snapshotName: 'interaction-states-field.png',
      layout: 'row',
    });
  });

  test('interaction states (hue slider) — default × focus', async ({ page, gotoStory, getByTestId, waitForFonts }) => {
    await gotoStory(buildStoryOptions({ autoApply: true }));
    await waitForFonts();

    const slider = getByTestId(TEST_IDS.sliderH);
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.root),
      hoverTarget: slider,
      focusAction: async () => {
        await slider.evaluate((el: HTMLElement) => el.focus({ focusVisible: true } as FocusOptions));
      },
      snapshotName: 'interaction-states-slider.png',
      layout: 'row',
    });
  });
});
