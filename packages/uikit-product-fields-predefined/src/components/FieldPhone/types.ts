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
  /**
   * Страны селектора в порядке передачи. В бандл попадают флаги только переданных стран;
   * весь встроенный перечень — `ALL_COUNTRY_CODES`.
   */
  includedCountries: readonly Country[];
  /** Собственные элементы выпадающего списка вместо встроенных стран */
  overriddenOptions: FieldPhoneOptionsProps[];
}>;
