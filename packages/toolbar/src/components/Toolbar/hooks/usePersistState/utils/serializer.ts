import { FiltersState } from '@ds/chips';

import { createRequestPayload, RequestPayloadParams } from '@cloud-ru/ft-request-payload-transform';

import { PersistedFilterState } from '../../../types';

type FilterValue = string | null | number | boolean | Date;

function mapValueToString(filter: FilterValue): string | null | number | boolean {
  if (filter instanceof Date) {
    return filter.toISOString();
  }

  return filter;
}

function mapFilterToPayload(value?: FiltersState): RequestPayloadParams['filter'] {
  if (!value) {
    return undefined;
  }

  return Object.entries(value)
    .filter(([, v]) => v !== undefined)
    .map(([key, v]) =>
      Array.isArray(v)
        ? {
            value: (v as FilterValue[]).map(mapValueToString),
            condition: 'in',
            field: key,
          }
        : {
            value: mapValueToString(v as FilterValue),
            condition: 'eq',
            field: key,
          },
    );
}

/** Вспомогательная функция для преобразования состояния тулбара к формату RequestPayloadParams */
export function formatFilterStateToRequestPayload<T extends FiltersState>(value?: PersistedFilterState<T> | null) {
  return createRequestPayload({
    pagination: value?.pagination,
    search: value?.search ?? '',
    ordering: value?.ordering,
    filter: mapFilterToPayload(value?.filter),
  });
}

export function defaultSerializer<T extends FiltersState>(value: PersistedFilterState<T>) {
  return formatFilterStateToRequestPayload(value).toString();
}
