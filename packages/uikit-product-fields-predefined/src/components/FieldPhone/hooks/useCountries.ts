import { useMemo } from 'react';

import { ALL_COUNTRY_CODES } from '../countries';
import { Country, CountrySettings, FieldPhoneOptionsProps } from '../types';
import { uniqueSet } from '../utils';
import { useMapCountryToOptions } from './useMapCountryToOptions';

export function useCountries(optionsSettings?: CountrySettings): FieldPhoneOptionsProps[] {
  const mapCountryToOption = useMapCountryToOptions();

  const filterCountries = useMemo(() => {
    if (!optionsSettings) {
      return () => true;
    }

    const { includedCountries, excludedCountries } = optionsSettings;
    const uniqueKey = 'value' satisfies keyof Country;

    if (includedCountries) {
      const includedSet = uniqueSet(includedCountries, uniqueKey);
      return (country: Country) => includedSet.has(country[uniqueKey]);
    }
    if (excludedCountries) {
      const excludedSet = uniqueSet(excludedCountries, uniqueKey);
      return (country: Country) => !excludedSet.has(country[uniqueKey]);
    }
    return () => true;
  }, [optionsSettings]);

  return useMemo(() => {
    if (optionsSettings?.overriddenOptions) return optionsSettings.overriddenOptions;

    return ALL_COUNTRY_CODES.reduce<FieldPhoneOptionsProps[]>((result, country) => {
      if (filterCountries(country)) {
        result.push(mapCountryToOption(country));
      }
      return result;
    }, []);
  }, [optionsSettings, filterCountries, mapCountryToOption]);
}
