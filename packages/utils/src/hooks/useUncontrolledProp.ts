import { useCallback, useRef, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Сигнатура колбэка смены значения.
 *
 * `any` здесь — не небрежность, а воспроизведение публичного типа пакета `uncontrollable`,
 * на месте которого стоит этот хук. Свободный тип позволяет и колбэки с дополнительными
 * аргументами (`onSelect(key, node)`), и функциональные апдейтеры (`setValue(prev => …)`,
 * которые дальше применяет `useState`). Сузить его нельзя, не переписав типы `ToggleGroup`,
 * `SelectionProvider` и `TreeContext`, — это отдельная задача.
 */
export type UncontrolledHandler = (value: any, ...args: any[]) => any;
/* eslint-enable @typescript-eslint/no-explicit-any */

/**
 * Пара «значение + сеттер» для пропа, который работает и в controlled, и в uncontrolled режиме.
 * Пока `propValue` задан — источник истины он, а сеттер только зовёт `handler`. Как только
 * `propValue` становится `undefined`, состояние переходит во внутренний `useState`
 * и сбрасывается на `defaultValue`.
 *
 * Сеттер стабилен между рендерами, пока не меняется `handler`.
 * @function React hook
 */
export function useUncontrolledProp<TValue, THandler extends UncontrolledHandler = UncontrolledHandler>(
  propValue: TValue | undefined,
  defaultValue: TValue,
  handler?: THandler,
): readonly [TValue, THandler];
export function useUncontrolledProp<TValue, THandler extends UncontrolledHandler = UncontrolledHandler>(
  propValue: TValue | undefined,
  defaultValue?: TValue,
  handler?: THandler,
): readonly [TValue | undefined, (...args: Parameters<THandler>) => ReturnType<THandler> | void];
export function useUncontrolledProp<TValue, THandler extends UncontrolledHandler = UncontrolledHandler>(
  propValue: TValue | undefined,
  defaultValue?: TValue,
  handler?: THandler,
): readonly [TValue | undefined, (...args: Parameters<THandler>) => ReturnType<THandler> | void] {
  const isProp = propValue !== undefined;
  const wasPropRef = useRef(isProp);
  const [stateValue, setStateValue] = useState(defaultValue);

  const wasProp = wasPropRef.current;
  wasPropRef.current = isProp;

  // Переход controlled -> uncontrolled: внутреннее состояние отстало от `defaultValue`,
  // возвращаем его к дефолту, иначе компонент «залипнет» на последнем controlled-значении.
  if (!isProp && wasProp && stateValue !== defaultValue) {
    setStateValue(defaultValue);
  }

  const setValue = useCallback(
    (...args: Parameters<THandler>) => {
      const [value, ...rest] = args;
      const returnValue = handler?.(value, ...rest);
      setStateValue(value);

      return returnValue;
    },
    [handler],
  );

  return [isProp ? propValue : stateValue, setValue];
}
