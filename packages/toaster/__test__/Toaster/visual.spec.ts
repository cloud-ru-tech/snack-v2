import { SCREENSHOT_DEFAULT_OPTS, STORYBOOK_ROOT_SELECTOR } from '#playwright-tooling/constants/common';
import { VISUAL_BASELINE_PROJECT } from '#playwright-tooling/constants/projects';
import { expect, test } from '#playwright-tooling/fixtures';
import { waitForFonts } from '#playwright-tooling/utils';

import {
  buildStoryOptions,
  stackingSpawnTestId,
  SYSTEM_EVENT_TEST_ID,
  systemEventTriggerTestId,
  TOASTER_BUTTON_CLOSE_ALL_TEST_ID,
  TOASTER_STORIES,
  UPLOAD_TEST_ID,
  uploadTriggerTestId,
  USER_ACTION_TEST_ID,
  userActionTriggerTestId,
} from './helpers';

// VisualMatrix-стори у Toaster нет — контейнер сам по себе пуст, всё
// интересное возникает после действий. Снимаем только сценарные кадры:
// collapsed-стек и сосуществование трёх типов тостов в разных контейнерах.
test.describe('Toaster — visual regression', () => {
  // eslint-disable-next-line no-empty-pattern
  test.beforeEach(({}, testInfo) => {
    test.skip(
      testInfo.project.name !== VISUAL_BASELINE_PROJECT,
      `Visual baselines are ${VISUAL_BASELINE_PROJECT}-only`,
    );
  });

  test('stacking — 5 тостов в bottom-right (collapsed-стек)', async ({ page, gotoStory, getByTestId }) => {
    await gotoStory(buildStoryOptions(TOASTER_STORIES.stacking));
    await waitForFonts(page);
    await getByTestId(stackingSpawnTestId('bottom-right')).click();
    // Дожидаемся, что все 5 тостов в DOM и stacked-кнопка "Закрыть все" появилась —
    // это маркеры того, что stacked-анимация завершилась. toHaveScreenshot сам
    // ретраит сравнение в пределах своего timeout.
    await expect(getByTestId(SYSTEM_EVENT_TEST_ID)).toHaveCount(5);
    await expect(getByTestId(TOASTER_BUTTON_CLOSE_ALL_TEST_ID).first()).toBeVisible();
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot(
      'stacking-bottom-right.png',
      SCREENSHOT_DEFAULT_OPTS,
    );
  });

  test('triggers — SystemEvent success + UserAction success + Upload loading', async ({
    page,
    gotoStory,
    getByTestId,
  }) => {
    await gotoStory(buildStoryOptions(TOASTER_STORIES.triggers));
    await waitForFonts(page);
    await getByTestId(systemEventTriggerTestId('success')).click();
    await getByTestId(userActionTriggerTestId('success')).click();
    await getByTestId(uploadTriggerTestId('loading')).click();
    // Дожидаемся, что три тоста реально появились в DOM перед снимком.
    await expect(getByTestId(SYSTEM_EVENT_TEST_ID).first()).toBeVisible();
    await expect(getByTestId(USER_ACTION_TEST_ID).first()).toBeVisible();
    await expect(getByTestId(UPLOAD_TEST_ID).first()).toBeVisible();
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('triggers-mixed.png', SCREENSHOT_DEFAULT_OPTS);
  });
});
