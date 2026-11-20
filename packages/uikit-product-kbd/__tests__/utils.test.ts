import { describe, expect, it } from 'vitest';

import { KBD_KEY_NAME, KBD_PLATFORM } from '../src/constants';
import {
  detectKbdPlatform,
  formatKbdShortcut,
  isKbdKeyName,
  joinKbdShortcut,
  resolveKbdLabelKey,
  resolveKbdSymbol,
} from '../src/utils';

const UA = {
  mac: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15',
  ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1',
  windows:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
  linux: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
};

describe('detectKbdPlatform', () => {
  it.each([
    [UA.mac, KBD_PLATFORM.Mac],
    [UA.ios, KBD_PLATFORM.Mac],
    [UA.windows, KBD_PLATFORM.Other],
    [UA.linux, KBD_PLATFORM.Other],
    ['unknown agent', KBD_PLATFORM.Other],
    ['', KBD_PLATFORM.Other],
  ])('%s → %s', (userAgent, expected) => {
    expect(detectKbdPlatform(userAgent)).toBe(expected);
  });
});

describe('resolveKbdSymbol', () => {
  it.each([
    ['mod', '⌘', 'Ctrl'],
    ['ctrl', '⌃', 'Ctrl'],
    ['alt', '⌥', 'Alt'],
    ['meta', '⌘', 'Win'],
    ['shift', 'Shift', 'Shift'],
    ['up', '↑', '↑'],
    ['down', '↓', '↓'],
    ['left', '←', '←'],
    ['right', '→', '→'],
    ['enter', '↵', '↵'],
    ['esc', 'Esc', 'Esc'],
  ] as const)('%s → mac %s, other %s', (keyName, mac, other) => {
    expect(resolveKbdSymbol(keyName, KBD_PLATFORM.Mac)).toBe(mac);
    expect(resolveKbdSymbol(keyName, KBD_PLATFORM.Other)).toBe(other);
  });

  it('covers every key name', () => {
    for (const keyName of Object.values(KBD_KEY_NAME)) {
      expect(resolveKbdSymbol(keyName, KBD_PLATFORM.Mac)).toBeTruthy();
      expect(resolveKbdSymbol(keyName, KBD_PLATFORM.Other)).toBeTruthy();
    }
  });
});

describe('resolveKbdLabelKey', () => {
  it('uses platform-specific keys for mod, alt and meta', () => {
    expect(resolveKbdLabelKey('mod', KBD_PLATFORM.Mac)).toBe('mod');
    expect(resolveKbdLabelKey('mod', KBD_PLATFORM.Other)).toBe('modOther');
    expect(resolveKbdLabelKey('alt', KBD_PLATFORM.Mac)).toBe('alt');
    expect(resolveKbdLabelKey('alt', KBD_PLATFORM.Other)).toBe('altOther');
    expect(resolveKbdLabelKey('meta', KBD_PLATFORM.Mac)).toBe('meta');
    expect(resolveKbdLabelKey('meta', KBD_PLATFORM.Other)).toBe('metaOther');
  });

  it.each(['ctrl', 'shift', 'up', 'down', 'left', 'right', 'enter', 'esc'] as const)(
    '%s keeps the same key on both platforms',
    keyName => {
      expect(resolveKbdLabelKey(keyName, KBD_PLATFORM.Mac)).toBe(keyName);
      expect(resolveKbdLabelKey(keyName, KBD_PLATFORM.Other)).toBe(keyName);
    },
  );
});

describe('isKbdKeyName', () => {
  it('recognizes every key name and rejects plain keys', () => {
    for (const keyName of Object.values(KBD_KEY_NAME)) {
      expect(isKbdKeyName(keyName)).toBe(true);
    }
    expect(isKbdKeyName('K')).toBe(false);
    expect(isKbdKeyName('Mod')).toBe(false);
  });
});

describe('formatKbdShortcut', () => {
  it.each([
    [['mod', 'K'], '⌘ + K', 'Ctrl + K'],
    [['mod', 'shift', 'P'], '⌘ + Shift + P', 'Ctrl + Shift + P'],
    [['meta', 'E'], '⌘ + E', 'Win + E'],
    [['/'], '/', '/'],
    [[], '', ''],
  ] as const)('%j → mac %s, other %s', (keys, mac, other) => {
    expect(formatKbdShortcut([...keys], KBD_PLATFORM.Mac)).toBe(mac);
    expect(formatKbdShortcut([...keys], KBD_PLATFORM.Other)).toBe(other);
  });
});

describe('joinKbdShortcut', () => {
  it('resolves only key names', () => {
    expect(joinKbdShortcut(['mod', 'C'], keyName => keyName.toUpperCase())).toBe('MOD + C');
  });
});
