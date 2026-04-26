import { ValueOf } from '@ds/utils';

import { MARKER_POSITION, ORIENTATION, SIZE } from './constants';

export type Size = ValueOf<typeof SIZE>;
export type Orientation = ValueOf<typeof ORIENTATION>;
export type MarkerPosition = ValueOf<typeof MARKER_POSITION>;
export type Direction = 'left' | 'right' | 'top' | 'bottom';

export type TabsContextValue = {
  selectedTab?: string;
  setSelectedTab(id: string): void;
};

export type TabBarContextValue = Partial<{
  size: Size;
  orientation: Orientation;
  focusedTab: string;
  onSelect(element: HTMLButtonElement): void;
  onFocus(element: HTMLElement, id: string): void;
}>;
