export * from './components';
export * from './constants';
// Surface-context: общие слоты (`Dialog*`) ветвят визуал по нему; frame (sheet / modal / drawer)
// его проставляет. Вынесен в `@ds/popup-private`, реэкспортируем для внешнего контракта.
export {
  OVERLAY_SURFACE,
  OverlaySurfaceProvider,
  useOverlayBodyHeightAuto,
  useOverlaySurface,
} from '@ds/popup-private';
export type { OverlaySurface } from '@ds/popup-private';
// Публичный footer-builder — единый источник правды для футера BottomSheet / Modal / Drawer
// (типизированные кнопки approve/cancel/additional).
export { FooterActions } from '@ds/popup-private';
export type { FooterActionsProps, FooterActionsTestIds } from '@ds/popup-private';
// Sheet-слоты под собственными именами (фасад над `@ds/popup-private`). Доступны и через namespace
// `BottomSheetCustom.Header/.Body/.Footer/.Media`. Modal/drawer оборачивают их своими surface-aware
// dispatcher'ами.
export {
  PopupBody as SheetBody,
  PopupFooter as SheetFooter,
  PopupHeader as SheetHeader,
  PopupMedia as DialogMedia,
} from '@ds/popup-private';
export type {
  PopupBodyProps as SheetBodyProps,
  PopupFooterProps as SheetFooterProps,
  PopupHeaderProps as SheetHeaderProps,
} from '@ds/popup-private';
export * from './types';
