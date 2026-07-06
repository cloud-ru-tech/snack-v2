import { useMemo, useReducer, useRef } from 'react';

/**
 * Ref-контейнер, присваивание `.current` которого вызывает ре-рендер.
 * Локальная замена `useRefState` из `@siberiacancode/reactuse` — пакет не тянем ради одного хука.
 */
export function useRefState<T>(initialValue: T) {
  const [, forceRender] = useReducer((tick: number) => tick + 1, 0);
  const ref = useRef(initialValue);

  return useMemo(
    () => ({
      get current(): T {
        return ref.current;
      },
      set current(value: T) {
        ref.current = value;
        forceRender();
      },
    }),
    [],
  );
}
