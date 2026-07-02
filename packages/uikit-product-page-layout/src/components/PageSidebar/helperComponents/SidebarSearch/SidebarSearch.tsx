import { Search, SIZE } from '@ds/search';
import { useEffect, useRef } from 'react';

import { pageLayoutLocale } from '../../../../locale';
import { useSearchContext } from '../../contexts';

export function SidebarSearch() {
  const { searchValue, setSearchValue, searchOpened } = useSearchContext();

  const ref = useRef<HTMLInputElement>(null);

  const { t } = pageLayoutLocale.useTranslations();

  useEffect(() => {
    if (searchOpened) {
      ref?.current?.focus();
    }
  }, [searchOpened]);

  if (!searchOpened) return null;

  return (
    <Search
      ref={ref}
      size={SIZE.M}
      placeholder={t('PageSidebar.searchByServices')}
      value={searchValue}
      onChange={setSearchValue}
    />
  );
}
