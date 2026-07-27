/** Функция-обёртка `throttle`: вызывается как исходная, плюс умеет отменить отложенный вызов. */
export type Throttled<TArgs extends unknown[]> = {
  (...args: TArgs): void;
  /** Отменяет запланированный вызов по заднему фронту. */
  cancel(): void;
};

/**
 * Ограничивает частоту вызовов `callback` до одного раза в `wait` мс.
 * Срабатывает по обоим фронтам: первый вызов проходит сразу, последний в окне — по его истечении.
 */
export function throttle<TArgs extends unknown[]>(callback: (...args: TArgs) => void, wait = 0): Throttled<TArgs> {
  let lastInvokeTime = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let pendingArgs: TArgs | undefined;

  const invoke = (args: TArgs) => {
    lastInvokeTime = Date.now();
    callback(...args);
  };

  const cancel = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
    pendingArgs = undefined;
  };

  const throttled = (...args: TArgs): void => {
    const remaining = wait - (Date.now() - lastInvokeTime);

    if (remaining <= 0) {
      cancel();
      invoke(args);
      return;
    }

    pendingArgs = args;

    if (timer === undefined) {
      timer = setTimeout(() => {
        timer = undefined;

        if (pendingArgs !== undefined) {
          const args = pendingArgs;
          pendingArgs = undefined;
          invoke(args);
        }
      }, remaining);
    }
  };

  return Object.assign(throttled, { cancel });
}
