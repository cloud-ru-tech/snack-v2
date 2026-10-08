import { useMemo } from 'react';

import { CountrySettings, FieldPhoneOptionsProps } from '../types';
import { useMapCountryToOptions } from './useMapCountryToOptions';

function getOptionsKey({ includedCountries, overriddenOptions }: CountrySettings): string {
  if (overriddenOptions) {
    return overriddenOptions
      .map(({ id, iso2, mask, content }) => [id, iso2, mask, content.label, content.caption].join(':'))
      .join();
  }

  return includedCountries.map(({ value }) => value).join();
}

export function useCountries(optionsSettings: CountrySettings): FieldPhoneOptionsProps[] {
  const mapCountryToOption = useMapCountryToOptions();
  const optionsKey = getOptionsKey(optionsSettings);

  return useMemo(
    () => optionsSettings.overriddenOptions ?? optionsSettings.includedCountries.map(mapCountryToOption),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [optionsKey, mapCountryToOption],
  );
}
