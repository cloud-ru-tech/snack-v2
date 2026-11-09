import { useLayoutEffect } from '@ds/utils';
import { ChangeEvent, KeyboardEvent, useCallback, useRef } from 'react';

import { TEST_IDS } from '../../constants';
import { AiFieldInputValue } from '../../types';
import { segmentsToText, textToSegments } from '../../utils';
import styles from './styles.module.scss';

export type SecureInputProps = {
  value: AiFieldInputValue;
  onChange(value: AiFieldInputValue): void;
  onSubmit(value: AiFieldInputValue): void;
  placeholder?: string;
  disabled: boolean;
  /** Поле в состоянии ошибки: `aria-invalid`. */
  invalid: boolean;
  /** `id` строки ошибки для `aria-describedby`. */
  describedBy?: string;
  /** Значение скрыто: `type="password"`. */
  masked: boolean;
};

type InputSelection = {
  start: number | null;
  end: number | null;
};

/**
 * Поле режима `secure`: нативный `<input>`. С `type="password"` браузер сам скрывает значение, не даёт его
 * скопировать или вырезать, а скринридер не зачитывает. Значение однострочное.
 */
export function SecureInput({
  value,
  onChange,
  onSubmit,
  placeholder,
  disabled,
  invalid,
  describedBy,
  masked,
}: SecureInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const selectionRef = useRef<InputSelection>({ start: null, end: null });
  const text = segmentsToText(value);

  // Поле не controlled: React 18 копирует controlled-`value` в атрибут, и секрет оказался бы в разметке.
  // Значение пишется только в DOM-свойство.
  useLayoutEffect(() => {
    const input = inputRef.current;
    if (input && input.value !== text) input.value = text;
  }, [text]);

  // Смена `type` может сбросить каретку: возвращаем её на место, если поле в фокусе.
  useLayoutEffect(() => {
    const input = inputRef.current;
    const { start, end } = selectionRef.current;
    if (!input || document.activeElement !== input || start === null || end === null) return;
    input.setSelectionRange(start, end);
  }, [masked]);

  const rememberSelection = useCallback(() => {
    const input = inputRef.current;
    if (input) selectionRef.current = { start: input.selectionStart, end: input.selectionEnd };
  }, []);

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      rememberSelection();
      onChange(textToSegments(event.target.value));
    },
    [onChange, rememberSelection],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) return;
      event.preventDefault();
      onSubmit(textToSegments(event.currentTarget.value));
    },
    [onSubmit],
  );

  return (
    <input
      ref={inputRef}
      className={styles.input}
      type={masked ? 'password' : 'text'}
      placeholder={placeholder}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      autoComplete='off'
      autoCorrect='off'
      autoCapitalize='off'
      spellCheck={false}
      data-test-id={TEST_IDS.secureInput}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onSelect={rememberSelection}
    />
  );
}
