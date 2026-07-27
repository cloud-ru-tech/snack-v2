import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { debounce } from '../src/utils/debounce';

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('откладывает вызов на wait мс', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 100);

    debounced();
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(99);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('перезапускает таймер на каждом вызове и стреляет аргументами последнего', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 100);

    debounced('first');
    vi.advanceTimersByTime(50);
    debounced('second');
    vi.advanceTimersByTime(50);
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('second');
  });

  it('cancel отменяет запланированный вызов', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 100);

    debounced();
    debounced.cancel();
    vi.advanceTimersByTime(1000);

    expect(callback).not.toHaveBeenCalled();
  });

  it('cancel без запланированного вызова безопасен', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 100);

    expect(() => debounced.cancel()).not.toThrow();

    debounced();
    vi.advanceTimersByTime(100);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('после срабатывания принимает новый вызов', () => {
    const callback = vi.fn();
    const debounced = debounce(callback, 100);

    debounced('a');
    vi.advanceTimersByTime(100);
    debounced('b');
    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith('b');
  });

  it('wait по умолчанию — 0, вызов уходит в следующий тик', () => {
    const callback = vi.fn();
    const debounced = debounce(callback);

    debounced();
    expect(callback).not.toHaveBeenCalled();

    vi.advanceTimersByTime(0);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
