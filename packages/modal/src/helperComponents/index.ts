export { ButtonClose } from './ButtonClose';
export type { ButtonCloseProps } from './ButtonClose';
// Internal surface-поверхности адаптивного `Modal` (наружу из `src/index.ts` не реэкспортятся).
export { DesktopModal } from './DesktopModal';
export { MobileModal } from './MobileModal';
// Surface-aware слоты модалки: sheet-рендер на mobile (через `@ds/bottom-sheet`), modal-рендер в desktop-frame.
export { DialogBody, DialogFooter, DialogHeader } from './DialogSlots';
export type { DialogBodyProps, DialogFooterProps, DialogHeaderProps } from './DialogSlots';
export { ModalBody } from './ModalBody';
export type { ModalBodyProps } from './ModalBody';
export { ModalFooter } from './ModalFooter';
export type { ModalFooterProps } from './ModalFooter';
export { ModalHeader } from './ModalHeader';
export type { ModalHeaderProps } from './ModalHeader';
