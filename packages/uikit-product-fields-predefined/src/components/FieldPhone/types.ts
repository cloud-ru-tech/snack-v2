import { ReactNode } from 'react';
import { useIMask } from 'react-imask';

import { ALL_COUNTRY_CODES } from './countries';

export type FieldPhoneOptionsProps = {
  id: string;
  beforeContent: ReactNode;
  content: {
    label: string;
    caption: string;
  };
  mask: string;
  iso2: string;
};

export type MaskOptions = Parameters<typeof useIMask>[0];

export type Country = (typeof ALL_COUNTRY_CODES)[number];

type OneOf<T extends object> = {
  [K in keyof T]: { [P in K]: T[P] } & { [P in Exclude<keyof T, K>]?: never };
}[keyof T];

export type CountrySettings = OneOf<{
  /** Список элементов выпадающего списка со странами; переопределяет встроенный список пакета */
  overriddenOptions: FieldPhoneOptionsProps[];
  /** Список стран, которые должны отображаться в селекторе (из встроенного перечня пакета) */
  includedCountries: Country[];
  /** Список стран, которые будут исключены из встроенного перечня пакета */
  excludedCountries: Country[];
}>;
