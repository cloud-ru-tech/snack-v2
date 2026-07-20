import { afterEach, describe, expect, it, vi } from 'vitest';

import { CIMODE, DEFAULT_LANG, detectBrowserLang, isCimode, normalizeToBuiltinLang } from '../src';

describe('normalizeToBuiltinLang', () => {
  it('английские префиксы → en-GB', () => {
    expect(normalizeToBuiltinLang('en-US')).toBe('en-GB');
    expect(normalizeToBuiltinLang('en')).toBe('en-GB');
    expect(normalizeToBuiltinLang('EN-AU')).toBe('en-GB');
  });

  it('русский → ru-RU', () => {
    expect(normalizeToBuiltinLang('ru-RU')).toBe('ru-RU');
    expect(normalizeToBuiltinLang('ru')).toBe('ru-RU');
  });

  it('cimode сохраняется', () => {
    expect(normalizeToBuiltinLang(CIMODE)).toBe('cimode');
  });

  it('прочие языки → DEFAULT_LANG', () => {
    expect(normalizeToBuiltinLang('fr-FR')).toBe(DEFAULT_LANG);
    expect(normalizeToBuiltinLang('de')).toBe(DEFAULT_LANG);
  });

  it('нераспознанный язык → переданный fallback', () => {
    expect(normalizeToBuiltinLang('fr-FR', 'ru-RU')).toBe('ru-RU');
    // встроенные языки от fallback не зависят
    expect(normalizeToBuiltinLang('en-US', 'ru-RU')).toBe('en-GB');
  });
});

describe('isCimode', () => {
  it('true только для cimode', () => {
    expect(isCimode('cimode')).toBe(true);
    expect(isCimode('ru-RU')).toBe(false);
  });
});

describe('detectBrowserLang', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('вне браузера → DEFAULT_LANG', () => {
    expect(detectBrowserLang()).toBe(DEFAULT_LANG);
  });

  it('нераспознанный navigator.language → переданный fallback', () => {
    vi.stubGlobal('window', { document: { createElement: () => ({}) } });
    vi.stubGlobal('navigator', { language: 'fr-FR' });
    expect(detectBrowserLang('ru-RU')).toBe('ru-RU');
    expect(detectBrowserLang()).toBe(DEFAULT_LANG);
  });

  it('в браузере нормализует navigator.language', () => {
    vi.stubGlobal('window', { document: { createElement: () => ({}) } });
    vi.stubGlobal('navigator', { language: 'ru-RU' });
    expect(detectBrowserLang()).toBe('ru-RU');

    vi.stubGlobal('navigator', { language: 'en-US' });
    expect(detectBrowserLang()).toBe('en-GB');
  });
});
