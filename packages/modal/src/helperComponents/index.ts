// Единая кнопка закрытия overlay'я вынесена в `@ds/popup-private`; имена `ButtonClose`/`ButtonCloseProps` сохранены как фасад.
export { PopupCloseButton as ButtonClose } from '@ds/popup-private';
export type { PopupCloseButtonProps as ButtonCloseProps } from '@ds/popup-private';
// Internal surface-поверхности адаптивного `Modal` (наружу из `src/index.ts` не реэкспортятся).
export { DesktopModal } from './DesktopModal';
export { MobileModal } from './MobileModal';
// Surface-aware слоты модалки: sheet-рендер на mobile (через `@ds/bottom-sheet`), modal-рендер в desktop-frame.
export { DialogBody, DialogFooter, DialogHeader } from './DialogSlots';
export type { DialogBodyProps, DialogFooterProps, DialogHeaderProps } from './DialogSlots';
export { ModalBody } from './ModalBody';
export type { ModalBodyProps } from './ModalBody';
