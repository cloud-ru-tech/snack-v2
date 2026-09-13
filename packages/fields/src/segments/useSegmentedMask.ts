import { useEventHandler } from '@ds/utils';
import { ClipboardEvent, KeyboardEvent, MouseEvent, RefObject, useCallback, useRef } from 'react';

import { SegmentKey, SlotMeta } from './segments';

const RESET_TYPED_KEYS = new Set([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Backspace',
  'Delete',
  'Enter',
  'Tab',
  'Escape',
]);

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
 * `nativeInputRef` передаётся в `ref` того же input'а: значение правится через нативные `beforeinput`/`input`.
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

  // Цифры сегмента храним отдельно от текста: по `01` в поле не отличить `1` от `0` + `1`.
  const typedRef = useRef<{ key: SegmentKey; digits: string } | null>(null);
  const resetTyped = useCallback(() => {
    typedRef.current = null;
  }, []);

  const typeDigit = useCallback(
    (slot: SlotMeta, key: string) => {
      const maxLength = slot.max.toString().length;
      const prev = typedRef.current?.key === slot.key ? typedRef.current.digits : '';
      const appended = prev + key;
      const overflow = Number(appended) > slot.max;
      const digits = overflow ? key : appended;
      const value = Number(digits);
      const complete = overflow || digits.length >= maxLength || value * 10 > slot.max;
      const accepted = value >= slot.min;

      if (accepted) updateSlot(slot, value);

      if (!complete) {
        typedRef.current = { key: slot.key, digits };
        return;
      }

      typedRef.current = null;
      if (accepted) checkInputAndGoNext(slot);
    },
    [checkInputAndGoNext, updateSlot],
  );

  const handleFocus = useCallback(() => {
    if (readonly || disabled) return;
    resetTyped();
    ensureMask();
    // На фокус всегда выбираем ПЕРВЫЙ сегмент (паритет с легаси). При клике мышью `handleClick`
    // отработает следом и перевыберет сегмент под кареткой; при Tab остаётся первый.
    selectSlot(firstSlot);
  }, [disabled, ensureMask, firstSlot, readonly, resetTyped, selectSlot]);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLInputElement>) => {
      if (readonly || disabled) return;
      resetTyped();
      ensureMask();
      selectSlot(slotFromIndex(event.currentTarget.selectionStart));
    },
    [disabled, ensureMask, readonly, resetTyped, selectSlot, slotFromIndex],
  );

  const handleBlur = useCallback(() => {
    resetTyped();
    const input = inputRef.current;
    if (input && input.value === mask) {
      input.value = '';
      setValue('');
    }
  }, [inputRef, mask, resetTyped, setValue]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const input = inputRef.current;
      if (!input || readonly || disabled) return;

      if (RESET_TYPED_KEYS.has(event.key)) resetTyped();

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

      // Копирование и вставку не блокируем: правку поля перехватит beforeinput.
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      onEdit?.();

      // Экранные клавиатуры присылают `Unidentified` вместо цифры, её данные есть только в beforeinput.
      if (/^\d$/.test(event.key) || event.key === 'Unidentified') return;

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
      resetTyped,
      selectSlot,
      slotFromIndex,
      tryToComplete,
    ],
  );

  const fillFromDigits = useCallback(
    (digits: string) => {
      resetTyped();
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
    },
    [ensureMask, lastSlot, nextSlot, resetTyped, selectSlot, slots, tryToComplete, updateSlot],
  );

  const handlePaste = useCallback(
    (event: ClipboardEvent<HTMLInputElement>) => {
      if (readonly || disabled) return;
      event.preventDefault();
      const digits = event.clipboardData.getData('text').replace(/\D/g, '');
      if (!digits) return;
      fillFromDigits(digits);
      emit();
    },
    [disabled, emit, fillFromDigits, readonly],
  );

  const applyEdit = useCallback(
    (inputType: string, text: string) => {
      const input = inputRef.current;
      if (!input) return;
      onEdit?.();

      if (inputType.startsWith('delete')) {
        resetTyped();
        clearSlot(slotFromIndex(input.selectionStart));
        emit();
        return;
      }

      const digits = text.replace(/\D/g, '');
      if (!inputType.startsWith('insert') || !digits) return;

      // Автозаполнение, `fill` и drop присылают строку целиком.
      if (text.length > 1) {
        fillFromDigits(digits);
      } else {
        typeDigit(slotFromIndex(input.selectionStart), digits);
      }
      emit();
    },
    [clearSlot, emit, fillFromDigits, inputRef, onEdit, resetTyped, slotFromIndex, typeDigit],
  );

  // Композицию IME браузер не даёт отменить — откатываем её в input.
  const pendingEditRef = useRef<{ value: string; start: number; end: number } | null>(null);

  const handleBeforeInput = useCallback(
    (event: InputEvent) => {
      const input = inputRef.current;
      if (!input || readonly || disabled) return;
      ensureMask();

      if (!event.cancelable) {
        pendingEditRef.current = { value: input.value, start: input.selectionStart ?? 0, end: input.selectionEnd ?? 0 };
        return;
      }

      event.preventDefault();
      applyEdit(event.inputType, event.data ?? event.dataTransfer?.getData('text') ?? '');
    },
    [applyEdit, disabled, ensureMask, inputRef, readonly],
  );

  const handleInput = useCallback(
    (event: Event) => {
      const input = inputRef.current;
      if (!input || readonly || disabled) return;
      const pending = pendingEditRef.current;
      pendingEditRef.current = null;

      if (pending) {
        const inputType = event instanceof InputEvent ? event.inputType : '';
        const inserted = input.value.slice(pending.start, input.value.length - (pending.value.length - pending.end));
        input.value = pending.value;
        setValue(pending.value);
        input.setSelectionRange(pending.start, pending.end);
        // Цифру композиции вводит её фиксация (insertText), иначе цифра запишется дважды.
        if (!inputType.includes('Composition')) applyEdit(inputType, inserted);
        return;
      }

      // Автозаполнение меняет значение без beforeinput.
      const digits = input.value.replace(/\D/g, '');
      input.value = mask;
      setValue(mask);
      fillFromDigits(digits);
      emit();
    },
    [applyEdit, disabled, emit, fillFromDigits, inputRef, mask, readonly, setValue],
  );

  // React 18 не отдаёт `inputType` в `onBeforeInput`, поэтому слушаем нативные события.
  const onNativeBeforeInput = useEventHandler(handleBeforeInput);
  const onNativeInput = useEventHandler(handleInput);
  const attachedInputRef = useRef<HTMLInputElement | null>(null);
  const nativeInputRef = useCallback(
    (node: HTMLInputElement | null) => {
      /* eslint-disable @cloud-ru/ssr-safe-react/domApi -- callback-ref вызывается только в браузере */
      attachedInputRef.current?.removeEventListener('beforeinput', onNativeBeforeInput);
      attachedInputRef.current?.removeEventListener('input', onNativeInput);
      attachedInputRef.current = node;
      node?.addEventListener('beforeinput', onNativeBeforeInput);
      node?.addEventListener('input', onNativeInput);
      /* eslint-enable @cloud-ru/ssr-safe-react/domApi */
    },
    [onNativeBeforeInput, onNativeInput],
  );

  return {
    handleKeyDown,
    handleClick,
    handleFocus,
    handleBlur,
    handlePaste,
    nativeInputRef,
    selectSlot,
    firstSlot,
    lastSlot,
  };
}
