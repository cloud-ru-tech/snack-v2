import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';

import { LEAVE_ANIMATION_MS } from '../../../constants';
import { toasterManager } from '../../../manager';
import { ManagedToast } from '../../../manager/types';
import { DraggableDirection } from '../../../types';
import {
  DivPointerEvent,
  INTERACTIVE_SELECTOR,
  SWIPE_ACTIVATION_PX,
  SWIPE_DISMISS_RATIO,
  SWIPE_DISMISS_VELOCITY,
  TOAST_STATUS,
} from '../utils';

type Rect = { top: number; left: number; width: number; height: number };
type DragState = { delta: number; active: boolean; dismissing: boolean; rect: Rect };
type StartRef = { x: number; y: number; time: number; pointerId: number; rect: Rect };

type SwipeOptions = {
  toast: ManagedToast;
  containerId: string;
  draggable: boolean;
  draggableDirection: DraggableDirection;
};

type SwipeBindings = {
  enabled: boolean;
  isDragging: boolean;
  style: CSSProperties | undefined;
  /**
   * Стайл-обёртки-слота. Когда тост ушёл в `position: fixed`, слот в flex-flow
   * получает явные размеры захваченного rect'а — соседи не смещаются. В покое
   * — `undefined` (слот `display: contents`).
   */
  slotStyle: CSSProperties | undefined;
  onPointerDown: (e: DivPointerEvent) => void;
  onPointerMove: (e: DivPointerEvent) => void;
  onPointerUp: (e: DivPointerEvent) => void;
};

/**
 * Swipe-to-dismiss для одного тоста: захватывает pointer, после порога
 * `SWIPE_ACTIVATION_PX` ведёт карточку за пальцем, на pointerup — dismiss
 * либо snap-back, в зависимости от пройденного пути и скорости. Ставит
 * autoClose-таймер на паузу на время взаимодействия и резюмирует на отказ
 * от жеста.
 *
 * ⚠️ UNSTABLE. Свайп подразумевает, что на drag'е карточка переключается в
 * `position: fixed` и резолвится к containing-block-предку `.toasterRoot`
 * (`container-type: size`). Если в DOM выше или внутри scroll-host'а
 * появляется новый CB (transform/filter/will-change/contain) — координаты
 * расходятся, тост приземляется в неверной точке. Конструкция чувствительна
 * к раскладке родителя; перед production-использованием нужно стабилизировать
 * (порталы поверх scroll-host'а или альтернативный layout-mode без overflow-
 * wrapper'а).
 */
export function useSwipeGesture({ toast, containerId, draggable, draggableDirection }: SwipeOptions): SwipeBindings {
  const enabled = draggable && toast.status === TOAST_STATUS.Visible;
  const [drag, setDrag] = useState<DragState | null>(null);
  const startRef = useRef<StartRef | null>(null);

  const handlePointerDown = useCallback(
    (e: DivPointerEvent) => {
      if (!enabled) return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      // Не перехватываем drag с интерактивных детей — иначе кнопка close внутри
      // тоста не сработает (pointerCapture забирает события у потомков).
      if ((e.target as HTMLElement).closest(INTERACTIVE_SELECTOR)) return;
      // Снимаем rect карточки в момент pointerDown — на нём собираем `position:
      // fixed`-стайл во время drag'a (см. style ниже). containing block для
      // fixed создаётся .toasterRoot'ом (`container-type: size`), поэтому
      // карточка визуально выходит за пределы scroll-host'а и не клипится
      // его overflow:hidden.
      const r = e.currentTarget.getBoundingClientRect();
      // Ищем containing-block-предка fixed-потомков: это .toasterRoot
      // (`container-type: size` создаёт CB). Координаты, которые мы дальше
      // пишем в `top/left`, должны быть в его системе, иначе при кастомном
      // toasterParent'е тост приземлится в неверной точке экрана.
      const root = (e.currentTarget as HTMLElement).closest('[data-toaster-root]') as HTMLElement | null;
      const rootRect = root?.getBoundingClientRect();
      const offsetTop = rootRect?.top ?? 0;
      const offsetLeft = rootRect?.left ?? 0;
      startRef.current = {
        x: e.clientX,
        y: e.clientY,
        time: performance.now(),
        pointerId: e.pointerId,
        rect: {
          top: r.top - offsetTop,
          left: r.left - offsetLeft,
          width: r.width,
          height: r.height,
        },
      };
      toasterManager.pause({ id: toast.id, containerId });
    },
    [enabled, toast.id, containerId],
  );

  const handlePointerMove = useCallback(
    (e: DivPointerEvent) => {
      const start = startRef.current;
      if (!start || start.pointerId !== e.pointerId) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      const delta = draggableDirection === 'y' ? dy : dx;
      const cross = draggableDirection === 'y' ? dx : dy;
      // Первое движение явно поперёк оси — отказываемся от жеста, отдаём
      // событие нативной прокрутке (vertical scroll на mobile).
      if (!drag && Math.abs(cross) > Math.abs(delta) && Math.abs(cross) > SWIPE_ACTIVATION_PX) {
        startRef.current = null;
        toasterManager.play({ id: toast.id, containerId });
        return;
      }
      if (!drag && Math.abs(delta) < SWIPE_ACTIVATION_PX) return;
      // Активирован: захватываем pointer, чтобы pointerup пришёл нам даже если
      // палец уехал за пределы карточки. stopPropagation глушит дальнейшие
      // pointer-события до контейнера (его hover/touch-pause handlers и
      // bubbling в стек) — иначе свайп параллельно триггерит "expand stack" /
      // sticky-pause и т.п.
      if (!drag) e.currentTarget.setPointerCapture(e.pointerId);
      e.stopPropagation();
      setDrag({ delta, active: true, dismissing: false, rect: start.rect });
    },
    [drag, draggableDirection, toast.id, containerId],
  );

  const handlePointerUp = useCallback(
    (e: DivPointerEvent) => {
      const start = startRef.current;
      startRef.current = null;
      if (!start) return;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      const delta = draggableDirection === 'y' ? dy : dx;
      const elapsed = Math.max(1, performance.now() - start.time);
      const velocity = Math.abs(delta) / elapsed;
      const el = e.currentTarget;
      const size = draggableDirection === 'y' ? el.offsetHeight : el.offsetWidth;
      const ratio = size > 0 ? Math.abs(delta) / size : 0;
      const reachedThreshold = ratio >= SWIPE_DISMISS_RATIO || velocity >= SWIPE_DISMISS_VELOCITY;

      if (!drag) {
        // Drag так и не активировался — обычный клик; только возобновляем таймер.
        toasterManager.play({ id: toast.id, containerId });
        return;
      }
      // Свайп активный — pointerup отрабатывает мы сами (dismiss / snap-back);
      // не даём ему дальше всплыть и сработать как тап по контейнеру.
      e.stopPropagation();
      if (reachedThreshold) {
        // Замораживаем тост в точке окончания свайпа и угашаем opacity без
        // дополнительного сдвига к краю: на мобилке viewport обрезает правый
        // край, остаётся затухающая левая половина и кажется, что тост уехал
        // налево. Fade на месте читается однозначно.
        setDrag({ delta, active: false, dismissing: true, rect: start.rect });
        toasterManager.dismiss(toast.id, containerId);
        return;
      }
      // Снап обратно: active=false включает CSS-transition, delta=0 плавно
      // возвращает карточку, после чего сбрасываем state.
      setDrag({ delta: 0, active: false, dismissing: false, rect: start.rect });
      toasterManager.play({ id: toast.id, containerId });
      window.setTimeout(() => setDrag(null), LEAVE_ANIMATION_MS);
    },
    [drag, draggableDirection, toast.id, containerId],
  );

  const style = useMemo<CSSProperties | undefined>(() => {
    if (!drag) return undefined;
    const translate =
      draggableDirection === 'y' ? `translate3d(0, ${drag.delta}px, 0)` : `translate3d(${drag.delta}px, 0, 0)`;
    // Поднимаем карточку в `position: fixed` относительно `.toasterRoot`
    // (он создаёт containing block через `container-type: size`). Это позволяет
    // swipe-у физически выйти за пределы `.os-viewport` Scroll-host'а, который
    // по CSS-спеке клипит и translate-paint своих потомков (overflow: hidden).
    // Координаты — захваченный в pointerDown rect; высоту фиксируем, чтобы
    // карточка визуально занимала тот же бокс, что в flex-flow.
    const fixed: CSSProperties = {
      position: 'fixed',
      top: drag.rect.top,
      left: drag.rect.left,
      width: drag.rect.width,
      height: drag.rect.height,
    };
    return drag.dismissing ? { ...fixed, transform: translate, opacity: 0 } : { ...fixed, transform: translate };
  }, [drag, draggableDirection]);

  const slotStyle = useMemo<CSSProperties | undefined>(() => {
    if (!drag) return undefined;
    return {
      display: 'block',
      width: drag.rect.width,
      height: drag.rect.height,
      flexShrink: 0,
    };
  }, [drag]);

  return {
    enabled,
    isDragging: Boolean(drag?.active),
    style,
    slotStyle,
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
  };
}
