// Общий overlay-chrome (media / footer-ориентация / слот-`data-test-id`) вынесен в `@ds/popup-private`.
// Реэкспортируем под теми же именами — внешний контракт `@ds/bottom-sheet` не меняется.
export { FOOTER_ACTIONS_ORIENTATION, MEDIA_KIND, TEST_IDS } from '@ds/popup-private';

/**
 * Data-атрибут escape-hatch: drag-to-dismiss bottom-sheet'а **не** начинается, если жест стартовал на
 * элементе с этим атрибутом или его предке. Вешай его на собственный draggable-контент внутри sheet'а
 * (слайдеры, color-picker, карты, canvas), иначе нативный drag контрола одновременно потащит sheet к
 * закрытию. Аналог `touch-action`/`useSwipeable`-блокировки из легаси.
 *
 * @example
 * <BottomSheet content={<div {...{ [NO_DRAG_ATTRIBUTE]: '' }}><ColorPicker … /></div>} />
 */
export const NO_DRAG_ATTRIBUTE = 'data-bottom-sheet-no-drag';
