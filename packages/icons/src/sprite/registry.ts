/**
 * Шина «спрайт смонтирован в документ».
 *
 * Sprite-иконки рендерят инлайн-fallback до тех пор, пока символ спрайта не появится в DOM
 * (SSR, ранняя гидрация, асинхронная загрузка через `SpriteFromUrl`). Чтобы иконка, уже
 * ушедшая в fallback, переключилась на `<use>` после поздней вставки спрайта, `Sprite` и
 * `SpriteFromUrl` нотифицируют шину, а каждая смонтированная иконка подписана на неё.
 *
 * Транспорт — DOM-событие на `document`, а не module-scope коллекция: при дублировании
 * инстансов модуля в бандле потребителя (cjs+esm, несколько копий пакета) module-scope
 * подписки развалились бы, документ же один.
 */
import { isBrowser } from '@ds/utils';

const SPRITE_MOUNTED_EVENT = 'ds-icons:sprite-mounted';

/** Вызывается компонентами спрайтов после вставки содержимого спрайта в DOM. */
export function notifySpriteMounted(): void {
  if (isBrowser()) {
    document.dispatchEvent(new Event(SPRITE_MOUNTED_EVENT));
  }
}

/** Подписка на появление нового спрайта в DOM. Возвращает отписку (готово для cleanup эффекта). */
export function subscribeSpriteMounted(listener: () => void): () => void {
  if (isBrowser()) {
    document.addEventListener(SPRITE_MOUNTED_EVENT, listener);

    return () => document.removeEventListener(SPRITE_MOUNTED_EVENT, listener);
  }

  return () => {};
}
