import { useCallback, useMemo } from 'react';

import { LocalStorageSource, QueryParamSource, SessionStorageSource } from './sources';
import { type StateProps, useSource } from './useSource';

export type DataPersistStorage = 'queryParams' | 'localStorage' | 'sessionStorage';

const DEFAULT_STORAGES: DataPersistStorage[] = ['queryParams', 'localStorage'];

export type DataPersistOptions<T> = {
  storages?: DataPersistStorage[];
  queryKey: string;
  localStorageKey: string;
  validateData(value: unknown): value is T;
};

type DataPersistProps<TData> = Omit<StateProps<TData>, 'source'> & {
  options?: DataPersistOptions<TData>;
  parser?(jsonData: string): TData;
  serializer?(data: TData): string;
};

export const useDataPersist = <TData>({ options, parser, serializer }: DataPersistProps<TData>) => {
  const storages = options?.storages ?? DEFAULT_STORAGES;
  const querySource = useMemo(
    () =>
      options && storages.includes('queryParams')
        ? new QueryParamSource<TData>(options.queryKey, options.validateData, parser, serializer)
        : undefined,
    [options, parser, serializer, storages],
  );
  const localStorageSource = useMemo(
    () =>
      options && storages.includes('localStorage')
        ? new LocalStorageSource<TData>(options.localStorageKey, options.validateData)
        : undefined,
    [options, storages],
  );

  const sessionStorageSource = useMemo(
    () =>
      options && storages.includes('sessionStorage')
        ? new SessionStorageSource<TData>(options.localStorageKey, options.validateData)
        : undefined,
    [options, storages],
  );

  const { getData: getSessionStorageData, setData: setSessionStorageData } = useSource<TData>({
    source: sessionStorageSource,
  });

  const { getData: getLocalStorageData, setData: setLocalStorageData } = useSource<TData>({
    source: localStorageSource,
  });

  const { getData: getQueryParamsData, setData: setQueryParamsData } = useSource<TData>({
    source: querySource,
  });

  const setDataToStorages = useCallback(
    (data: TData) => {
      setLocalStorageData(data);
      setSessionStorageData(data);
      setQueryParamsData(data);
    },
    [setLocalStorageData, setSessionStorageData, setQueryParamsData],
  );

  const getDefaultData = useCallback(() => {
    const queryData = getQueryParamsData();
    return queryData ?? getSessionStorageData() ?? getLocalStorageData();
  }, [getLocalStorageData, getSessionStorageData, getQueryParamsData]);

  return { getDefaultData, setDataToStorages };
};
