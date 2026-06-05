import { FiltersState } from '@ds/chips';

import { parseQueryParamsString, RequestPayloadParams } from '@cloud-ru/ft-request-payload-transform';

import { PersistedFilterState } from '../../../types';
import { isDateString } from './isDateString';

function parseValue(value: unknown) {
  if (isDateString(value)) {
    return new Date(value);
  }

  if (typeof value === 'boolean') {
    return String(value);
  }

  return value;
}

function mapFilterFromPayload<TFilters extends FiltersState = Record<string, unknown>>(
  value?: RequestPayloadParams['filter'],
): TFilters | undefined {
  if (!value) {
    return undefined;
  }

  return Object.fromEntries(
    value.map(filter => {
      if (Array.isArray(filter.value)) {
        return [filter.field, filter.value.map(parseValue)];
      }

      return [filter.field, parseValue(filter.value)];
    }),
  ) as TFilters;
}

export function defaultParser<T extends FiltersState>(value: string): PersistedFilterState<T> {
  const parsed = parseQueryParamsString(value);

  return {
    pagination: parsed?.pagination,
    ordering: parsed?.ordering,
    search: parsed?.search?.toString() || '',
    filter: mapFilterFromPayload<T>(parsed?.filter) ?? ({} as T),
  };
}

export function prepareDataForFilter<T>(filter: Record<string, unknown>): T {
  return Object.entries(filter).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value)) {
        acc[key] = value.map(parseValue);
      } else {
        acc[key] = parseValue(value);
      }

      return acc;
    },
    { ...filter },
  ) as T;
}
