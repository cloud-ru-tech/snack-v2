import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { SIZE } from '../../src/constants';
import { buildTimePickerOptions, TEST_IDS, TIME_PICKER_LIST_TEST_IDS, TIME_PICKER_STORIES } from './helpers';

test.describe('TimePicker — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildTimePickerOptions(undefined, TIME_PICKER_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus) — hour item', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildTimePickerOptions({ size: SIZE.M }));
    await waitForFonts();

    // Hover и focus оба на hour-item 5:00 — diff между ячейками показывает именно его
    // state-фон + focus-ring (а не разные элементы — иначе кажется, что hover/focus
    // принадлежат разным слотам).
    const hour5 = getByTestId(TIME_PICKER_LIST_TEST_IDS.hours(5));
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.timePickerPlayground),
      hoverTarget: hour5,
      focusAction: async () => {
        await hour5.evaluate((el: HTMLElement) => el.focus({ focusVisible: true } as FocusOptions));
      },
      layout: 'col',
    });
  });
});
