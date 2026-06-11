import { MouseEvent } from 'react';

/** Останавливает всплытие клика — чтобы вложенные контролы не активировали кликабельную карточку. */
export function stopPropagationClick(e: MouseEvent<HTMLElement>) {
  e.stopPropagation();
}
