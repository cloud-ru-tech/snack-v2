import { getUserAgentInfo } from '@ds/adaptive';

import { KBD_KEY_NAME, KBD_PLATFORM, KBD_SHORTCUT_SEPARATOR, KBD_SYMBOLS } from './constants';
import { KbdMessages } from './locale';
import { KbdKeyName, KbdPlatform, KbdShortcutKey } from './types';

const MAC_OS_NAMES = new Set(['macOS', 'iOS']);

const KEY_NAMES = new Set<string>(Object.values(KBD_KEY_NAME));

// Клавиши, у которых доступное название на Windows/Linux своё.
const OTHER_PLATFORM_LABEL_KEYS: Partial<Record<KbdKeyName, keyof KbdMessages>> = {
  mod: 'modOther',
  alt: 'altOther',
  meta: 'metaOther',
};

/**
 * macOS и iOS → `mac`, остальное и нераспознанный user-agent → `other`.
 * Без аргумента берёт `navigator.userAgent` текущего браузера, на сервере — `other`.
 */
export function detectKbdPlatform(userAgent?: string): KbdPlatform {
  const { name } = getUserAgentInfo(userAgent).os;

  return name && MAC_OS_NAMES.has(name) ? KBD_PLATFORM.Mac : KBD_PLATFORM.Other;
}

/** Видимый символ клавиши для платформы. */
export function resolveKbdSymbol(keyName: KbdKeyName, platform: KbdPlatform): string {
  return KBD_SYMBOLS[keyName][platform];
}

/** Ключ словаря `kbdLocale` с доступным названием клавиши для платформы. */
export function resolveKbdLabelKey(keyName: KbdKeyName, platform: KbdPlatform): keyof KbdMessages {
  const otherKey = platform === KBD_PLATFORM.Other ? OTHER_PLATFORM_LABEL_KEYS[keyName] : undefined;

  return otherKey ?? keyName;
}

/** Входит ли строка в `KBD_KEY_NAME`. */
export function isKbdKeyName(key: string): key is KbdKeyName {
  return KEY_NAMES.has(key);
}

/** Склеивает клавиши сочетания через ` + `: `keyName` проходит через `resolveKey`, остальное выводится как есть. */
export function joinKbdShortcut(keys: KbdShortcutKey[], resolveKey: (keyName: KbdKeyName) => string): string {
  return keys.map(key => (isKbdKeyName(key) ? resolveKey(key) : key)).join(` ${KBD_SHORTCUT_SEPARATOR} `);
}

/** Видимая строка сочетания для платформы: `['mod', 'K']` → `⌘ + K` / `Ctrl + K`. */
export function formatKbdShortcut(keys: KbdShortcutKey[], platform: KbdPlatform): string {
  return joinKbdShortcut(keys, keyName => resolveKbdSymbol(keyName, platform));
}
