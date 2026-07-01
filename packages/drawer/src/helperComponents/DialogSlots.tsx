import { OVERLAY_SURFACE, SheetBody, SheetFooter, SheetHeader, useOverlaySurface } from '@ds/bottom-sheet';

import { DrawerBody, DrawerBodyProps } from './DrawerBody';
import { DrawerFooter, DrawerFooterProps } from './DrawerFooter';
import { DrawerHeader, DrawerHeaderProps } from './DrawerHeader';

/** Surface-aware слоты дровера: sheet-рендер внутри `BottomSheet` (mobile), drawer-рендер в desktop-frame. */
export type DialogHeaderProps = DrawerHeaderProps;
export type DialogBodyProps = DrawerBodyProps;
export type DialogFooterProps = DrawerFooterProps;

export function DialogHeader(props: DialogHeaderProps) {
  return useOverlaySurface() === OVERLAY_SURFACE.Sheet ? <SheetHeader {...props} /> : <DrawerHeader {...props} />;
}

export function DialogBody(props: DialogBodyProps) {
  return useOverlaySurface() === OVERLAY_SURFACE.Sheet ? <SheetBody {...props} /> : <DrawerBody {...props} />;
}

export function DialogFooter(props: DialogFooterProps) {
  return useOverlaySurface() === OVERLAY_SURFACE.Sheet ? <SheetFooter {...props} /> : <DrawerFooter {...props} />;
}
