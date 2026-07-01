export * from './components';
export * from './constants';
// Surface-context: общие слоты (`Dialog*`) ветвят визуал по нему; frame (sheet / modal / drawer)
// его проставляет. На фазе 1 актуальна только поверхность `'sheet'`.
export * from './context/overlaySurface';
// Публичный footer-builder — единый источник правды для футера BottomSheet / Modal / Drawer
// (типизированные кнопки approve/cancel/additional).
export * from './utils/buildFooterActions';
// Sheet-слоты под собственными именами. Доступны и через namespace `BottomSheetCustom.Header/.Body/.Footer/.Media`.
// Modal/drawer оборачивают их своими surface-aware dispatcher'ами (`OVERLAY_SURFACE` остаётся здесь — нейтральная инфра).
export { Media as DialogMedia, SheetBody, SheetFooter, SheetHeader } from './helperComponents';
export type { SheetHeaderProps } from './helperComponents/SheetHeader';
export type { SheetBodyProps } from './helperComponents/SheetBody';
export type { SheetFooterProps } from './helperComponents/SheetFooter';
export * from './types';
