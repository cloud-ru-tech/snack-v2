import { ClipboardEvent, KeyboardEvent, MouseEvent, RefObject, useCallback, useRef } from 'react';

import { SlotMeta } from './segments';

type UseSegmentedMaskParams = {
  inputRef: RefObject<HTMLInputElement | null>;
  /** Полная строка-маска (плейсхолдеры всех сегментов + разделители). */
  mask: string;
  /** Сегменты в порядке следования. */
  slots: SlotMeta[];
  readonly?: boolean;
  disabled?: boolean;
  /**
   * Записать новое значение в контролируемый input. InputPrivate — controlled, поэтому после
   * императивной правки DOM (`input.value = …`) синхронизируем React-state тем же значением:
   * `value === DOM` → React не перезаписывает input и сохраняет `setSelectionRange` (подсветку сегмента).
   */
  setValue(masked: string): void;
  /** Текущее значение маски после правки — для парсинга в `Date`/`TimeValue` (пустая строка, если не заполнено). */
  onMaskedChange(masked: string): void;
  /** ArrowDown — открыть пикер / передать фокус в него. */
  onArrowDown?(): void;
  /** ArrowUp — закрыть пикер, если он открыт. */
  onArrowUp?(): void;
  /** Escape — закрыть пикер. */
  onEscape?(): void;
  /** Любая правка ввода (паритет с легаси — закрывает пикер). */
  onEdit?(): void;
};

/**
 * Сегментный ввод даты/времени (порт `useDateField` из @snack-uikit/fields). Каретка ходит по
 * сегментам (`setSelectionRange` подсвечивает текущий), цифры заполняют сегмент с авто-переходом,
 * стрелки двигают по сегментам, Backspace очищает сегмент до плейсхолдера.
 */
export function useSegmentedMask({
  inputRef,
  mask,
  slots,
  readonly,
  disabled,
  setValue,
  onMaskedChange,
  onArrowDown,
  onArrowUp,
  onEscape,
  onEdit,
}: UseSegmentedMaskParams) {
  const firstSlot = slots[0];
  const lastSlot = slots[slots.length - 1];

  const indexOf = useCallback((slot: SlotMeta) => slots.indexOf(slot), [slots]);
  const nextSlot = useCallback(
    (slot: SlotMeta) => slots[Math.min(indexOf(slot) + 1, slots.length - 1)],
    [indexOf, slots],
  );
  const prevSlot = useCallback((slot: SlotMeta) => slots[Math.max(indexOf(slot) - 1, 0)], [indexOf, slots]);

  const selectSlot = useCallback(
    (slot: SlotMeta) => {
      inputRef.current?.setSelectionRange(slot.start, slot.end);
    },
    [inputRef],
  );

  const slotFromIndex = useCallback(
    (index: number | null): SlotMeta => {
      if (index == null) return firstSlot;
      const found = slots.find(slot => index >= slot.start && index <= slot.end);
      if (found) return found;
      return index < firstSlot.start ? firstSlot : lastSlot;
    },
    [firstSlot, lastSlot, slots],
  );

  const getSlotText = useCallback(
    (slot: SlotMeta) => inputRef.current?.value.slice(slot.start, slot.end) ?? '',
    [inputRef],
  );
  const isSlotFilled = useCallback((slot: SlotMeta) => /^\d+$/.test(getSlotText(slot)), [getSlotText]);
  const isFilled = useCallback(() => slots.every(isSlotFilled), [isSlotFilled, slots]);

  const ensureMask = useCallback(() => {
    const input = inputRef.current;
    if (input && !input.value) {
      input.value = mask;
      setValue(mask);
    }
  }, [inputRef, mask, setValue]);

  const updateSlot = useCallback(
    (slot: SlotMeta, slotValue: number | string) => {
      const input = inputRef.current;
      if (!input) return;
      const len = slot.end - slot.start;
      const padded = slotValue.toString().padStart(len, '0').slice(-len);
      input.value = input.value.slice(0, slot.start) + padded + input.value.slice(slot.end);
      setValue(input.value);
      selectSlot(slot);
    },
    [inputRef, selectSlot, setValue],
  );

  const clearSlot = useCallback(
    (slot: SlotMeta) => {
      const input = inputRef.current;
      if (!input) return;
      input.value = input.value.slice(0, slot.start) + slot.placeholder + input.value.slice(slot.end);
      setValue(input.value);
      selectSlot(slot);
    },
    [inputRef, selectSlot, setValue],
  );

  // Корректность даты: день должен существовать в выбранном месяце/году. Для time-only — всегда true.
  const isValidDate = useCallback(() => {
    const daySlot = slots.find(s => s.key === 'day');
    const monthSlot = slots.find(s => s.key === 'month');
    const yearSlot = slots.find(s => s.key === 'year');
    if (!daySlot || !monthSlot || !yearSlot) return true;
    const day = parseInt(getSlotText(daySlot), 10);
    const month = parseInt(getSlotText(monthSlot), 10);
    const year = parseInt(getSlotText(yearSlot), 10);
    if (!month || !day) return true;
    // Високосный 2020 как fallback, если год ещё не введён.
    const date = new Date(year || 2020, month - 1, day);
    return date.getDate() === day;
  }, [getSlotText, slots]);

  const tryToComplete = useCallback(() => {
    const input = inputRef.current;
    if (input && isFilled() && isValidDate()) {
      const end = input.value.length;
      input.setSelectionRange(end, end);
      return true;
    }
    return false;
  }, [inputRef, isFilled, isValidDate]);

  // Эмитим только при РЕАЛЬНОЙ смене строки: неполный ввод даёт '' один раз, а не на каждый
  // промежуточный keydown — иначе многократный onChange(undefined) каскадит через picker
  // (TimePickerDropdown value↔dateAndTime sync) и упирается в max-update-depth.
  const lastEmittedRef = useRef<string | null>(null);
  const emit = useCallback(() => {
    const input = inputRef.current;
    const current = input && isFilled() ? input.value : '';
    if (current === lastEmittedRef.current) return;
    lastEmittedRef.current = current;
    onMaskedChange(current);
  }, [inputRef, isFilled, onMaskedChange]);

  const checkInputAndGoNext = useCallback(
    (slot: SlotMeta) => {
      if (slot === lastSlot && tryToComplete()) {
        return;
      }
      if (isValidDate()) {
        selectSlot(nextSlot(slot));
        return;
      }
      // Дата невалидна — откатываем зависимый сегмент к плейсхолдеру и возвращаем туда фокус.
      const daySlot = slots.find(s => s.key === 'day');
      const monthSlot = slots.find(s => s.key === 'month');
      if (slot.key === 'day' && monthSlot) {
        clearSlot(monthSlot);
        return;
      }
      if ((slot.key === 'month' || slot.key === 'year') && daySlot) {
        clearSlot(daySlot);
        return;
      }
      selectSlot(nextSlot(slot));
    },
    [clearSlot, isValidDate, lastSlot, nextSlot, selectSlot, slots, tryToComplete],
  );

  const typeDigit = useCallback(
    (slot: SlotMeta, key: string) => {
      const text = getSlotText(slot);
      const numberValue = Number(text) || 0;
      const digit = Number(key);
      const slotValue = parseInt(numberValue.toString() + key, 10) || 0;
      const valueLength = slotValue.toString().length;
      const maxLength = slot.max.toString().length;
      const isTheLastInput = /^0+$/.test(text) && maxLength === 2 && digit === 0;

      if (valueLength < maxLength) {
        if (slotValue || slotValue >= slot.min) {
          updateSlot(slot, slotValue);
          if (isTheLastInput) checkInputAndGoNext(slot);
        }
        if (slotValue * 10 > slot.max) {
          checkInputAndGoNext(slot);
        }
      } else if (valueLength > maxLength) {
        if (digit * 10 > slot.max) {
          updateSlot(slot, key);
          checkInputAndGoNext(slot);
        } else if (digit || digit >= slot.min) {
          updateSlot(slot, key);
        }
      } else if (slotValue <= slot.max) {
        updateSlot(slot, slotValue);
        checkInputAndGoNext(slot);
      } else if (digit * 10 > slot.max) {
        updateSlot(slot, key);
        checkInputAndGoNext(slot);
      } else if (digit || digit >= slot.min) {
        updateSlot(slot, key);
      }
    },
    [checkInputAndGoNext, getSlotText, updateSlot],
  );

  const handleFocus = useCallback(() => {
    if (readonly || disabled) return;
    ensureMask();
    // На фокус всегда выбираем ПЕРВЫЙ сегмент (паритет с легаси). При клике мышью `handleClick`
    // отработает следом и перевыберет сегмент под кареткой; при Tab остаётся первый.
    selectSlot(firstSlot);
  }, [disabled, ensureMask, firstSlot, readonly, selectSlot]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLInputElement>) => {
      if (readonly || disabled) return;
      ensureMask();
      selectSlot(slotFromIndex(event.currentTarget.selectionStart));
    },
    [disabled, ensureMask, readonly, selectSlot, slotFromIndex],
  );

  const handleBlur = useCallback(() => {
    const input = inputRef.current;
    if (input && input.value === mask) {
      input.value = '';
      setValue('');
    }
  }, [inputRef, mask, setValue]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const input = inputRef.current;
      if (!input || readonly || disabled) return;

      // Tab уводит фокус из поля — не перехватываем.
      if (event.key === 'Tab') return;

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        onArrowDown?.();
        return;
      }

      // ArrowUp закрывает открытый пикер (фокус остаётся в поле на текущем сегменте).
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        onArrowUp?.();
        return;
      }

      onEdit?.();

      if (event.key === 'Escape') {
        event.preventDefault();
        onEscape?.();
        input.blur();
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      ensureMask();

      const slot = slotFromIndex(input.selectionStart);

      if (event.key === 'ArrowRight') {
        // На последнем сегменте каретка уходит в конец строки (паритет с легаси useDateField):
        // цепной useButtonNavigation в том же keydown видит cursor-at-end и забирает фокус
        // на postfix-кнопку (clear/copy).
        if (slot === lastSlot) {
          const end = input.value.length;
          input.setSelectionRange(end, end);
          return;
        }
        selectSlot(nextSlot(slot));
        return;
      }
      if (event.key === 'ArrowLeft') {
        selectSlot(prevSlot(slot));
        return;
      }
      if (event.key === 'Backspace') {
        clearSlot(slot);
        emit();
        return;
      }
      if (event.key === 'Enter') {
        tryToComplete();
        emit();
        return;
      }
      if (/^\d$/.test(event.key)) {
        typeDigit(slot, event.key);
        emit();
      }
    },
    [
      clearSlot,
      disabled,
      emit,
      ensureMask,
      inputRef,
      lastSlot,
      nextSlot,
      onArrowDown,
      onArrowUp,
      onEdit,
      onEscape,
      prevSlot,
      readonly,
      selectSlot,
      slotFromIndex,
      tryToComplete,
      typeDigit,
    ],
  );

  // Вставка (Ctrl+V) полной строки даты/времени: вытаскиваем цифры и заполняем сегменты
  // слева направо. Нативный onChange у поля игнорируется (движок controlled), поэтому без
  // этого обработчика вставка не работала бы вовсе.
  const handlePaste = useCallback(
    (event: ClipboardEvent<HTMLInputElement>) => {
      if (readonly || disabled) return;
      event.preventDefault();
      const digits = event.clipboardData.getData('text').replace(/\D/g, '');
      if (!digits) return;
      ensureMask();

      let cursor = 0;
      let lastFilled: SlotMeta | undefined;
      for (const slot of slots) {
        const len = slot.end - slot.start;
        const chunk = digits.slice(cursor, cursor + len);
        if (chunk.length < len) break;
        updateSlot(slot, chunk);
        lastFilled = slot;
        cursor += len;
      }

      if (lastFilled === lastSlot) {
        tryToComplete();
      } else if (lastFilled) {
        selectSlot(nextSlot(lastFilled));
      }
      emit();
    },
    [disabled, emit, ensureMask, lastSlot, nextSlot, readonly, selectSlot, slots, tryToComplete, updateSlot],
  );

  return { handleKeyDown, handleClick, handleFocus, handleBlur, handlePaste, selectSlot, firstSlot, lastSlot };
}
