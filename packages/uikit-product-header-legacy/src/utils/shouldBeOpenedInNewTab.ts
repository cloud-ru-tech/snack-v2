import { MouseEvent } from 'react';

export function shouldBeOpenedInNewTab(e?: MouseEvent<HTMLElement>): boolean {
  return Boolean(e?.metaKey || e?.ctrlKey);
}
