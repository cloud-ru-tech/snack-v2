import { useEffect, useState } from 'react';

/**
 * Mount/unmount transition phase для портал-компонента.
 *
 * Возвращает два независимых флага:
 *  - `isMounted` — нужно ли рендерить DOM. `false` после `open=false` + завершения leave-анимации.
 *  - `isActive`  — поднят ли state «активен» (для CSS-перехода). `true` после первого frame'а
 *                  после mount'а; `false` сразу при `open=false` (запускает leave-анимацию).
 *
 * Связка `isMounted=true, isActive=false` ставится при первом рендере: элемент в DOM, но
 * в начальной позиции. Через double-rAF переключается на `isActive=true`, что инициирует
 * CSS-transition на конечную позицию.
 *
 * На `open=false`: `isActive` сразу сбрасывается (CSS-transition в обратку), `isMounted`
 * остаётся `true` ещё `exitDurationMs` ms, после чего размонтируем.
 *
 * `exitDurationMs === 0` — мгновенный цикл (для `disableMotions`): `isActive` поднимается
 * сразу при mount, `isMounted` сбрасывается сразу при close без таймера и без double-rAF.
 */
export function useTransitionPhase(open: boolean, exitDurationMs: number) {
  const [isMounted, setIsMounted] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      if (exitDurationMs === 0) {
        setIsActive(true);
        return;
      }
      let raf2Id = 0;
      const raf1Id = requestAnimationFrame(() => {
        raf2Id = requestAnimationFrame(() => setIsActive(true));
      });
      return () => {
        cancelAnimationFrame(raf1Id);
        cancelAnimationFrame(raf2Id);
      };
    }

    setIsActive(false);
    if (exitDurationMs === 0) {
      setIsMounted(false);
      return;
    }
    const timeoutId = window.setTimeout(() => setIsMounted(false), exitDurationMs);
    return () => window.clearTimeout(timeoutId);
  }, [open, exitDurationMs]);

  return { isMounted, isActive };
}
