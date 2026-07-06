import { createElement, useCallback } from 'react';

import { fieldsPredefinedLocale } from '../../../locale';
import { FLAG_ICON_SIZE } from '../constants';
import { Country, FieldPhoneOptionsProps } from '../types';

export function useMapCountryToOptions() {
  const { t } = fieldsPredefinedLocale.useTranslations();

  const mapCountryToOption = useCallback(
    ({ value: id, mask, caption, icon, iso2 }: Country): FieldPhoneOptionsProps => ({
      id,
      mask,
      content: {
        option: t(`FieldPhone.${id}`),
        caption,
      },
      beforeContent: createElement(icon, { size: FLAG_ICON_SIZE }),
      iso2,
    }),
    [t],
  );

  return mapCountryToOption;
}
