/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- unit-тест в jsdom: контейнер для
   пробника создаётся вне компонента, ssr-гварды здесь неприменимы. */
import { fireEvent } from '@testing-library/dom';
import { act, useMemo, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { buildSegments, SegmentsMode, useSegmentedMask } from '../src/segments';

/** Флаг React'а «мы внутри act()» — глобального объявления в типах нет, ставим точечно. */
const actEnv = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };

function renderProbe(mode: SegmentsMode, showSeconds = true) {
  const container = document.createElement('div');
  document.body.append(container);
  const emitted: string[] = [];

  function Probe() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { mask, slots } = useMemo(() => buildSegments(mode, showSeconds), []);
    const { handleKeyDown, handleFocus } = useSegmentedMask({
      inputRef,
      mask,
      slots,
      // Input неуправляемый: хук сам пишет в DOM, синхронизировать нечего.
      setValue: () => undefined,
      onMaskedChange: masked => emitted.push(masked),
    });

    return <input ref={inputRef} data-test-id='input' onKeyDown={handleKeyDown} onFocus={handleFocus} />;
  }

  let root: Root;
  act(() => {
    root = createRoot(container);
    root.render(<Probe />);
  });

  const input = container.querySelector('input') as HTMLInputElement;
  act(() => input.focus());

  const press = (...keys: string[]) => {
    for (const key of keys) {
      act(() => {
        fireEvent.keyDown(input, { key });
      });
    }
  };

  return {
    input,
    emitted,
    type: (text: string) => press(...text),
    press,
    selection: () => [input.selectionStart, input.selectionEnd],
    unmount: () =>
      act(() => {
        root.unmount();
        container.remove();
      }),
  };
}

describe('useSegmentedMask / ввод цифр', () => {
  let probe: ReturnType<typeof renderProbe> | undefined;

  beforeEach(() => {
    actEnv.IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    probe?.unmount();
    probe = undefined;
    actEnv.IS_REACT_ACT_ENVIRONMENT = false;
  });

  it.each([
    ['01102026', '01.10.2026'],
    ['31122026', '31.12.2026'],
    ['15032026', '15.03.2026'],
    ['01010202', '01.01.0202'],
  ])('date: %s → %s', (keys, expected) => {
    probe = renderProbe('date');
    probe.type(keys);
    expect(probe.input.value).toBe(expected);
    expect(probe.emitted.at(-1)).toBe(expected);
  });

  it('date-time без секунд сохраняет ведущие нули во времени', () => {
    probe = renderProbe('date-time', false);
    probe.type('011020260705');
    expect(probe.input.value).toBe('01.10.2026, 07:05');
  });

  it('time сохраняет ведущие нули', () => {
    probe = renderProbe('time');
    probe.type('010203');
    expect(probe.input.value).toBe('01:02:03');
  });

  it('цифра, которую нельзя продолжить, закрывает сегмент: 5 в дне → 05, фокус на месяце', () => {
    probe = renderProbe('date');
    probe.type('5');
    expect(probe.input.value).toBe('05.ММ.ГГГГ');
    expect(probe.selection()).toEqual([3, 5]);
  });

  it('0 в дне не показывается, но ждёт вторую цифру: 0, 1 → 01, фокус на месяце', () => {
    probe = renderProbe('date');
    probe.type('0');
    expect(probe.input.value).toBe('ДД.ММ.ГГГГ');
    expect(probe.selection()).toEqual([0, 2]);
    probe.type('1');
    expect(probe.input.value).toBe('01.ММ.ГГГГ');
    expect(probe.selection()).toEqual([3, 5]);
  });

  it('переполнение начинает сегмент с последней цифры: 13 в месяце → 03', () => {
    probe = renderProbe('date');
    probe.type('0113');
    expect(probe.input.value).toBe('01.03.ГГГГ');
    expect(probe.selection()).toEqual([6, 10]);
  });

  it('переполнение закрывает сегмент, даже если последнюю цифру можно продолжить: 32 в дне → 02', () => {
    probe = renderProbe('date');
    probe.type('32');
    expect(probe.input.value).toBe('02.ММ.ГГГГ');
    expect(probe.selection()).toEqual([3, 5]);
  });

  it('00 в дне ниже min: сегмент остаётся пустым и ждёт новый ввод', () => {
    probe = renderProbe('date');
    probe.type('00');
    expect(probe.input.value).toBe('ДД.ММ.ГГГГ');
    expect(probe.selection()).toEqual([0, 2]);
    probe.type('7');
    expect(probe.input.value).toBe('07.ММ.ГГГГ');
  });

  it('0000 в годе ниже min: год не заполняется', () => {
    probe = renderProbe('date');
    probe.type('01010000');
    expect(probe.input.value).toBe('01.01.ГГГГ');
    expect(probe.emitted.at(-1)).toBe('');
  });

  it('00 в часах допустим (min 0)', () => {
    probe = renderProbe('time', false);
    probe.type('0015');
    expect(probe.input.value).toBe('00:15');
  });

  it('стрелки сбрасывают набранные цифры: 1, ←→ по сегментам, 5 → 05', () => {
    probe = renderProbe('date');
    probe.type('1');
    expect(probe.input.value).toBe('01.ММ.ГГГГ');
    probe.press('ArrowRight', 'ArrowLeft');
    probe.type('5');
    expect(probe.input.value).toBe('05.ММ.ГГГГ');
  });
});
