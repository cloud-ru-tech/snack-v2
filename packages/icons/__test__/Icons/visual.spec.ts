import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';

type GroupSnapshot = { name: string; snapshot: string };

/** Каталог группы VisualMatrix открывается через category/group/name/story (см. getStorybookUrl). */
function catalogStory(name: string, globals?: Record<string, unknown>) {
  return { category: 'components', group: 'icons', name, story: name, globals };
}

// currentColor/preserve-наборы не зависят от темы по форме — по одному снимку на группу.
const GROUPS: GroupSnapshot[] = [
  { name: 'interfaces-visual-matrix', snapshot: 'interfaces.png' },
  { name: 'flags-visual-matrix', snapshot: 'flags.png' },
  { name: 'services-visual-matrix', snapshot: 'services.png' },
  { name: 'extensions-visual-matrix', snapshot: 'extensions.png' },
];

test.describe('Icons — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  for (const { name, snapshot } of GROUPS) {
    test(`catalog ${snapshot}`, async ({ page, gotoStory, waitForFonts }) => {
      await gotoStory(catalogStory(name));
      await waitForFonts();
      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(snapshot, SCREENSHOT_DEFAULT_OPTS);
    });
  }

  // Логотипы (paired) несут разный арт в светлой и тёмной теме — снимаем обе через globals.theme.
  for (const theme of ['light', 'dark'] as const) {
    test(`logos catalog (${theme} theme)`, async ({ page, gotoStory, waitForFonts }) => {
      await gotoStory(catalogStory('logos-visual-matrix', { theme }));
      await waitForFonts();
      await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
        `logos-${theme}.png`,
        SCREENSHOT_DEFAULT_OPTS,
      );
    });
  }
});
