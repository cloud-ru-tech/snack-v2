import { KeyboardEvent, MouseEvent } from 'react';

export function stopEventPropagation(event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) {
  event.stopPropagation();
}

export function preventEventDefault(event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) {
  event.preventDefault();
}

export function preventEventDefaultAndPropagation(event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) {
  stopEventPropagation(event);
  preventEventDefault(event);
}
