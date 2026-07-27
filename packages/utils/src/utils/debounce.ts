/** Функция-обёртка `debounce`: вызывается как исходная, плюс умеет отменить отложенный вызов. */
export type Debounced<TArgs extends unknown[]> = {
  (...args: TArgs): void;
  /** Отменяет запланированный вызов. Нужен в cleanup эффекта, чтобы не стрелять после размонтирования. */
  cancel(): void;
};

/**
 * Откладывает вызов `callback` на `wait` мс, перезапуская таймер на каждом новом вызове.
 * Срабатывает по заднему фронту — с аргументами последнего вызова.
 */
export function debounce<TArgs extends unknown[]>(callback: (...args: TArgs) => void, wait = 0): Debounced<TArgs> {
  let timer: ReturnType<typeof setTimeout> | undefined;

  const cancel = () => {
    if (timer !== undefined) {
      clearTimeout(timer);
      timer = undefined;
    }
  };

  const debounced = (...args: TArgs): void => {
    cancel();
    timer = setTimeout(() => {
      timer = undefined;
      callback(...args);
    }, wait);
  };

  return Object.assign(debounced, { cancel });
}
