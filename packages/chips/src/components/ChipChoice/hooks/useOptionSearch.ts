import { ItemId } from '@ds/list';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useCallback } from 'react';

import { AccordionOption, BaseOption, ContentRenderProps, FilterOption, NestListOption } from '../types';

const DEFAULT_MIN_SEARCH_INPUT_LENGTH = 2;

function toSearchableString(value: ItemId | undefined): string {
  return value === undefined ? '' : String(value);
}

/** Нечеткий поиск среди айтемов по полям 'content.label', 'content.caption', 'content.description', 'label' */
export function useOptionSearch<T extends ContentRenderProps = ContentRenderProps>({
  options,
  flatMapOptions,
  minSearchInputLength,
  disableFuzzySearch,
}: {
  options: FilterOption<T>[];
  flatMapOptions: (BaseOption<T> | AccordionOption<T> | NestListOption<T>)[];
  minSearchInputLength?: number;
  disableFuzzySearch?: boolean;
}) {
  return useCallback(
    (search: string) => {
      if (search.length < (minSearchInputLength ?? DEFAULT_MIN_SEARCH_INPUT_LENGTH)) return options;

      if (disableFuzzySearch) {
        return options.filter(option => {
          const fieldsForSearch = [option.label];

          if ('contentRenderProps' in option) {
            fieldsForSearch.push(option?.contentRenderProps?.description);
            fieldsForSearch.push(option?.contentRenderProps?.caption);
          }

          return fieldsForSearch
            .filter((v): v is ItemId => Boolean(v))
            .some(value => value.toString().includes(search));
        });
      }

      // Порядок остаётся исходным: `rankItem` здесь только фильтрует по совпадению,
      // ранжирование в выпадающем списке не применяется.
      return flatMapOptions.filter(
        option =>
          rankItem(option, search, {
            accessors: [
              item => toSearchableString(item.label),
              item => toSearchableString(item.contentRenderProps?.description),
              item => toSearchableString(item.contentRenderProps?.caption),
            ],
          }).passed,
      );
    },
    [disableFuzzySearch, flatMapOptions, minSearchInputLength, options],
  );
}
