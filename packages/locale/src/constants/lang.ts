import { Lang } from '../types/locale';

export const DEFAULT_LANG: Lang = 'en-GB';
/** Языки, для которых DS поставляет строки из коробки. Мягкая подсказка, не ограничение `lang`. */
export const BUILTIN_LANGS = ['en-GB', 'ru-RU'] as const;

/**
 * Псевдоязык i18next `cimode` (code inference mode): в этом режиме `t()` возвращает сам ключ вместо
 * перевода. Нужен для отладки строк и скриншотов ключей. Это валидное значение `lang`, не отдельная ось.
 */
export const CIMODE: Lang = 'cimode';

/** DS-поддерживаемые языки именованными константами — типизированная альтернатива строковым литералам. */
export const LANG = {
  EnGB: 'en-GB',
  RuRU: 'ru-RU',
  Cimode: CIMODE,
} as const;
