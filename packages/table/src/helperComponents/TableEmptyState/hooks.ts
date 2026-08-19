import { CrossSVG, SearchSVG } from '@ds/icons/interface/system';
import { useMemo } from 'react';

import { tableLocale } from '../../locale';
import { EmptyStateProps } from './TableEmptyState';

export function useEmptyState({
  noDataState: noDataStateProp,
  noResultsState: noResultsStateProp,
  errorDataState: errorDataStateProp,
}: {
  noDataState?: EmptyStateProps;
  noResultsState?: EmptyStateProps;
  errorDataState?: EmptyStateProps;
}): {
  noDataState: EmptyStateProps;
  noResultsState: EmptyStateProps;
  errorDataState: EmptyStateProps;
} {
  const { t } = tableLocale.useTranslations();

  return useMemo(() => {
    const noDataState: EmptyStateProps = {
      icon: { icon: SearchSVG, appearance: 'neutral', background: true },
      title: t('noData.title'),
      ...noDataStateProp,
    };

    const noResultsState: EmptyStateProps = {
      icon: { icon: SearchSVG, appearance: 'neutral', background: true },
      title: t('noResults.title'),
      content: t('noResults.content'),
      ...noResultsStateProp,
    };

    const errorDataState: EmptyStateProps = {
      icon: { icon: CrossSVG, appearance: 'neutral', background: true },
      title: t('errorData.title'),
      content: t('errorData.content'),
      ...errorDataStateProp,
    };

    return {
      noDataState,
      noResultsState,
      errorDataState,
    };
  }, [errorDataStateProp, noDataStateProp, noResultsStateProp, t]);
}
