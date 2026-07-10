import { KeyboardEvent, MouseEvent } from 'react';

export function stopEventPropagation(event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) {
  event.stopPropagation();
}
