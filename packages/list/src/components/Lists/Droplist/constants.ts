import { DropdownProps } from '@ds/dropdown';

export const DEFAULT_FALLBACK_PLACEMENTS: DropdownProps['fallbackPlacements'] = ['top', 'right', 'bottom', 'left'];

/**
 * Возврат фокуса/фокусировка списка откладывается на следующий тик (0ms),
 * чтобы дождаться размонтирования/монтирования портала дроплиста.
 */
export const FOCUS_DEFERRAL_TIMEOUT = 0;

export const DEFAULT_SIZE = 'm';
