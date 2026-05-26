import { RefObject, useEffect } from 'react';

import { TOOLBAR_ITEM } from '../../../constants';
import { ToolbarApi } from '../../../toolbarApi';
import { ToolbarItemId } from '../../../types';
import { BUTTONS } from '../constants';

// Сопоставляет KeyboardEvent с хоткеем вида 'Ctrl+Shift+I' (Cmd подменяет Ctrl на macOS).
const matchesHotkey = (event: KeyboardEvent, hotkey: string) => {
  const parts = hotkey.toLowerCase().split('+');
  const last = parts[parts.length - 1];
  // С Shift цифры дают символ (Shift+8 → '*'), поэтому помимо event.key матчим и по event.code
  // (Digit8 / KeyB) — иначе Ctrl+Shift+8/7 не распознались бы.
  const code = event.code.toLowerCase();
  const keyMatches = event.key.toLowerCase() === last || code === `key${last}` || code === `digit${last}`;
  return (
    (event.ctrlKey || event.metaKey) === parts.includes('ctrl') &&
    event.shiftKey === parts.includes('shift') &&
    event.altKey === parts.includes('alt') &&
    keyMatches
  );
};

type ToolbarHotkeysParams = {
  /** Корень тулбара (из useToolbarOverflow) — от его родителя ищем scope-предка для listener'а. */
  rootRef: RefObject<HTMLDivElement | null>;
  items: ToolbarItemId[];
  api: ToolbarApi;
  /** Действие кнопки Link (открыть модалку или вставить сырой markdown). */
  onLink(): void;
  /** Действие кнопки Image (открыть модалку). */
  onImage(): void;
};

/**
 * Вешает хоткеи тулбара на корень редактора (scope), а не на конкретный input:
 * - Link/Image открывают UI (модалку/пикер), а не команды TipTap → биндим всегда;
 * - остальные кнопки (bold/italic/…) в WYSIWYG обрабатывает сам keymap TipTap, а в raw-режиме
 *   textarea их не знает, поэтому в raw биндим все hotkey'и на api-команды вручную.
 */
export function useToolbarHotkeys({ rootRef, items, api, onLink, onImage }: ToolbarHotkeysParams) {
  useEffect(() => {
    // Ищем scope от РОДИТЕЛЯ тулбара: у самого toolbar-root есть data-test-id, и closest вернул бы
    // его же — а input (textarea/ProseMirror) лежит рядом, не внутри тулбара. Нужен общий предок
    // (оболочка поля), который содержит и тулбар, и input, чтобы keydown из input всплывал к нему.
    const scope = rootRef.current?.parentElement?.closest<HTMLElement>('[data-test-id]');
    if (!scope) return;

    const bindings: { hotkey: string; action: () => void }[] = [];
    for (const id of items) {
      const hotkey = BUTTONS[id]?.hotkey;
      if (!hotkey) continue;

      if (id === TOOLBAR_ITEM.Link) {
        bindings.push({ hotkey, action: onLink });
      } else if (id === TOOLBAR_ITEM.Image) {
        bindings.push({ hotkey, action: onImage });
      } else if (api.mode === 'raw') {
        bindings.push({ hotkey, action: () => api.toggle(id) });
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      const hit = bindings.find(binding => matchesHotkey(event, binding.hotkey));
      if (hit) {
        event.preventDefault();
        hit.action();
      }
    };

    scope.addEventListener('keydown', handleKeyDown);
    return () => scope.removeEventListener('keydown', handleKeyDown);
  }, [items, api, onLink, onImage, rootRef]);
}
