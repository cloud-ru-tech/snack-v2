// Единая кнопка закрытия overlay'я вынесена в `@ds/popup-private`; имена `ButtonClose`/`ButtonCloseProps` сохранены как фасад.
export { PopupCloseButton as ButtonClose } from '@ds/popup-private';
export type { PopupCloseButtonProps as ButtonCloseProps } from '@ds/popup-private';
// Surface-поверхности адаптивного Drawer'а: sheet-рендер на mobile (через `@ds/bottom-sheet`), drawer-рендер в desktop-frame.
export * from './DesktopDrawer';
export * from './MobileDrawer';
// Surface-aware слоты дровера: sheet-рендер на mobile (через `@ds/bottom-sheet`), drawer-рендер в desktop-frame.
export { DialogBody, DialogFooter, DialogHeader } from './DialogSlots';
export type { DialogBodyProps, DialogFooterProps, DialogHeaderProps } from './DialogSlots';
export { DrawerBody } from './DrawerBody';
export type { DrawerBodyProps } from './DrawerBody';
