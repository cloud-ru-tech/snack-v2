import { FiltersState } from '@ds/chips';
import { DataPersistOptions, useDataPersist } from '@ds/utils';
import { MutableRefObject, useEffect, useMemo, useRef } from 'react';

import { PersistedFilterState, ToolbarPersistConfig } from '../../types';
import { defaultParser, defaultSerializer, prepareDataForFilter } from './utils';

type UsePersistStateProps<TState extends FiltersState = Record<string, unknown>> = {
  persist?: ToolbarPersistConfig<TState>;
  filter?: TState;
  search?: string;
};

type RunPersistStateHydrationOnceParams<TState extends FiltersState> = {
  hasHydratedRef: MutableRefObject<boolean>;
  defaultState: PersistedFilterState<TState> | undefined;
  onLoad?: ToolbarPersistConfig<TState>['onLoad'];
};

function runPersistStateHydrationOnce<TState extends FiltersState>({
  hasHydratedRef,
  defaultState,
  onLoad,
}: RunPersistStateHydrationOnceParams<TState>) {
  if (hasHydratedRef.current) {
    return;
  }

  if (defaultState) {
    onLoad?.({
      ...defaultState,
      filter: prepareDataForFilter(defaultState.filter ?? {}),
    });
  }

  hasHydratedRef.current = true;
}

export function usePersistState<TState extends FiltersState = Record<string, unknown>>({
  persist,
  filter,
  search,
}: UsePersistStateProps<TState>) {
  const hasHydratedRef = useRef(false);
  const skipInitialPersistRef = useRef(true);
  const onLoadRef = useRef(persist?.onLoad);

  onLoadRef.current = persist?.onLoad;

  const dataPersistOptions = useMemo<DataPersistOptions<PersistedFilterState<TState>> | undefined>(() => {
    if (!persist?.filterQueryKey || !persist?.id) return undefined;

    const defaultValidate = (value: PersistedFilterState<TState>): boolean => {
      const filterOk = value?.filter === undefined || (typeof value.filter === 'object' && value.filter !== null);
      const searchOk = value?.search === undefined || typeof value.search === 'string';
      return Boolean(filterOk && searchOk);
    };

    const combinedValidate = (value: PersistedFilterState<TState>): boolean => {
      const baseValid = defaultValidate(value);
      return persist?.validateData ? baseValid && persist.validateData(value) : baseValid;
    };

    return {
      queryKey: persist.filterQueryKey,
      localStorageKey: `${persist.id}_filter`,
      validateData: combinedValidate as unknown as (value: unknown) => value is PersistedFilterState<TState>,
    };
  }, [persist]);

  const { getDefaultData, setDataToStorages } = useDataPersist<PersistedFilterState<TState>>({
    options: dataPersistOptions,
    serializer: value => (persist?.serializer ? persist.serializer(value) : defaultSerializer<TState>(value)),
    parser: (value: string) => (persist?.parser ? persist.parser(value) : defaultParser<TState>(value)),
  });

  const defaultState = useMemo(getDefaultData, [getDefaultData]);

  useEffect(() => {
    runPersistStateHydrationOnce({
      hasHydratedRef,
      defaultState,
      onLoad: onLoadRef.current,
    });
  }, [defaultState]);

  useEffect(() => {
    if (!persist?.id || !persist?.filterQueryKey || !hasHydratedRef.current) {
      return;
    }

    if (skipInitialPersistRef.current) {
      skipInitialPersistRef.current = false;
      return;
    }

    const snapshot: PersistedFilterState<TState> = {
      ...(persist.state ?? getDefaultData() ?? {}),
      ...(filter ? { filter } : {}),
      ...(search !== undefined ? { search } : {}),
    };

    if (Object.keys(snapshot).length === 0) return;

    setDataToStorages(snapshot);
  }, [persist?.id, persist?.filterQueryKey, persist?.state, filter, search, setDataToStorages, getDefaultData]);
}
