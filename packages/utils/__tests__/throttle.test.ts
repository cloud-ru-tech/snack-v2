import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { throttle } from '../src/utils/throttle';

describe('throttle', () => {
  beforeEach(() => {
    // Throttle сверяется с `Date.now()`, поэтому часы двигаются вместе с таймерами. Отметка
    // ненулевая: при `now: 0` первый же вызов попал бы в окно от `lastInvokeTime = 0`.
    vi.useFakeTimers({ now: new Date('2026-07-09T12:00:00Z') });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('первый вызов проходит сразу', () => {
    const callback = vi.fn();
    const throttled = throttle(callback, 100);

    throttled('a');

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('a');
  });

  it('вызовы внутри окна схлопываются в один по заднему фронту', () => {
    const callback = vi.fn();
    const throttled = throttle(callback, 100);

    throttled('a');
    throttled('b');
    throttled('c');
    expect(callback).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith('c');
  });

  it('вызов после истечения окна снова проходит сразу', () => {
    const callback = vi.fn();
    const throttled = throttle(callback, 100);

    throttled('a');
    vi.advanceTimersByTime(100);

    throttled('b');
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith('b');
  });

  it('одиночный вызов не дублируется по заднему фронту', () => {
    const callback = vi.fn();
    const throttled = throttle(callback, 100);

    throttled('a');
    vi.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('cancel отменяет отложенный вызов, но не откатывает уже сделанный', () => {
    const callback = vi.fn();
    const throttled = throttle(callback, 100);

    throttled('a');
    throttled('b');
    throttled.cancel();
    vi.advanceTimersByTime(1000);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('a');
  });

  it('wait по умолчанию — 0, каждый вызов проходит сразу', () => {
    const callback = vi.fn();
    const throttled = throttle(callback);

    throttled('a');
    throttled('b');

    expect(callback).toHaveBeenCalledTimes(2);
  });
});
