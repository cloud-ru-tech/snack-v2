import { OVERLAY_SURFACE, SheetBody, SheetFooter, SheetHeader, useOverlaySurface } from '@ds/bottom-sheet';

import { ModalBody, ModalBodyProps } from './ModalBody';
import { ModalFooter, ModalFooterProps } from './ModalFooter';
import { ModalHeader, ModalHeaderProps } from './ModalHeader';

/**
 * Surface-aware header-слот: sheet-рендер внутри `BottomSheet` (mobile), modal-рендер в desktop-frame.
 * Props — суперсет (modal-рендер добавляет `subtitle`/`truncate`; sheet-рендер их игнорирует).
 */
export type DialogHeaderProps = ModalHeaderProps;
export type DialogBodyProps = ModalBodyProps;
export type DialogFooterProps = ModalFooterProps;

export function DialogHeader(props: DialogHeaderProps) {
  return useOverlaySurface() === OVERLAY_SURFACE.Sheet ? <SheetHeader {...props} /> : <ModalHeader {...props} />;
}

export function DialogBody(props: DialogBodyProps) {
  return useOverlaySurface() === OVERLAY_SURFACE.Sheet ? <SheetBody {...props} /> : <ModalBody {...props} />;
}

export function DialogFooter(props: DialogFooterProps) {
  return useOverlaySurface() === OVERLAY_SURFACE.Sheet ? <SheetFooter {...props} /> : <ModalFooter {...props} />;
}
