import { Page } from '@playwright/test';

/** Фазы рендера preview, после которых story считается отрисованной. Совпадает с `gotoStory`. */
const SETTLED_PHASES = ['completing', 'completed', 'afterEach', 'finished', 'aborted', 'errored'];

/**
 * Перемонтирует текущую story без перезагрузки документа: React-корень пересоздаётся,
 * `useState` возвращается к начальному. Для спеков, снимающих несколько состояний подряд, —
 * та же гарантия сброса, что даёт повторный `gotoStory`, но без загрузки страницы.
 *
 * При недоступном канале откатывается на перезагрузку: снимать несброшенное состояние хуже,
 * чем потерять выигрыш.
 */
export async function remountStory(page: Page): Promise<void> {
  const storyId = await page.evaluate(() => {
    const preview = (
      window as unknown as {
        __STORYBOOK_PREVIEW__?: {
          channel?: { emit(event: string, payload: unknown): void };
          currentRender?: { id?: string };
        };
      }
    ).__STORYBOOK_PREVIEW__;

    const id = preview?.currentRender?.id;
    if (!preview?.channel || !id) return null;

    preview.channel.emit('forceRemount', { storyId: id });
    return id;
  });

  if (!storyId) {
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForLoadState('load');
    return;
  }

  await page.waitForFunction(
    ([id, phases]: [string, string[]]) => {
      const preview = (
        window as unknown as { __STORYBOOK_PREVIEW__?: { currentRender?: { id?: string; phase?: string } } }
      ).__STORYBOOK_PREVIEW__;

      return preview?.currentRender?.id === id && phases.includes(preview.currentRender?.phase ?? '');
    },
    [storyId, SETTLED_PHASES] as [string, string[]],
    { timeout: 15000 },
  );
}
