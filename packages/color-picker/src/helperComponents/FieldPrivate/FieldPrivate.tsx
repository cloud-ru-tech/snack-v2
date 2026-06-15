import { InputPrivate } from '@ds/input-private';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

import { NATIVE_INPUT_SUFFIX } from '../../constants';
import { Size } from '../../types';
import styles from './styles.module.scss';

export type FieldPrivateProps = WithSupportProps<{
  className?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  inputType?: 'text' | 'number';
  value?: string | number;
  onChange?(value?: string): void;
  error?: boolean;
  size?: Size;
}>;

export function FieldPrivate({
  className,
  disabled,
  value = '',
  onChange,
  min = 0,
  max = 255,
  inputType = 'number',
  error,
  size = 's',
  'aria-label': ariaLabel,
  'data-test-id': dataTestId,
  ...rest
}: FieldPrivateProps) {
  const [rawValue, setRawValue] = useState<string>(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  // Живой коммит на ввод (а не на blur): значение применяется сразу при вводе, чтобы
  // правка hex/rgb/hsv мгновенно отражалась на цвете (ревью MR!101). Поле показывает
  // ровно набранное (`rawValue`), наружу эмитим нормализованное значение.
  const handleInput = (next: string) => {
    setRawValue(next);

    if (inputType === 'number') {
      // Пустое поле в процессе ввода не коммитим (даём очистить и набрать заново).
      if (next === '') return;
      const clamped = String(Math.min(Math.max(min, Number(next) || 0), max));
      if (clamped !== String(value)) onChange?.(clamped);
      return;
    }

    if (next !== String(value)) onChange?.(next);
  };

  // Test-id для адресации нативного <input> в play/e2e: `<field-id>-native-input`.
  const inputTestId = dataTestId ? `${dataTestId}${NATIVE_INPUT_SUFFIX}` : undefined;

  const handleBlur = () => {
    // Коммит уже произошёл на вводе — на blur только нормализуем отображение к актуальному
    // `value`: clamp числа, откат частичного/невалидного hex, синхронизация после внешних правок.
    setRawValue(String(value));
  };

  useEffect(() => {
    if (inputRef.current && document.activeElement === inputRef.current) return;
    setRawValue(String(value));
  }, [value]);

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control -- InputPrivate рендерит <input>, eslint его не распознаёт как control
    <label
      className={cn(className, styles.container)}
      data-validation={error ? 'error' : undefined}
      data-disabled={disabled || undefined}
      data-size={size}
      data-test-id={dataTestId}
      {...extractSupportProps(rest)}
    >
      <InputPrivate
        ref={inputRef}
        value={rawValue}
        onChange={handleInput}
        onBlur={handleBlur}
        type={inputType === 'number' ? 'number' : 'text'}
        disabled={disabled}
        aria-label={ariaLabel}
        data-test-id={inputTestId}
        {...(inputType === 'number' ? { min, max } : {})}
      />
    </label>
  );
}
