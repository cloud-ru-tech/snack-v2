/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- unit-тест в jsdom: контейнер для
   пробника создаётся вне компонента, ssr-гварды здесь неприменимы. */
import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  ARMENIA_COUNTRY_CODE,
  BELARUS_COUNTRY_CODE,
  RUSSIA_COUNTRY_CODE,
} from '../src/components/FieldPhone/countries';
import { useCountries } from '../src/components/FieldPhone/hooks/useCountries';
import { CountrySettings, FieldPhoneOptionsProps } from '../src/components/FieldPhone/types';

/** Флаг React'а «мы внутри act()» — глобального объявления в типах нет, ставим точечно. */
const actEnv = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };

let container: HTMLDivElement;
let root: Root;
let results: FieldPhoneOptionsProps[][];

function Probe({ settings }: { settings: CountrySettings }) {
  results.push(useCountries(settings));
  return null;
}

function render(settings: CountrySettings) {
  act(() => root.render(<Probe settings={settings} />));
  return results[results.length - 1];
}

function customOption(label: string): FieldPhoneOptionsProps {
  return { id: 'custom', iso2: 'RU', mask: 'XXX', beforeContent: null, content: { label, caption: '+7' } };
}

describe('useCountries', () => {
  beforeEach(() => {
    actEnv.IS_REACT_ACT_ENVIRONMENT = true;
    results = [];
    container = document.createElement('div');
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('keeps the order of includedCountries', () => {
    const options = render({ includedCountries: [BELARUS_COUNTRY_CODE, RUSSIA_COUNTRY_CODE] });

    expect(options.map(({ id }) => id)).toEqual([BELARUS_COUNTRY_CODE.value, RUSSIA_COUNTRY_CODE.value]);
  });

  it('returns the same options for a new array with the same countries', () => {
    const first = render({ includedCountries: [RUSSIA_COUNTRY_CODE, ARMENIA_COUNTRY_CODE] });
    const second = render({ includedCountries: [RUSSIA_COUNTRY_CODE, ARMENIA_COUNTRY_CODE] });

    expect(second).toBe(first);
  });

  it('recomputes options when the countries change', () => {
    const first = render({ includedCountries: [RUSSIA_COUNTRY_CODE] });
    const second = render({ includedCountries: [RUSSIA_COUNTRY_CODE, ARMENIA_COUNTRY_CODE] });

    expect(second).not.toBe(first);
    expect(second).toHaveLength(2);
  });

  it('returns overriddenOptions and keeps them for a new array with the same content', () => {
    const first = render({ overriddenOptions: [customOption('Россия')] });
    const second = render({ overriddenOptions: [customOption('Россия')] });

    expect(first[0].content.label).toBe('Россия');
    expect(second).toBe(first);
  });

  it('recomputes overriddenOptions when a label changes', () => {
    const first = render({ overriddenOptions: [customOption('Россия')] });
    const second = render({ overriddenOptions: [customOption('Russia')] });

    expect(second).not.toBe(first);
    expect(second[0].content.label).toBe('Russia');
  });
});
