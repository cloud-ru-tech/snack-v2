import { cloneElement, isValidElement, PointerEvent as ReactPointerEvent, ReactElement, ReactNode } from 'react';

import { POSITION_SYSTEM_EVENT, TOASTER_CONTAINER_DEFAULTS, TOASTER_CONTAINER_PREFIX } from '../../constants';
import { toasterManager } from '../../manager';
import { ManagedToast } from '../../manager/types';
import { ToasterContainerProps, ToasterPosition } from '../../types';

export type DivPointerEvent = ReactPointerEvent<HTMLDivElement>;

/**
 * Литералы статусов жизненного цикла тоста. Совпадают с `ManagedToastStatus` из
 * manager/types — продублированы здесь как `as const`-объект, чтобы код мог
 * писать `TOAST_STATUS.Leaving` вместо магических строк.
 */
export const TOAST_STATUS = {
  Entering: 'entering',
  Visible: 'visible',
  Leaving: 'leaving',
} as const;

/**
 * Селекторы интерактивных элементов внутри тоста. Используются swipe-жестом и
 * sticky-pause: pointerdown по такому потомку отдаём кликом, не дрэгом/паузой.
 */
export const INTERACTIVE_SELECTOR = 'button, a, input, textarea, select, [role="button"]';

/**
 * Селектор слота, у которого сейчас активен свайп. Фильтрует pointerup,
 * прилетающий после snap-back свайпа: setDrag из ToastSlot применится после
 * bubbling, но в DOM атрибут пока хранит предыдущее значение — без этого
 * фильтра тач-тап-инсайд срабатывал бы сразу после успешного свайпа.
 */
export const DRAGGING_SELECTOR = '[data-dragging="true"]';

/**
 * Свайп считается «достаточным», чтобы закрыть, если путь по оси ≥
 * `SWIPE_DISMISS_RATIO` от размера карточки. Иначе тост возвращается на место
 * CSS-транзишеном.
 */
export const SWIPE_DISMISS_RATIO = 0.5;

/**
 * Альтернативный порог — скорость флика (px/мс). 1.2 px/мс ≈ 1200 px/с. Любое
 * заметно более медленное движение засчитывать нельзя: на 0.5 px/мс активный
 * жест проходил порог почти сразу и тост дисмиссился мимо воли пользователя.
 */
export const SWIPE_DISMISS_VELOCITY = 2.5;

/**
 * Порог в px, после которого считаем жест «дрэгом» и подавляем клики по детям
 * тоста. До порога даём кликам пройти — кнопка close внутри тоста должна
 * работать без задержки на «а вдруг это свайп».
 */
export const SWIPE_ACTIVATION_PX = 16;

/**
 * Карта `position`-проп → имя класса в `styles.module.scss`. Один источник
 * правды для CSS-нейминга позиций — `Toaster.tsx` берёт класс по ключу, а не
 * собирает строку из значения.
 */
export const POSITION_CLASS_NAME: Record<ToasterPosition, string> = {
  [POSITION_SYSTEM_EVENT.TopLeft]: 'positionTopLeft',
  [POSITION_SYSTEM_EVENT.TopCenter]: 'positionTopCenter',
  [POSITION_SYSTEM_EVENT.TopRight]: 'positionTopRight',
  [POSITION_SYSTEM_EVENT.BottomLeft]: 'positionBottomLeft',
  [POSITION_SYSTEM_EVENT.BottomCenter]: 'positionBottomCenter',
  [POSITION_SYSTEM_EVENT.BottomRight]: 'positionBottomRight',
};

/**
 * `true`, если событие пришло от мыши. Используется, чтобы отфильтровать
 * mouse-эмуляцию на тач-устройствах: hover-логика контейнера должна реагировать
 * только на реальную мышь.
 */
export const isMousePointer = (e: DivPointerEvent | PointerEvent): boolean => e.pointerType === 'mouse';

/**
 * `true`, если событие пришло от тача. Триггерит sticky-pause / тач-тап логику,
 * которая не должна срабатывать для мыши.
 */
export const isTouchPointer = (e: DivPointerEvent | PointerEvent): boolean => e.pointerType === 'touch';

/**
 * Trims to `limit` visible slots, keeping `leaving` cards in the DOM until their
 * exit animation completes. Manager prepends новые тосты в начало массива; front
 * (самый старый visible) сохраняется, чтобы anchor не прыгал — drop'аем newest.
 * Leaving cards count against the budget so queue items wait for slide-out.
 * `limit ≤ 0` or `undefined` → no limit.
 */
export function clipByLimit(toasts: ManagedToast[], limit: number | undefined): ManagedToast[] {
  if (typeof limit !== 'number' || limit <= 0) return toasts;
  const leavingCount = toasts.reduce((acc, t) => (t.status === TOAST_STATUS.Leaving ? acc + 1 : acc), 0);
  const allowedActive = Math.max(0, limit - leavingCount);
  const active = toasts.filter(t => t.status !== TOAST_STATUS.Leaving);
  if (active.length <= allowedActive) return toasts;
  const dropCount = active.length - allowedActive;
  const droppedIds = new Set<ManagedToast['id']>();
  for (const toast of toasts) {
    if (droppedIds.size >= dropCount) break;
    if (toast.status !== TOAST_STATUS.Leaving) droppedIds.add(toast.id);
  }
  return toasts.filter(t => !droppedIds.has(t.id));
}

/**
 * Inject `closeToast` callback into `toast.content`. Card calls the callback;
 * it doesn't know about the manager.
 */
export function cloneToastContent(toast: ManagedToast, containerId: string): ReactNode {
  const close = () => toasterManager.dismiss(toast.id, containerId);
  if (!isValidElement(toast.content)) return toast.content;
  return cloneElement(toast.content as ReactElement<{ closeToast?: () => void }>, { closeToast: close });
}

export type MergedToasterProps = Required<
  Pick<ToasterContainerProps, 'type' | 'position' | 'limit' | 'displayCloseAllButton' | 'width' | 'containerId'>
> &
  Pick<ToasterContainerProps, 'stacked' | 'draggable' | 'draggableDirection'>;

export function mergeWithDefaults(props: ToasterContainerProps): MergedToasterProps {
  const defaults = TOASTER_CONTAINER_DEFAULTS[props.type];
  return {
    type: props.type,
    position: props.position ?? defaults.position,
    limit: props.limit ?? defaults.limit,
    displayCloseAllButton: props.displayCloseAllButton ?? defaults.displayCloseAllButton,
    width: props.width ?? defaults.width,
    containerId: props.containerId ?? `${TOASTER_CONTAINER_PREFIX}${props.type}`,
    stacked: props.stacked,
    draggable: props.draggable,
    draggableDirection: props.draggableDirection,
  };
}

/**
 * Таймеры автозакрытия на паузе, если внутри контейнера курсор/фокус
 * (`hovered`) либо включён sticky-pause после тач-тапа (`touchPaused`).
 */
export const isPaused = (state: { hovered: boolean; touchPaused: boolean }): boolean =>
  state.hovered || state.touchPaused;
