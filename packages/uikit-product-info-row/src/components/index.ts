// Публичные — адаптивные InfoRow/InfoGroup; Desktop*/Mobile* internal (не реэкспортятся).
export * from './InfoGroup';
export * from './InfoRow';

// Общий публичный словарь типов/констант/утилит домена. Из `*/types` реэкспортим только нейтральные
// доменные типы — внутренние `DesktopInfoRowProps`/`DesktopInfoRowPropsBase`/`DesktopInfoGroupProps`
// наружу НЕ уходят (канон: единый XProps, без `Desktop*Props` в публичном барреле).
export type { InfoGroupItem } from '../helperComponents/DesktopInfoGroup/types';
export type {
  DataType,
  InfoRowColumn,
  InfoRowFieldItem,
  RowActionButton,
  RowActionsPair,
} from '../helperComponents/DesktopInfoRow/types';
export * from '../helperComponents/DesktopInfoRow/constants';
export * from '../helperComponents/DesktopInfoRow/utils';
export { InfoRowActionPlaceholder } from '../helperComponents/DesktopInfoRow/DesktopInfoRow';
export { withTip } from '../helperComponents/DesktopInfoRow/utils/renderHelpers';
