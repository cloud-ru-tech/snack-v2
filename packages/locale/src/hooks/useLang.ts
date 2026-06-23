import { useLocaleContext } from '../context/localeContext';
import { Lang } from '../types/locale';

/** Текущий язык из контекста — для потребителей, которым перевод не нужен, только тег языка. */
export function useLang(): Lang {
  return useLocaleContext().lang;
}
