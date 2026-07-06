import { FieldTextProps } from '@ds/fields';

import { Mask } from './types';

export const MASK = {
  Code: 'code',
  Uuid: 'uuid',
  Passport: 'passport',
  Snils: 'snils',
  IpV4Address: 'ip-v4-address',
  IpV4AddressWithMask: 'ip-v4-address-with-mask',
} as const;

export const MASK_OPTIONS: Record<
  Mask,
  {
    placeholder: string;
    options: Record<string, unknown>;
    inputMode?: FieldTextProps['inputMode'];
  }
> = {
  [MASK.Uuid]: {
    placeholder: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
    options: {
      mask: 'hhhhhhhh-hhhh-hhhh-hhhh-hhhhhhhhhhhh',
      placeholderChar: '_',
      definitions: {
        h: /[0-9a-f]/,
      },
    },
    inputMode: 'text',
  },
  [MASK.Code]: {
    placeholder: 'XXXX',
    options: {
      mask: '0000',
      placeholderChar: '_',
    },
    inputMode: 'numeric',
  },
  [MASK.Passport]: {
    placeholder: 'XXXX XXXXXX',
    options: {
      mask: '0000 000000',
    },
    inputMode: 'numeric',
  },
  [MASK.Snils]: {
    placeholder: 'XXXXXX-XXX XX',
    options: {
      mask: '000000-000 00',
    },
    inputMode: 'numeric',
  },
  [MASK.IpV4Address]: {
    placeholder: '___.___.___.___',
    options: { mask: '0[00]{.}`0[00]{.}`0[00]{.}`0[00]' },
    inputMode: 'numeric',
  },
  [MASK.IpV4AddressWithMask]: {
    placeholder: '___.___.___.___/__',
    options: { mask: '0[00]{.}`0[00]{.}`0[00]{.}`0[00]{/}`0[0]' },
    inputMode: 'numeric',
  },
};

export const BASE_MASK_OPTIONS = {
  lazy: true,
  autofix: true,
} as const;
