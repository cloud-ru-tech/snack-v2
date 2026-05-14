import { DivPointerEvent } from './types';

/**
 * `true`, если событие пришло от мыши. Используется, чтобы отфильтровать
 * mouse-эмуляцию на тач-устройствах: hover-логика контейнера должна реагировать
 * только на реальную мышь.
 */
export const isMousePointer = (e: DivPointerEvent | PointerEvent): boolean => e.pointerType === 'mouse';
