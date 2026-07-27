import { ValueOf } from '../types/valueOf';
import { isBrowser } from './isBrowser';

/** Тип устройства из user-agent. */
export const DEVICE_TYPE = {
  Console: 'console',
  Mobile: 'mobile',
  Tablet: 'tablet',
  Smarttv: 'smarttv',
  Wearable: 'wearable',
  Embedded: 'embedded',
  Desktop: 'desktop',
} as const;

export type DeviceType = ValueOf<typeof DEVICE_TYPE>;

/** Операционная система из user-agent. Поля пустые, если UA не распознан. */
export type UserAgentOs = {
  name?: string;
  version?: string;
};

/** Браузер из user-agent. Поля пустые, если UA не распознан. */
export type UserAgentBrowser = {
  name?: string;
  version?: string;
  /** Мажорная часть `version` — удобна для проверок вида «Safari младше 16». */
  major?: string;
};

export type UserAgentInfo = {
  device: {
    model?: string;
    type: DeviceType;
  };
  os: UserAgentOs;
  browser: UserAgentBrowser;
};

const TV_PATTERN = /\b(?:SmartTV|SMART-TV|GoogleTV|AppleTV|HbbTV|NetCast|Web0S|webOS TV|BRAVIA|Roku|CrKey)\b/i;
const CONSOLE_PATTERN = /\b(?:Nintendo|PlayStation|Xbox)\b/i;
const WEARABLE_PATTERN = /\b(?:Watch|Wear OS|Glass)\b/i;
const TABLET_PATTERN = /\b(?:iPad|Tablet|PlayBook|Kindle|Silk)\b/i;
const MOBILE_PATTERN = /\b(?:iPhone|iPod|Windows Phone|IEMobile|BlackBerry|BB10|Opera Mini|Mobi)\b/i;

function detectDeviceType(userAgent: string): DeviceType {
  if (TV_PATTERN.test(userAgent)) return DEVICE_TYPE.Smarttv;
  if (CONSOLE_PATTERN.test(userAgent)) return DEVICE_TYPE.Console;
  if (WEARABLE_PATTERN.test(userAgent)) return DEVICE_TYPE.Wearable;
  if (TABLET_PATTERN.test(userAgent)) return DEVICE_TYPE.Tablet;
  // Android без токена `Mobi` — планшет: так это размечает сам Android (WebView ставит `Mobile`
  // только на телефонах).
  if (/Android/i.test(userAgent)) return /Mobi/i.test(userAgent) ? DEVICE_TYPE.Mobile : DEVICE_TYPE.Tablet;
  if (MOBILE_PATTERN.test(userAgent)) return DEVICE_TYPE.Mobile;

  return DEVICE_TYPE.Desktop;
}

function detectModel(userAgent: string): string | undefined {
  const apple = /\b(iPhone|iPad|iPod)\b/.exec(userAgent);
  if (apple) return apple[1];

  // Android держит модель в комментарии: `(Linux; Android 14; SM-S911B) ...` или `... Build/...`.
  const android = /Android[^;)]*;\s*([^;)]+?)(?:\s+Build\/[^;)]*)?\s*[;)]/.exec(userAgent);

  return android?.[1]?.trim() || undefined;
}

const WINDOWS_NT_NAMES: Record<string, string> = {
  '10.0': '10',
  '6.3': '8.1',
  '6.2': '8',
  '6.1': '7',
};

function detectOs(userAgent: string): UserAgentOs {
  const ios = /\b(?:iPhone|iPad|iPod)\b.*?\bOS (\d+(?:[._]\d+)*)/.exec(userAgent);
  if (ios) return { name: 'iOS', version: ios[1].replace(/_/g, '.') };

  const android = /Android (\d+(?:\.\d+)*)/.exec(userAgent);
  if (android) return { name: 'Android', version: android[1] };

  const windows = /Windows NT (\d+\.\d+)/.exec(userAgent);
  if (windows) return { name: 'Windows', version: WINDOWS_NT_NAMES[windows[1]] ?? windows[1] };

  const macos = /Mac OS X (\d+(?:[._]\d+)*)/.exec(userAgent);
  if (macos) return { name: 'macOS', version: macos[1].replace(/_/g, '.') };

  if (/Macintosh/i.test(userAgent)) return { name: 'macOS' };
  if (/Linux/i.test(userAgent)) return { name: 'Linux' };

  return {};
}

// Порядок важен: Edge и Opera представляются Chrome'ом, Chrome — Safari.
const BROWSER_PATTERNS: { name: string; pattern: RegExp }[] = [
  { name: 'Edge', pattern: /\bEdgi?[A-Za-z]*\/([\d.]+)/ },
  { name: 'Opera', pattern: /\b(?:OPR|Opera)\/([\d.]+)/ },
  { name: 'Yandex Browser', pattern: /\bYaBrowser\/([\d.]+)/ },
  { name: 'Samsung Internet', pattern: /\bSamsungBrowser\/([\d.]+)/ },
  { name: 'Firefox', pattern: /\b(?:Firefox|FxiOS)\/([\d.]+)/ },
  { name: 'Chrome', pattern: /\b(?:Chrome|CriOS|Chromium)\/([\d.]+)/ },
  { name: 'Safari', pattern: /\bVersion\/([\d.]+).*\bSafari\b/ },
];

function detectBrowser(userAgent: string): UserAgentBrowser {
  for (const { name, pattern } of BROWSER_PATTERNS) {
    const match = pattern.exec(userAgent);

    if (match) {
      const version = match[1];

      return { name, version, major: version.split('.')[0] };
    }
  }

  return {};
}

/**
 * Разбирает user-agent и возвращает тип устройства, ОС и браузер.
 * Источник UA: аргумент `userAgent` (для SSR — заголовок запроса), иначе `navigator.userAgent`.
 * На сервере без аргумента `device.type` нормализуется к `desktop`.
 *
 * Детектор целенаправленно узкий: он покрывает раскладку (`device.type` — единственное, что читает
 * адаптив) и популярные браузеры/ОС. Для экзотических устройств `device.type` деградирует к
 * `desktop`, а `os`/`browser` остаются пустыми — это осознанный размен на отсутствие внешней
 * зависимости с базой UA.
 */
export function getUserAgentInfo(userAgent?: string): UserAgentInfo {
  const resolvedUserAgent = userAgent ?? (isBrowser() ? globalThis.navigator.userAgent : undefined);

  if (!resolvedUserAgent) {
    return { device: { type: DEVICE_TYPE.Desktop }, os: {}, browser: {} };
  }

  return {
    device: {
      model: detectModel(resolvedUserAgent),
      type: detectDeviceType(resolvedUserAgent),
    },
    os: detectOs(resolvedUserAgent),
    browser: detectBrowser(resolvedUserAgent),
  };
}
