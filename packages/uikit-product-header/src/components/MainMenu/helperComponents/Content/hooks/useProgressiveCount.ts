import { startTransition, useEffect, useState } from 'react';

/** Сколько групп монтируется в первом коммите (примерно первый экран). */
export const PROGRESSIVE_INITIAL_COUNT = 3;

/** Сколько групп добавляется за один кадр. */
const STEP = 2;

type State = { resetKey: string; count: number };

/**
 * Постепенный маунт списка: первый коммит рендерит `PROGRESSIVE_INITIAL_COUNT` элементов, остальные добавляются
 * по `STEP` за кадр в transition. Один синхронный коммит сотен карточек блокирует главный поток;
 * порциями первый экран появляется сразу, а хвост дорисовывается, не блокируя ввод.
 *
 * При смене `resetKey` (сегмент, режим поиска) счётчик сбрасывается.
 *
 * @returns сколько первых элементов нужно отрендерить
 */
export function useProgressiveCount(total: number, resetKey: string, enabled = true) {
  const [state, setState] = useState<State>({ resetKey, count: PROGRESSIVE_INITIAL_COUNT });

  // Сброс при смене ключа — во время рендера, чтобы новый список не мелькнул с прежним счётчиком.
  if (state.resetKey !== resetKey) {
    setState({ resetKey, count: PROGRESSIVE_INITIAL_COUNT });
  }

  const count = state.resetKey === resetKey ? state.count : PROGRESSIVE_INITIAL_COUNT;
  const isDone = !enabled || count >= total;

  useEffect(() => {
    if (isDone) {
      return;
    }

    const frameId = requestAnimationFrame(() => {
      startTransition(() => {
        setState(prev => (prev.resetKey === resetKey ? { resetKey, count: prev.count + STEP } : prev));
      });
    });

    return () => cancelAnimationFrame(frameId);
  }, [isDone, count, resetKey]);

  return enabled ? Math.min(count, total) : total;
}
