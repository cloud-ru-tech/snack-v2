import { ItemId } from '@sbercloud/snack-v2-list';
import FuzzySearch from 'fuzzy-search';
import { useCallback } from 'react';

import { AccordionOption, BaseOption, ContentRenderProps, FilterOption, NestListOption } from '../types';

const DEFAULT_MIN_SEARCH_INPUT_LENGTH = 2;

/** Нечеткий поиск среди айтемов по полям 'content.option', 'content.caption', 'content.description', 'label' */
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

      return new FuzzySearch(
        flatMapOptions,
        ['label', 'contentRenderProps.description', 'contentRenderProps.caption'],
        {},
      ).search(search);
    },
    [disableFuzzySearch, flatMapOptions, minSearchInputLength, options],
  );
}
