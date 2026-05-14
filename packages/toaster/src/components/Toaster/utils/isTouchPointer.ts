import { DivPointerEvent } from './types';

/**
 * `true`, если событие пришло от тача. Триггерит sticky-pause / тач-тап логику,
 * которая не должна срабатывать для мыши.
 */
export const isTouchPointer = (e: DivPointerEvent | PointerEvent): boolean => e.pointerType === 'touch';
