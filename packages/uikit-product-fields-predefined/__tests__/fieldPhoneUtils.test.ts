// Импорт напрямую из src, минуя entry @ds/uikit-product-fields-predefined:
// entry тянет CSS-модули, ломает node-окружение vitest.
import { describe, expect, it, vi } from 'vitest';

import { FieldPhoneOptionsProps } from '../src/components/FieldPhone/types';
import { detectCountryByPhone, handleAutoInsert } from '../src/components/FieldPhone/utils';

const RUSSIA: FieldPhoneOptionsProps = {
  id: 'russia',
  iso2: 'RU',
  mask: 'XXX XXX-XX-XX',
  beforeContent: null,
  content: { option: 'Россия', caption: '+7' },
};

const ABKHAZIA: FieldPhoneOptionsProps = {
  id: 'abkhazia',
  iso2: 'RU',
  mask: 'XXX XXX-XX-XX',
  beforeContent: null,
  content: { option: 'Абхазия', caption: '+7' },
};

const USA: FieldPhoneOptionsProps = {
  id: 'usa',
  iso2: 'US',
  mask: 'XXX XXX-XXXX',
  beforeContent: null,
  content: { option: 'США', caption: '+1' },
};

const FRANCE: FieldPhoneOptionsProps = {
  id: 'france',
  iso2: 'FR',
  mask: 'X XX XX XX XX',
  beforeContent: null,
  content: { option: 'Франция', caption: '+33' },
};

const OPTIONS = [RUSSIA, ABKHAZIA, USA, FRANCE];

describe('detectCountryByPhone', () => {
  it('detects Russia by region code', () => {
    expect(detectCountryByPhone('+79991234567', OPTIONS)).toBe(RUSSIA);
  });

  it('detects Abkhazia for the +7840 range (shares RU iso2)', () => {
    expect(detectCountryByPhone('+78401234567', OPTIONS)).toBe(ABKHAZIA);
  });

  it('detects Abkhazia for the +7940 range as well', () => {
    expect(detectCountryByPhone('+79401234567', OPTIONS)).toBe(ABKHAZIA);
  });

  it('detects a foreign country by iso2 region code', () => {
    expect(detectCountryByPhone('+12025550123', OPTIONS)).toBe(USA);
    expect(detectCountryByPhone('+33612345678', OPTIONS)).toBe(FRANCE);
  });

  it('normalizes input without a leading plus', () => {
    expect(detectCountryByPhone('79991234567', OPTIONS)).toBe(RUSSIA);
  });

  it('strips formatting characters before parsing', () => {
    expect(detectCountryByPhone('+7 (999) 123-45-67', OPTIONS)).toBe(RUSSIA);
  });

  it('returns undefined when no country matches', () => {
    expect(detectCountryByPhone('+000', OPTIONS)).toBeUndefined();
  });
});

describe('handleAutoInsert', () => {
  const makeHandlers = () => ({
    onValueChange: vi.fn(),
    onCountryChange: vi.fn(),
  });

  it('does nothing for empty raw input', () => {
    const { onValueChange, onCountryChange } = makeHandlers();
    handleAutoInsert({ raw: '', onValueChange, onCountryChange, country: RUSSIA, options: OPTIONS });
    expect(onValueChange).not.toHaveBeenCalled();
    expect(onCountryChange).not.toHaveBeenCalled();
  });

  it('does nothing for an unparseable number', () => {
    const { onValueChange, onCountryChange } = makeHandlers();
    handleAutoInsert({ raw: '+000', onValueChange, onCountryChange, country: RUSSIA, options: OPTIONS });
    expect(onValueChange).not.toHaveBeenCalled();
    expect(onCountryChange).not.toHaveBeenCalled();
  });

  it('switches country and inserts the national number when a foreign number is pasted', () => {
    const { onValueChange, onCountryChange } = makeHandlers();
    handleAutoInsert({ raw: '+12025550123', onValueChange, onCountryChange, country: RUSSIA, options: OPTIONS });
    expect(onCountryChange).toHaveBeenCalledTimes(1);
    expect(onCountryChange).toHaveBeenCalledWith(USA);
    expect(onValueChange).toHaveBeenCalledWith('2025550123');
  });

  it('does not switch country when the detected country already matches', () => {
    const { onValueChange, onCountryChange } = makeHandlers();
    handleAutoInsert({ raw: '+79991234567', onValueChange, onCountryChange, country: RUSSIA, options: OPTIONS });
    expect(onCountryChange).not.toHaveBeenCalled();
    expect(onValueChange).toHaveBeenCalledWith('9991234567');
  });

  it('trims the national number down to the target mask length', () => {
    const { onValueChange, onCountryChange } = makeHandlers();
    // Франция: маска короче, 9 X. Длинный ввод обрезается до последних 9 цифр.
    handleAutoInsert({ raw: '+33612345678', onValueChange, onCountryChange, country: RUSSIA, options: OPTIONS });
    expect(onCountryChange).toHaveBeenCalledWith(FRANCE);
    expect(onValueChange).toHaveBeenCalledWith('612345678');
  });
});
