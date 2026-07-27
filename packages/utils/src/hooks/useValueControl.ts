import { useCallback, useRef } from 'react';

import { useUncontrolledProp } from './useUncontrolledProp';

type UseValueControl<TValue> = {
  /**
   * Значение состояния
   */
  value?: TValue;
  /**
   * Значение по умолчанию
   */
  defaultValue?: TValue;
  /**
   * Колбек, вызываемый на смену состояния
   */
  onChange?(value: TValue): void;
};

/**
 * Хук для работы с состоянием.
 * Нужен для поддержки controlled/uncontrolled поведения, в зависимости от того были ли переданы входные аргументы
 */
export function useValueControl<TValue>({ value, onChange, defaultValue }: UseValueControl<TValue>) {
  // Значение читаем из ref: иначе handler пересоздавался бы на каждую смену `value`,
  // а вместе с ним — и сеттер из `useUncontrolledProp`.
  const valueRef = useRef(value);
  valueRef.current = value;

  const handleChange = useCallback(
    (newValue: TValue) => {
      const newState =
        typeof newValue === 'function' ? (newValue as (prev?: TValue) => TValue)(valueRef.current) : newValue;

      onChange?.(newState);
    },
    [onChange],
  );

  return useUncontrolledProp<TValue>(value, defaultValue, handleChange);
}
