import { InputPrivate } from '@ds/input-private';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';

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
  ...rest
}: FieldPrivateProps) {
  const [rawValue, setRawValue] = useState<string>(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = () => {
    if (inputType === 'number') {
      const rawNumberValue = Number(rawValue) || 0;
      const clamped = String(Math.min(Math.max(min, rawNumberValue), max));

      if (clamped !== rawValue) setRawValue(clamped);
      if (clamped !== String(value)) onChange?.(clamped);

      return;
    }

    if (rawValue !== String(value)) {
      onChange?.(rawValue);
      // Если parent отклонил значение (например, невалидный hex) — value не сменится,
      // useEffect ниже не сработает по deps. Возвращаем поле к актуальному `value` руками,
      // чтобы поле не «залипало» в невалидном состоянии.
      setRawValue(String(value));
    }
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
      {...extractSupportProps(rest)}
    >
      <InputPrivate
        ref={inputRef}
        value={rawValue}
        onChange={setRawValue}
        onBlur={handleBlur}
        type={inputType === 'number' ? 'number' : 'text'}
        disabled={disabled}
        aria-label={ariaLabel}
        {...(inputType === 'number' ? { min, max } : {})}
      />
    </label>
  );
}
