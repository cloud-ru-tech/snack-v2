import { MouseEvent } from 'react';

/** Отменяет перенос фокуса на кнопку при нажатии мышью: фокус и каретка остаются там, где были. */
export function keepFocusOnMouseDown(event: MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
}
