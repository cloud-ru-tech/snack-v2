import { describe, expect, it, vi } from 'vitest';

import { buildLangDict, buildOverrideRegistry, OverrideEntry, translate } from '../src';

// Слепок словаря компонента (как @ds/calendar): только en-GB + ru-RU из коробки.
const CALENDAR = {
  'en-GB': {
    apply: 'Apply',
    current: 'Current',
    defaultPresets: { lastWeek: 'Last 7 days', lastYear: 'Last 1 year' },
    greeting: 'Hello {{name}}',
  },
  'ru-RU': {
    apply: 'Применить',
    current: 'Сейчас',
    defaultPresets: { lastWeek: 'Последние 7 дней', lastYear: 'Последний 1 год' },
    greeting: 'Привет {{name}}',
  },
} as const;

// Имитация `calendarLocale.extend(lang, partial)` — в рантайме это та же запись.
const extend = (lang: string, messages: object): OverrideEntry => ({ namespace: 'Calendar', lang, messages });

describe('defineLocale / pure resolve', () => {
  it('резолвит встроенный язык и вложенный ключ', () => {
    const dict = buildLangDict('Calendar', CALENDAR, 'ru-RU', 'en-GB');
    expect(translate(dict, 'apply', 'ru-RU')).toBe('Применить');
    expect(translate(dict, 'defaultPresets.lastWeek', 'ru-RU')).toBe('Последние 7 дней');
  });

  it('интерполирует плейсхолдеры', () => {
    const dict = buildLangDict('Calendar', CALENDAR, 'en-GB', 'en-GB');
    expect(translate(dict, 'greeting', 'en-GB', { name: 'Ada' })).toBe('Hello Ada');
  });

  it('на отсутствующем ключе возвращает сам ключ + warn', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const dict = buildLangDict('Calendar', CALENDAR, 'en-GB', 'en-GB');
    expect(translate(dict, 'missing.key', 'en-GB')).toBe('missing.key');
    expect(warn).toHaveBeenCalled();
    warn.mockRestore();
  });

  it('сервисный оверрайд существующего языка побеждает базу', () => {
    const overrides = buildOverrideRegistry([extend('ru-RU', { apply: 'ОК' })]);
    const dict = buildLangDict('Calendar', CALENDAR, 'ru-RU', 'en-GB', overrides);
    expect(translate(dict, 'apply', 'ru-RU')).toBe('ОК');
    // непереопределённый ключ остаётся из базы
    expect(translate(dict, 'current', 'ru-RU')).toBe('Сейчас');
  });

  it('НОВЫЙ язык (de-DE) через extend — lang:string, словарь компонента не трогается', () => {
    const overrides = buildOverrideRegistry([
      extend('de-DE', { apply: 'Anwenden', current: 'Jetzt', defaultPresets: { lastWeek: 'Letzte 7 Tage' } }),
    ]);
    const dict = buildLangDict('Calendar', CALENDAR, 'de-DE', 'en-GB', overrides);

    // переведённые ключи — немецкие
    expect(translate(dict, 'apply', 'de-DE')).toBe('Anwenden');
    expect(translate(dict, 'defaultPresets.lastWeek', 'de-DE')).toBe('Letzte 7 Tage');
    // непереведённый ключ грейсфулится на fallback en-GB
    expect(translate(dict, 'defaultPresets.lastYear', 'de-DE')).toBe('Last 1 year');
    expect(translate(dict, 'greeting', 'de-DE', { name: 'Ada' })).toBe('Hello Ada');
  });

  it('несколько extend для одного ns+lang — deep-merge', () => {
    const overrides = buildOverrideRegistry([
      extend('de-DE', { apply: 'Anwenden' }),
      extend('de-DE', { current: 'Jetzt' }),
    ]);
    const dict = buildLangDict('Calendar', CALENDAR, 'de-DE', 'en-GB', overrides);
    expect(translate(dict, 'apply', 'de-DE')).toBe('Anwenden');
    expect(translate(dict, 'current', 'de-DE')).toBe('Jetzt');
  });
});
