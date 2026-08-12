import { useMemo, useState } from 'react';

import { headerLegacyLocale } from '../../../locale';
import { LinksGroup, SearchFunction, SearchProps } from '../types';
import { filterLinksGroupsFuzzy, filterLinksGroupsPrecise } from '../utils';

export function useSearch(): SearchProps {
  const { t } = headerLegacyLocale.useTranslations();
  const [searchValue, onSearchValueChange] = useState<string>('');
  const [searchFn, onChangeSearchFn] = useState<string>('fuzzy');

  const searchFunctions: SearchFunction[] = useMemo(
    () => [
      {
        id: 'fuzzy',
        label: t('mainMenu.searchFuzzy'),
        handler: (value: string, links: LinksGroup[]) => filterLinksGroupsFuzzy(value, links),
      },
      {
        id: 'precise',
        label: t('mainMenu.searchPrecise'),
        handler: (value: string, links: LinksGroup[]) => filterLinksGroupsPrecise(value, links),
      },
    ],
    [t],
  );

  return {
    searchValue,
    onSearchValueChange,
    searchFunctions,
    onChangeSearchFn,
    searchFn,
  };
}
