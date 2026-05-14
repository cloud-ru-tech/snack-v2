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
