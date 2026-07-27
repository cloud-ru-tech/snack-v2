import {
  OVERLAY_SURFACE,
  SheetBody,
  SheetFooter,
  SheetFooterProps,
  SheetHeader,
  SheetHeaderProps,
  useOverlaySurface,
} from '@ds/bottom-sheet';

import { ModalBody, ModalBodyProps } from './ModalBody';

// Header и Footer surface-aware реализует сам `PopupHeader`/`PopupFooter` (`SheetHeader`/`SheetFooter`):
// он читает `OverlaySurfaceProvider` и рисует window-раскладку на modal, bottomSheet — на sheet.
// Свап остаётся только для Body (desktop-frame vs sheet).
export type DialogHeaderProps = SheetHeaderProps;
export type DialogBodyProps = ModalBodyProps;
export type DialogFooterProps = SheetFooterProps;

export const DialogHeader = SheetHeader;
export const DialogFooter = SheetFooter;

export function DialogBody(props: DialogBodyProps) {
  return useOverlaySurface() === OVERLAY_SURFACE.Sheet ? <SheetBody {...props} /> : <ModalBody {...props} />;
}
