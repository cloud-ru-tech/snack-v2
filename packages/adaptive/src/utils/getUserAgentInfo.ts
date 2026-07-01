import { UAParser } from 'ua-parser-js';

import { ValueOf } from '../types/valueOf';
import { isBrowser } from './isBrowser';

/** Тип устройства из user-agent (UAParser). */
export const DEVICE_TYPE = {
  Console: 'console',
  Mobile: 'mobile',
  Tablet: 'tablet',
  Smarttv: 'smarttv',
  Wearable: 'wearable',
  Embedded: 'embedded',
  Desktop: 'desktop',
} as const;

const DEVICE_TYPES = Object.values(DEVICE_TYPE);

export type DeviceType = ValueOf<typeof DEVICE_TYPE>;

const getDeviceType = (type: string | undefined): DeviceType =>
  DEVICE_TYPES.find(value => value === type) || DEVICE_TYPE.Desktop;

/**
 * Парсит user-agent через `ua-parser-js` и возвращает тип устройства, ОС и браузер.
 * Источник UA: аргумент `userAgent` (для SSR — заголовок запроса), иначе `navigator.userAgent`.
 * На сервере без аргумента `device.type` нормализуется к `desktop`.
 */
export function getUserAgentInfo(userAgent?: string) {
  const resolvedUserAgent = userAgent ?? (isBrowser() ? globalThis.navigator.userAgent : undefined);
  const parser = new UAParser(resolvedUserAgent);
  const device = parser.getDevice();
  const browser = parser.getBrowser();
  const os = parser.getOS();

  return {
    device: {
      model: device.model,
      type: getDeviceType(device.type),
    },
    os,
    browser,
  };
}
