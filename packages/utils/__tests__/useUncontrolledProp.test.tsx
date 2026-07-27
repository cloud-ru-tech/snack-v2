/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- unit-тест в jsdom: контейнер для
   пробника создаётся вне компонента, ssr-гварды здесь неприменимы. */
import { act, useEffect } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { UncontrolledHandler, useUncontrolledProp } from '../src/hooks/useUncontrolledProp';

/** Флаг React'а «мы внутри act()» — глобального объявления в типах нет, ставим точечно. */
const actEnv = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };

type HookResult<TValue> = readonly [TValue | undefined, (...args: never[]) => unknown];

type HookProps<TValue> = {
  propValue?: TValue;
  defaultValue?: TValue;
  handler?: UncontrolledHandler;
};

/**
 * Рендерит хук в настоящем React-дереве (renderHook в репо нет, тянуть
 * testing-library ради одного файла не хочется) и отдаёт последний результат
 * плюс `rerender` с новыми пропсами.
 */
function renderUncontrolledProp<TValue>(initial: HookProps<TValue>) {
  const container = document.createElement('div');
  document.body.append(container);

  const results: HookResult<TValue>[] = [];
  let root: Root;

  function Probe(props: HookProps<TValue>) {
    const result = useUncontrolledProp<TValue>(props.propValue, props.defaultValue, props.handler);
    useEffect(() => {
      results.push(result as HookResult<TValue>);
    });

    return null;
  }

  act(() => {
    root = createRoot(container);
    root.render(<Probe {...initial} />);
  });

  return {
    current: () => results[results.length - 1],
    rerender: (props: HookProps<TValue>) => {
      act(() => {
        root.render(<Probe {...props} />);
      });
    },
    setValue: (...args: unknown[]) => {
      act(() => {
        (results[results.length - 1][1] as (...a: unknown[]) => unknown)(...args);
      });
    },
    unmount: () => {
      act(() => {
        root.unmount();
      });
      container.remove();
    },
  };
}

describe('useUncontrolledProp', () => {
  beforeEach(() => {
    actEnv.IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    actEnv.IS_REACT_ACT_ENVIRONMENT = undefined;
  });

  it('uncontrolled: стартует с defaultValue и обновляется сеттером', () => {
    const hook = renderUncontrolledProp<string>({ defaultValue: 'a' });
    expect(hook.current()[0]).toBe('a');

    hook.setValue('b');
    expect(hook.current()[0]).toBe('b');

    hook.unmount();
  });

  it('controlled: значение берётся из пропа, сеттер его не меняет', () => {
    const handler = vi.fn();
    const hook = renderUncontrolledProp<string>({ propValue: 'prop', defaultValue: 'default', handler });
    expect(hook.current()[0]).toBe('prop');

    hook.setValue('ignored');
    expect(hook.current()[0]).toBe('prop');
    expect(handler).toHaveBeenCalledWith('ignored');

    hook.unmount();
  });

  it('сеттер зовёт handler со всеми аргументами и возвращает его результат', () => {
    const handler = vi.fn(() => 'returned');
    const hook = renderUncontrolledProp<string>({ defaultValue: 'a', handler });

    let returned: unknown;
    act(() => {
      returned = (hook.current()[1] as (...a: unknown[]) => unknown)('key', 'node');
    });

    expect(handler).toHaveBeenCalledWith('key', 'node');
    expect(returned).toBe('returned');

    hook.unmount();
  });

  it('переход controlled → uncontrolled возвращает состояние к defaultValue', () => {
    const hook = renderUncontrolledProp<string>({ propValue: 'prop', defaultValue: 'default' });
    expect(hook.current()[0]).toBe('prop');

    hook.rerender({ defaultValue: 'default' });
    expect(hook.current()[0]).toBe('default');

    hook.unmount();
  });

  it('сеттер стабилен между рендерами, пока не менялся handler', () => {
    const handler = vi.fn();
    const hook = renderUncontrolledProp<string>({ defaultValue: 'a', handler });
    const first = hook.current()[1];

    hook.rerender({ defaultValue: 'a', handler });
    expect(hook.current()[1]).toBe(first);

    hook.rerender({ defaultValue: 'a', handler: vi.fn() });
    expect(hook.current()[1]).not.toBe(first);

    hook.unmount();
  });

  it('работает без handler', () => {
    const hook = renderUncontrolledProp<number>({ defaultValue: 1 });

    hook.setValue(2);
    expect(hook.current()[0]).toBe(2);

    hook.unmount();
  });
});
