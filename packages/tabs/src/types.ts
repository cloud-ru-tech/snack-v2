import { ValueOf } from '@ds/utils';

import { MARKER_POSITION, ORIENTATION, VARIANT } from './constants';

export type Variant = ValueOf<typeof VARIANT>;
export type Orientation = ValueOf<typeof ORIENTATION>;
export type MarkerPosition = ValueOf<typeof MARKER_POSITION>;
export type Direction = 'left' | 'right' | 'top' | 'bottom';

export type TabsContextValue = {
  orientation: Orientation;
  selectedTab?: string;
  setSelectedTab(id: string): void;
};

export type TabBarContextValue = Partial<{
  variant: Variant;
  orientation: Orientation;
  focusedTab: string;
  onSelect(element: HTMLButtonElement): void;
  onFocus(element: HTMLElement, id: string): void;
  markerPosition: MarkerPosition;
}>;
