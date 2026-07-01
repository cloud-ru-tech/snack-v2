// Internal surface-компоненты адаптивных InfoRow/InfoGroup. В публичный API пакета НЕ уходят
// (канон: единый XProps, без Desktop*/Mobile* в публичном барреле) — потребляются только
// свитчерами `components/InfoRow` и `components/InfoGroup`.
export * from './DesktopInfoRow';
export * from './DesktopInfoGroup';
export * from './MobileInfoRow';
export * from './MobileInfoGroup';
