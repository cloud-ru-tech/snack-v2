import { DependencyList, EffectCallback, MutableRefObject, useEffect, useRef, useState } from 'react';

export function useRefState<T>(initial: T): MutableRefObject<T> {
  const ref = useRef<T>(initial);
  return ref;
}

export function useDebounceValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export function useDidUpdate(effect: EffectCallback, deps?: DependencyList) {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    return effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
