import { useCallback, useState } from 'react';

import { isBrowser } from '../utils';

export function useLocalStorage<T extends string = string>(key: string, defaultValue: T): [T, (newValue: T) => void] {
  const [value, setValueState] = useState<T>(((isBrowser() ? localStorage.getItem(key) : null) ?? defaultValue) as T);

  const setValue = useCallback(
    (newValue: T) => {
      if (isBrowser()) {
        localStorage.setItem(key, newValue);
      }
      setValueState(newValue);
    },
    [key],
  );

  return [value, setValue];
}
