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
    // 5 тостов с autoClose=5000 — за время retry-цикла toHaveScreenshot первый
    // успевает уйти в leaving. Ставим контейнер в hover-pause через синтетический
    // pointerover (React onPointerEnter биндится на pointerover/pointerout).
    await page.evaluate(() => {
      document.querySelectorAll('[data-test-id="toaster-container"]').forEach(el => {
        el.dispatchEvent(new PointerEvent('pointerover', { bubbles: true, pointerType: 'mouse' }));
      });
    });
    // Progress-bar тикает по реальному auto-close таймеру (rAF), маскируем,
    // чтобы попиксельное сравнение не зависело от elapsed-time на момент снимка.
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('stacking-bottom-right.png', {
      ...SCREENSHOT_DEFAULT_OPTS,
      mask: [page.locator('[data-test-id="toast-system-event__progressbar"]')],
    });
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
    // Контейнеры сконфигурированы с autoClose 5000/3000ms — без паузы тосты
    // успевают уйти в leaving за время retry-цикла toHaveScreenshot. Курсором
    // двух контейнеров сразу не удержать (BottomRight и BottomCenter
    // не пересекаются), поэтому диспатчим синтетический pointerenter на оба
    // .container — uiReducer'у безразлично, реальный это hover или нет.
    await page.evaluate(() => {
      // React реализует onPointerEnter через pointerover/pointerout, а не через
      // нативный pointerenter (тот не bubble'ит). Диспатчим pointerover —
      // тогда onPointerEnter сработает.
      document.querySelectorAll('[data-test-id="toaster-container"]').forEach(el => {
        el.dispatchEvent(new PointerEvent('pointerover', { bubbles: true, pointerType: 'mouse' }));
      });
    });
    // Маскируем тикающие индикаторы авто-close у SystemEvent + UserAction —
    // их scaleX/stroke-dashoffset тикает в rAF, а маски заменяют их пятном и
    // выводят из попиксельного сравнения. maxDiffPixelRatio оставляет
    // 0.5% запас на 1-px колебание границы маски progress-bar между запусками.
    await expect(page.locator(STORYBOOK_ROOT_SELECTOR)).toHaveScreenshot('triggers-mixed.png', {
      ...SCREENSHOT_DEFAULT_OPTS,
      mask: [
        page.locator('[data-test-id="toast-system-event__progressbar"]'),
        page.locator('[data-test-id="toast-user-action__timer"]'),
      ],
      maxDiffPixelRatio: 0.005,
    });
  });
});
