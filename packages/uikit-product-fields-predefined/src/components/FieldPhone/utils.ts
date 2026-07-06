import { parsePhoneNumber } from 'awesome-phonenumber';

import { ABKHAZIA_COUNTRY_CODE, RUSSIA_COUNTRY_CODE } from './countries';
import { FieldPhoneOptionsProps } from './types';

export const uniqueSet = <T, K extends keyof T>(arr: T[], key: K): Set<T[K]> => new Set(arr.map(obj => obj[key]));

/* Приходит +79878887879/+7987****875, на основании mask возвращается +7 987-888-78-79/+7 987-***-*8-75 */
export const formatPhoneNumber = <T extends { caption: string; mask: string }>(
  phone: string,
  countries: readonly T[],
): string => {
  const digits = phone.replace(/[^\d*]/g, '');

  const country = countries.find(item => digits.startsWith(item.caption.replace('+', '')));

  if (!country) {
    return phone;
  }

  const countryCode = country.caption.replace('+', '');
  const restNumber = digits.slice(countryCode.length);

  let formatted = '';
  let index = 0;
  for (const char of country.mask) {
    if (char === 'X') {
      formatted += restNumber.charAt(index) || '';
      index++;
    } else {
      formatted += char;
    }
  }

  return `${country.caption} ${formatted}`;
};

const byId = (id: string) => (option: FieldPhoneOptionsProps) => option.id === id;

export function detectCountryByPhone(text: string, options: FieldPhoneOptionsProps[]) {
  const cleaned = text.replace(/[^\d+]/g, '');

  const withPlus = cleaned.startsWith('+') ? cleaned : `+${cleaned}`;
  const parsedNumber = parsePhoneNumber(withPlus);
  const regionCode = parsedNumber.regionCode;

  /* У Абхазии iso2 совпадает с Россией */
  if (/^\+?7(840|940)/.test(cleaned)) {
    let russia: FieldPhoneOptionsProps | undefined;

    for (const option of options) {
      const id = option.id;
      const iso = option.iso2;

      if (id === ABKHAZIA_COUNTRY_CODE.value) {
        return option;
      }
      if (!russia && (id === RUSSIA_COUNTRY_CODE.value || iso === RUSSIA_COUNTRY_CODE.iso2)) {
        russia = option;
      }
    }

    return russia;
  }

  if (regionCode === RUSSIA_COUNTRY_CODE.iso2) {
    return options.find(byId(RUSSIA_COUNTRY_CODE.value));
  }

  return options.find(opt => opt.iso2 === regionCode);
}

export const handleAutoInsert = ({
  raw,
  onValueChange,
  onCountryChange,
  country,
  options,
}: {
  raw: string;
  onValueChange(str: string): void;
  onCountryChange(country: FieldPhoneOptionsProps): void;
  country?: FieldPhoneOptionsProps;
  options: FieldPhoneOptionsProps[];
}) => {
  if (!raw) return;

  const parsed = parsePhoneNumber(raw);
  const ok = parsed.valid || parsed.possible;
  if (!ok) return;

  const detected = detectCountryByPhone(raw, options);
  if (!detected) return;

  let national = parsed.number?.significant.replace(/\D/g, '');
  if (!national) return;

  const nextNationalLength = (detected.mask?.match(/X/g) ?? []).length;
  if (nextNationalLength && national.length > nextNationalLength) {
    national = national.slice(-nextNationalLength);
  }

  const fullDigits = (parsed.number?.e164 ?? raw).replace(/\D/g, '');
  const countryCodeDigits = String(parsed.countryCode ?? '');
  const expected = countryCodeDigits.length + nextNationalLength;
  if (fullDigits.length < expected) return;

  if (detected.id !== country?.id) {
    onCountryChange(detected);
  }
  onValueChange(national);
};
