import { CrossSVG, SearchSVG } from '@ds/icons';
import { useMemo } from 'react';

import { listLocale } from '../../locale';
import { EmptyStateProps } from './ListEmptyState';

export function useEmptyState({
  noDataState: noDataStateProp,
  noResultsState: noResultsStateProp,
  errorDataState: errorDataStateProp,
}: {
  noDataState?: EmptyStateProps;
  noResultsState?: EmptyStateProps;
  errorDataState?: EmptyStateProps;
}) {
  const { t } = listLocale.useTranslations();

  return useMemo(() => {
    const noDataState: EmptyStateProps = {
      icon: { icon: SearchSVG, appearance: 'neutral', decor: true },
      description: t('noData.description'),
      ...noDataStateProp,
    };

    const noResultsState: EmptyStateProps = {
      description: t('noResults.description'),
      ...noResultsStateProp,
    };

    const errorDataState: EmptyStateProps = {
      icon: { icon: CrossSVG, appearance: 'neutral', decor: true },
      description: t('errorData.description'),
      ...errorDataStateProp,
    };

    return {
      noDataState,
      noResultsState,
      errorDataState,
    };
  }, [errorDataStateProp, noDataStateProp, noResultsStateProp, t]);
}
