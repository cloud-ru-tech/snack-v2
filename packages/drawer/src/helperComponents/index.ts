export * from './ButtonClose';
// Surface-поверхности адаптивного Drawer'а: sheet-рендер на mobile (через `@ds/bottom-sheet`), drawer-рендер в desktop-frame.
export * from './DesktopDrawer';
export * from './MobileDrawer';
// Surface-aware слоты дровера: sheet-рендер на mobile (через `@ds/bottom-sheet`), drawer-рендер в desktop-frame.
export { DialogBody, DialogFooter, DialogHeader } from './DialogSlots';
export type { DialogBodyProps, DialogFooterProps, DialogHeaderProps } from './DialogSlots';
export { DrawerBody } from './DrawerBody';
export type { DrawerBodyProps } from './DrawerBody';
export { DrawerFooter } from './DrawerFooter';
export type { DrawerFooterProps } from './DrawerFooter';
export { DrawerHeader } from './DrawerHeader';
export type { DrawerHeaderProps } from './DrawerHeader';
