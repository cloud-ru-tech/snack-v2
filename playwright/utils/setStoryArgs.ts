import { Page } from '@playwright/test';

/** Сколько раз пытаемся доставить args через канал preview, прежде чем признать неудачу. */
const ARGS_APPLY_ATTEMPTS = 3;

/**
 * Меняет args уже загруженной story через preview-канал, без перезагрузки документа.
 * Навигация стоит ~1.25с на CI, смена args — единицы миллисекунд, поэтому матричные спеки,
 * где ячейки различаются только пропсами, ходят на story один раз.
 *
 * Ограничения на вызывающей стороне:
 *
 * - Стор args мержится, а не заменяется: чтобы убрать проп, передай ему `undefined`.
 * - Внутреннее состояние компонента (`defaultChecked`, открытые порталы, скролл) не
 *   сбрасывается — для этого `remountStory`.
 * - Фокус и позиция курсора переживают смену args: перед hover/focus состояние ввода
 *   сбрасывается явно, иначе `Tab` переместится не на тот элемент.
 */
export async function setStoryArgs(page: Page, args: Record<string, unknown>): Promise<void> {
  const argNames = Object.entries(args)
    .filter(([, value]) => value !== undefined)
    .map(([name]) => name);

  for (let attempt = 0; attempt < ARGS_APPLY_ATTEMPTS; attempt += 1) {
    const emitted = await page.evaluate(updatedArgs => {
      const preview = (
        window as unknown as {
          __STORYBOOK_PREVIEW__?: {
            channel?: { emit(event: string, payload: unknown): void };
            selectionStore?: { selection?: { storyId?: string } };
          };
        }
      ).__STORYBOOK_PREVIEW__;

      const storyId = preview?.selectionStore?.selection?.storyId;
      if (!preview?.channel || !storyId) return false;

      preview.channel.emit('updateStoryArgs', { storyId, updatedArgs });
      return true;
    }, args);

    if (!emitted) {
      throw new Error('setStoryArgs: preview-канал недоступен — story ещё не загружена?');
    }

    // Под нагрузкой канал доставляет событие не всегда — недоставку ловим здесь, иначе она
    // всплывёт флейком в произвольном месте спека.
    const applied =
      argNames.length === 0 ||
      (await page
        .waitForFunction(
          expected => {
            const preview = (
              window as unknown as {
                __STORYBOOK_PREVIEW__?: {
                  storyStoreValue?: { args?: { argsByStoryId?: Record<string, Record<string, unknown>> } };
                  selectionStore?: { selection?: { storyId?: string } };
                };
              }
            ).__STORYBOOK_PREVIEW__;
            const storyId = preview?.selectionStore?.selection?.storyId ?? '';
            const storyArgs = preview?.storyStoreValue?.args?.argsByStoryId?.[storyId];

            return Boolean(storyArgs) && expected.every(name => name in (storyArgs as Record<string, unknown>));
          },
          argNames,
          { timeout: 2000 },
        )
        .then(() => true)
        .catch(() => false));

    if (applied) {
      // React коммитит следующим кадром — без ожидания снимок поймает прошлую конфигурацию.
      await page.evaluate(
        () =>
          new Promise<void>(resolve => {
            // eslint-disable-next-line @cloud-ru/ssr-safe-react/domApi -- исполняется в браузере
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
          }),
      );
      return;
    }
  }

  throw new Error(`setStoryArgs: args не доехали до стори за ${ARGS_APPLY_ATTEMPTS} попыток: ${argNames.join(', ')}`);
}
