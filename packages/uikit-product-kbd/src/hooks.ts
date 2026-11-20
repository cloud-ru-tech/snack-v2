import { useSyncExternalStore } from 'react';

import { KBD_PLATFORM } from './constants';
import { KbdPlatform, KbdShortcutKey } from './types';
import { detectKbdPlatform, formatKbdShortcut } from './utils';

// User-agent за время жизни страницы не меняется — подписываться не на что.
const subscribe = () => () => {};

const getSnapshot = (): KbdPlatform => detectKbdPlatform();

const getServerSnapshot = (): KbdPlatform => KBD_PLATFORM.Other;

/**
 * Платформа текущего клиента для отображения модификаторов.
 * На сервере и при гидрации — `other`, после гидрации — по `navigator.userAgent`.
 */
export function useKbdPlatform(): KbdPlatform {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Строка сочетания по ОС клиента — для мест, где компонент использовать нельзя: текст `Tooltip`, `title`, `placeholder`.
 * `['mod', 'K']` → `⌘ + K` на macOS и `Ctrl + K` на остальных.
 */
export function useKbdShortcut(keys: KbdShortcutKey[], platform?: KbdPlatform): string {
  const detectedPlatform = useKbdPlatform();

  return formatKbdShortcut(keys, platform ?? detectedPlatform);
}
