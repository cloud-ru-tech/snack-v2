import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { toasterManager } from './manager';
import { ToasterId } from './types';

/**
 * Контекст рантайма тоста — пробрасывает `id` + `containerId` от `ToastSlot`
 * вниз к карточкам (прогресс-бар, Timer). Нужен, чтобы UI-индикаторы могли
 * подписаться на фактическое состояние авто-close таймера и не расходиться
 * с менеджером при pause/play/expand/collapse.
 */
export type ToastRuntime = {
  id: ToasterId;
  containerId: string;
};

export const ToastRuntimeContext = createContext<ToastRuntime | null>(null);

export type ToastProgressState = {
  /** Доля оставшегося времени, 0..1. При `autoClose === false` всегда 1. */
  progress: number;
  /** true когда таймер активно идёт. */
  running: boolean;
  /** Длительность auto-close или false если выключен. */
  autoClose: number | false;
};

const INITIAL: ToastProgressState = { progress: 1, running: false, autoClose: false };

/**
 * Возвращает актуальный прогресс авто-close таймера тоста через rAF-пуллинг
 * менеджера. Опускается ровно к одному значению на кадр и обнуляет RAF при
 * unmount. Если контекст не задан (тост рендерится вне `<ToastSlot>`) —
 * возвращает «всегда 100%, не идёт».
 */
export function useToastProgress(): ToastProgressState {
  const runtime = useContext(ToastRuntimeContext);
  const [state, setState] = useState<ToastProgressState>(INITIAL);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    if (!runtime) return;
    let cancelled = false;
    let raf = 0;
    const tick = () => {
      if (cancelled) return;
      const snap = toasterManager.getTimerSnapshot(runtime.id, runtime.containerId);
      if (!snap) {
        // Тост удалён — финальное обновление и выходим.
        if (stateRef.current !== INITIAL) setState(INITIAL);
        raf = requestAnimationFrame(tick);
        return;
      }
      let next: ToastProgressState;
      if (snap.autoClose === false || snap.autoClose <= 0) {
        next = { progress: 1, running: false, autoClose: snap.autoClose };
      } else {
        const remaining = Math.max(0, snap.autoClose - snap.elapsedMs);
        next = { progress: remaining / snap.autoClose, running: snap.running, autoClose: snap.autoClose };
      }
      // Отбиваем апдейт, если ничего видимо не поменялось (округление до 0.001
      // даёт ~1px разницы при типичных размерах бара — больше не нужно).
      const prev = stateRef.current;
      if (
        prev.running !== next.running ||
        prev.autoClose !== next.autoClose ||
        Math.abs(prev.progress - next.progress) > 0.001
      ) {
        setState(next);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
    // Тикаем только при смене контекста (id/containerId). Сам `runtime` —
    // объект-обёртка из ToastSlot, добавлять его как dep'у не нужно.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runtime?.id, runtime?.containerId]);

  return state;
}
