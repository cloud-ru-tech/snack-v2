import { useCallback } from 'react';

import { fieldsPredefinedLocale } from '../../../locale';
import { isNumberChar } from '../utils';

export type UseFieldCodeValidateParams = {
  /** Ожидаемая длина кода (количество цифр) */
  codeLength: number;
};

/** Возвращает функцию валидации значения кода: пустое значение / неполный код. */
export function useFieldCodeValidate(params: UseFieldCodeValidateParams) {
  const { codeLength } = params;
  const { t } = fieldsPredefinedLocale.useTranslations();

  return useCallback(
    (value?: string | number) => {
      const str = value != null ? String(value) : '';
      const digits = str.split('').filter(isNumberChar).join('');
      if (digits.length === 0) {
        return t('FieldCode.required');
      }

      if (digits.length < codeLength) {
        return t('FieldCode.minLength', { count: codeLength });
      }

      return undefined;
    },
    [codeLength, t],
  );
}
