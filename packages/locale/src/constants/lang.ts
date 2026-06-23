import { Lang } from '../types/locale';

export const DEFAULT_LANG: Lang = 'en-GB';
/** Языки, для которых DS поставляет строки из коробки. Мягкая подсказка, не ограничение `lang`. */
export const BUILTIN_LANGS = ['en-GB', 'ru-RU'] as const;
