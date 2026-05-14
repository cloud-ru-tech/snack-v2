import { expect, test } from '#playwright-tooling/fixtures';

import {
  buildStoryOptions,
  stackingSpawnTestId,
  SYSTEM_EVENT_TEST_ID,
  systemEventTriggerTestId,
  TOASTER_BUTTON_CLOSE_ALL_TEST_ID,
  TOASTER_STORIES,
  TRIGGER_DISMISS_ALL_TEST_ID,
  TRIGGER_SPAWN_TEST_ID,
  TRIGGER_STACKING_DISMISS_ALL_TEST_ID,
  TRIGGER_UPDATE_SYSTEM_SUCCESS_TEST_ID,
  TRIGGER_UPDATE_USER_ACTION_TEST_ID,
  UPLOAD_TEST_ID,
  uploadTriggerTestId,
  USER_ACTION_TEST_ID,
  userActionTriggerTestId,
} from './helpers';

// Стори Playground поддерживает URL-args: включаем draggable и отключаем
// autoClose, чтобы тост точно дожил до конца жеста.
const DRAGGABLE_ARGS = {
  draggable: true,
  autoCloseEnabled: false,
  draggableDirection: 'x',
};

test.describe('Toaster — interaction', () => {
  test.describe('Playground', () => {
    test('spawn открывает SystemEvent тост; dismiss-all закрывает', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(TOASTER_STORIES.playground));

      await getByTestId(TRIGGER_SPAWN_TEST_ID).click();
      const toast = getByTestId(SYSTEM_EVENT_TEST_ID).first();
      await expect(toast).toBeVisible();

      await getByTestId(TRIGGER_DISMISS_ALL_TEST_ID).click();
      await expect(toast).toBeHidden();
    });

    test('многократный spawn копит тосты до limit', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(TOASTER_STORIES.playground));

      const spawn = getByTestId(TRIGGER_SPAWN_TEST_ID);
      for (let i = 0; i < 3; i++) {
        await spawn.click();
      }

      const toasts = getByTestId(SYSTEM_EVENT_TEST_ID);
      await expect(toasts).toHaveCount(3);
    });
  });

  test.describe('Triggers', () => {
    test('SystemEvent · success appearance прокидывается на DOM', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(TOASTER_STORIES.triggers));

      await getByTestId(systemEventTriggerTestId('success')).click();
      const toast = getByTestId(SYSTEM_EVENT_TEST_ID).first();
      await expect(toast).toBeVisible();
      await expect(toast).toHaveAttribute('data-appearance', 'success');
    });

    test('UserAction рендерится в своём контейнере', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(TOASTER_STORIES.triggers));

      await getByTestId(userActionTriggerTestId('success')).click();
      const toast = getByTestId(USER_ACTION_TEST_ID).first();
      await expect(toast).toBeVisible();
    });

    test('Upload рендерится со статусом loading', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(TOASTER_STORIES.triggers));

      await getByTestId(uploadTriggerTestId('loading')).click();
      const upload = getByTestId(UPLOAD_TEST_ID).first();
      await expect(upload).toBeVisible();
    });
  });

  test.describe('Stacking', () => {
    test('5 тостов в одной позиции показывают кнопку "Закрыть все" и сворачиваются', async ({
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory(buildStoryOptions(TOASTER_STORIES.stacking));

      await getByTestId(stackingSpawnTestId('bottom-right')).click();

      // В stacked-режиме нижние тосты в стеке визуально скрыты (translate+scale),
      // поэтому опираемся на факт спавна через DOM-присутствие и появление
      // кнопки "Закрыть все" (порог CLOSE_ALL_THRESHOLD=2).
      await expect(getByTestId(SYSTEM_EVENT_TEST_ID)).toHaveCount(5);
      await expect(getByTestId(TOASTER_BUTTON_CLOSE_ALL_TEST_ID).first()).toBeVisible();

      // Глобальный dismiss-all из стори очищает все 6 контейнеров.
      await getByTestId(TRIGGER_STACKING_DISMISS_ALL_TEST_ID).click();
      await expect(getByTestId(SYSTEM_EVENT_TEST_ID)).toHaveCount(0);
    });
  });

  test.describe('UpdateFlow', () => {
    test('SystemEvent: pending neutral → success appearance через update.success(id, …)', async ({
      gotoStory,
      getByTestId,
    }) => {
      await gotoStory(buildStoryOptions(TOASTER_STORIES.updateFlow));

      await getByTestId(TRIGGER_UPDATE_SYSTEM_SUCCESS_TEST_ID).click();
      const toast = getByTestId(SYSTEM_EVENT_TEST_ID).first();
      await expect(toast).toBeVisible();
      // Сначала появляется neutral pending тост, через ~1500мс он апдейтится в success.
      await expect(toast).toHaveAttribute('data-appearance', 'success');
    });

    test('UserAction: pending → resolved (тост остаётся видимым после update)', async ({ gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(TOASTER_STORIES.updateFlow));

      await getByTestId(TRIGGER_UPDATE_USER_ACTION_TEST_ID).click();
      const toast = getByTestId(USER_ACTION_TEST_ID).first();
      await expect(toast).toBeVisible();
    });
  });

  test.describe('swipe-to-dismiss', () => {
    test('горизонтальный свайп за порог закрывает тост', async ({ page, gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(TOASTER_STORIES.playground, DRAGGABLE_ARGS));

      await getByTestId(TRIGGER_SPAWN_TEST_ID).click();
      const toast = getByTestId(SYSTEM_EVENT_TEST_ID).first();
      await expect(toast).toBeVisible();

      const box = await toast.boundingBox();
      if (!box) throw new Error('toast has no bounding box');
      const startX = box.x + box.width / 2;
      const startY = box.y + box.height / 2;
      // Свайп вправо на ~80% ширины — гарантированно превышает 40%-порог.
      const endX = startX + box.width * 0.8;

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      // Несколько промежуточных шагов — иначе pointermove не активирует drag
      // (внутри порог ~4px на одно событие). По шагам имитируем естественный жест.
      for (let i = 1; i <= 10; i += 1) {
        await page.mouse.move(startX + ((endX - startX) * i) / 10, startY);
      }
      await page.mouse.up();

      // Тост уезжает и пропадает после leave-анимации — toBeHidden auto-retries.
      await expect(toast).toBeHidden();
    });

    test('короткий свайп не достигает порог — тост остаётся', async ({ page, gotoStory, getByTestId }) => {
      await gotoStory(buildStoryOptions(TOASTER_STORIES.playground, DRAGGABLE_ARGS));

      await getByTestId(TRIGGER_SPAWN_TEST_ID).click();
      const toast = getByTestId(SYSTEM_EVENT_TEST_ID).first();
      await expect(toast).toBeVisible();

      const box = await toast.boundingBox();
      if (!box) throw new Error('toast has no bounding box');
      const startX = box.x + box.width / 2;
      const startY = box.y + box.height / 2;
      // Сдвиг ~15% ширины — порог 40% не достигнут, тост возвращается.
      const endX = startX + box.width * 0.15;

      await page.mouse.move(startX, startY);
      await page.mouse.down();
      for (let i = 1; i <= 5; i += 1) {
        await page.mouse.move(startX + ((endX - startX) * i) / 5, startY);
      }
      await page.mouse.up();

      // После snap-back тост остаётся видим — toBeVisible auto-retries.
      await expect(toast).toBeVisible();

      // Чистим за собой.
      await getByTestId(TRIGGER_DISMISS_ALL_TEST_ID).click();
    });
  });
});
