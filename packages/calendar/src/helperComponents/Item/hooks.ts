import { preventScrollOnArrowKeys } from '@ds/utils';
import { KeyboardEvent, KeyboardEventHandler, useCallback } from 'react';

import { CALENDAR_MODE, GRID_SIZE, VIEW_MODE } from '../../constants';
import { useCalendarContext } from '../../hooks';
import { stringifyAddress } from '../../utils';

/**
 * Параметры хука {@link useKeyboardFocus}.
 */
type UseKeyboardFocusProps = {
  /** Индекс строки и столбца `[row, column]` ячейки в сетке текущего представления (`viewMode`). */
  address: [number, number];
  /** Дополнительный обработчик клавиш; вызывается до встроенной навигации по сетке. */
  onKeyDown?: KeyboardEventHandler;
  /**
   * Включить встроенную навигацию (стрелки, Tab по правилам контекста календаря).
   * При `false` остаётся только вызов `onKeyDown` — например, если у ячейки нет адреса в сетке и перемещаться стрелками некуда.
   */
  enabled: boolean;
};

/**
 * Возвращает мемоизированный обработчик `onKeyDown` для клавиатурной навигации по ячейкам сетки календаря.
 *
 * Сначала вызывается переданный `onKeyDown` (если есть). Затем при `enabled === true` обрабатываются:
 * `ArrowLeft` / `ArrowRight` — сдвиг фокуса по колонкам в пределах текущего `viewMode`;
 * `ArrowUp` / `ArrowDown` — сдвиг по строкам; на границе сетки меняется `viewShift` и фокус переносится на противоположную строку той же колонки;
 * `Tab` без Shift — в режимах, отличных от месячного вида в `CALENDAR_MODE.DateTime`, вызывается `onFocusLeave('next')` для выхода из сетки.
 *
 * @param props.address Координаты ячейки `[row, column]` в сетке текущего представления.
 * @param props.onKeyDown Дополнительный обработчик клавиш; выполняется до встроенной навигации.
 * @param props.enabled При `false` встроенная навигация стрелками и Tab не выполняется (остаётся только вызов `onKeyDown`).
 * @returns Обработчик `KeyboardEvent<HTMLButtonElement>` для привязки к ячейке.
 */
export function useKeyboardFocus({ address: [row, column], onKeyDown, enabled = true }: UseKeyboardFocusProps) {
  const { viewMode, viewShift, setViewShift, setFocus, onFocusLeave, mode } = useCalendarContext();

  const { rows, columns } = GRID_SIZE[viewMode];

  return useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      onKeyDown?.(e);

      if (!enabled) {
        return;
      }

      // Стрелки навигации по сетке гасим: без preventDefault нативное поведение прокручивает
      // страницу (фокус в ячейке-кнопке, событие иначе уходит за календарь).
      preventScrollOnArrowKeys(e);

      switch (e.key) {
        case 'ArrowLeft':
          if (column) {
            setFocus(stringifyAddress([row, column - 1]));
          }
          return;
        case 'ArrowRight':
          if (column < columns - 1) {
            setFocus(stringifyAddress([row, column + 1]));
          }
          return;
        case 'ArrowUp':
          if (row) {
            setFocus(stringifyAddress([row - 1, column]));
          } else {
            setViewShift(viewShift - 1);
            setFocus(stringifyAddress([rows - 1, column]));
          }
          return;
        case 'ArrowDown':
          if (row < rows - 1) {
            setFocus(stringifyAddress([row + 1, column]));
          } else {
            setViewShift(viewShift + 1);
            setFocus(stringifyAddress([0, column]));
          }
          return;
        case 'Tab':
          if (!e.shiftKey && (mode !== CALENDAR_MODE.DateTime || viewMode !== VIEW_MODE.Month)) {
            onFocusLeave?.('next');
          }
          return;
        default:
        // do nothing
      }
    },
    [column, columns, enabled, mode, onFocusLeave, onKeyDown, row, rows, setFocus, setViewShift, viewMode, viewShift],
  );
}
