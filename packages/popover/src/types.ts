import type { PopoverPrivateProps } from '@design-system/popover-private';
import type { ReactNode } from 'react';

/**
 * Public Popover props. Wraps PopoverPrivate with `content` as the main slot for popover body.
 * All positioning, trigger and behavior props are passed through to PopoverPrivate.
 */
export type PopoverProps = Omit<
  PopoverPrivateProps,
  'popoverContent' | 'hasArrow' | 'arrowContainerClassName' | 'arrowElementClassName'
> & {
  /** Контент поповера (отображается внутри контейнера по макету) */
  content: ReactNode;
};
