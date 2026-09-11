import { Size } from '@ds/field-decorator';
import { Size as TagSize } from '@ds/tag';

/** Соответствие размера поля размеру чипа выбранного значения (`selection='multiple'`). */
export const TAG_SIZE_MAP: Record<Size, TagSize> = { s: 'xs', m: 'xs', l: 's' };
