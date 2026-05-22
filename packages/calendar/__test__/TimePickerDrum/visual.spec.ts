import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildTimePickerDrumOptions, TIME_PICKER_DRUM_STORIES } from './helpers';

test.describe('TimePickerDrum — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  // TimePickerDrum — wheel-input без отдельных hover/focus state-фонов на корне/колонке.
  // Все интерактивные различия (selected row, hover на отдельной cell внутри wheel)
  // покрываются VisualMatrix через разные `selected`-значения. interaction-states
  // композит здесь бесполезен — все cells выглядят одинаково.
  test('visual matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildTimePickerDrumOptions(undefined, TIME_PICKER_DRUM_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });
});
