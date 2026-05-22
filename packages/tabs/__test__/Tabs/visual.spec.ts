import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { test } from '#playwright-tooling/fixtures';
import { assertInteractionStatesSnapshot, assertVisualMatrixSnapshot } from '#playwright-tooling/utils';

import { buildStoryOptions, TABS_STORIES, TEST_IDS } from './helpers';

test.describe('Tabs — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, TABS_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  test('interaction states (default × hover × focus × pressed) — settings tab', async ({
    page,
    gotoStory,
    getByTestId,
    waitForFonts,
  }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();

    // Hover/focus/pressed — все на 'settings' (не active). Tab фокусирует selected
    // overview по дефолту, поэтому focus задаём вручную на settings.
    const settings = getByTestId(TEST_IDS.tab.settings);
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.tabBar.root),
      hoverTarget: settings,
      pressedTarget: settings,
      focusAction: async () => {
        await settings.evaluate((el: HTMLElement) => el.focus({ focusVisible: true } as FocusOptions));
      },
      includePressed: true,
      layout: 'col',
    });
  });
});
