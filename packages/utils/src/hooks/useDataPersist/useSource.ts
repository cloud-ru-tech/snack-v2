import { useCallback } from 'react';

import { BaseSource } from './sources';

export type StateProps<T> = {
  source?: BaseSource<T>;
};

export const useSource = <T>({ source }: StateProps<T>) => {
  const setData = useCallback(
    (data: T) => {
      if (!source) {
        return;
      }
      try {
        source.setData(data);
      } catch {
        // Ошибка одного хранилища не должна прерывать запись в остальные.
      }
    },
    [source],
  );

  const getData = useCallback(() => source?.getData() ?? undefined, [source]);

  return { getData, setData };
};
