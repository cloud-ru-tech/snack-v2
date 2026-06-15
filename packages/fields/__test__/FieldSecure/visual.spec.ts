import { MATCH_SNAPSHOT_DEFAULT_OPTS, SCREENSHOT_DEFAULT_OPTS } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import {
  assertInteractionStatesSnapshot,
  assertVisualMatrixSnapshot,
  screenshotWithPadding,
} from '#playwright-tooling/utils';

import { buildStoryOptions, FIELD_SECURE_STORIES, STORY_TEST_IDS, TEST_IDS } from './helpers';

test.describe('FieldSecure — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('visual-matrix', async ({ page, gotoStory, waitForFonts }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_SECURE_STORIES.visualMatrix));
    await waitForFonts();
    await assertVisualMatrixSnapshot(page);
  });

  // Hover навешиваем на input — mouseenter всплывает на fieldWrapper (acrylic + focus-glow).
  test('field interaction states', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.fieldSecureShell),
      hoverTarget: getByTestId(TEST_IDS.fieldSecureInput),
      // уникальное имя — рядом отдельный eye-button snapshot
      snapshotName: 'field-interaction-states.png',
    });
  });

  // Кнопка «глаз» — не первый focusable: фокус через roving-навигацию (Tab → поле, ArrowRight → кнопка).
  test('hide-button interaction states', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions());
    await waitForFonts();
    await assertInteractionStatesSnapshot(page, {
      target: getByTestId(TEST_IDS.fieldSecureHideButton),
      focusAction: async page => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowRight');
      },
    });
  });

  // In-flow Skeleton: целимся в pending-инстанс с never-resolving getter (play его не трогает,
  // в отличие от deferred, который play раскрывает в текст). Клик «глаз» запускает getter →
  // loading=true → WithSkeleton снимает input и держит Skeleton. Не портал — снимаем сам shell + padding.
  test('async loading skeleton', async ({ page, gotoStory, waitForFonts, getByTestId }) => {
    await gotoStory(buildStoryOptions(undefined, FIELD_SECURE_STORIES.asyncReveal));
    await waitForFonts();
    const pendingRoot = getByTestId(STORY_TEST_IDS.fieldSecure.asyncPendingRoot);
    const shell = pendingRoot.getByTestId(TEST_IDS.fieldSecureShell);
    // Клик «глаз» запускает never-resolving getter → loading=true; промис не settling → Skeleton виден.
    await pendingRoot.getByTestId(TEST_IDS.fieldSecureHideButton).click();
    await expect(pendingRoot.getByTestId(TEST_IDS.fieldSecureSkeleton)).toBeVisible();
    await expect(pendingRoot.getByTestId(TEST_IDS.fieldSecureInput)).toHaveCount(0);
    const png = await screenshotWithPadding(page, shell, 16, SCREENSHOT_DEFAULT_OPTS);
    expect(png).toMatchSnapshot('async-skeleton.png', MATCH_SNAPSHOT_DEFAULT_OPTS);
  });
});
