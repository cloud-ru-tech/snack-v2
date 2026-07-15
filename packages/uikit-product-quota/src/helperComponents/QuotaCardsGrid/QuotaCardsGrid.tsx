import { Scroll } from '@ds/scroll';

import { QuotaWidgetPropsBase } from '../../types';
import { Grid } from './components/Grid';
import { QuotaError } from './components/QuotaError';
import styles from './styles.module.scss';

type QuotaCardsGridProps = Pick<
  QuotaWidgetPropsBase,
  'quotas' | 'disableSorting' | 'loading' | 'isError' | 'onRefresh'
> & {
  isAccordion?: boolean;
};

export function QuotaCardsGrid({
  quotas,
  loading,
  isError,
  onRefresh,
  disableSorting = false,
  isAccordion = false,
}: QuotaCardsGridProps) {
  const wrapperAttributes = {
    className: styles.wrapper,
    'data-accordion': isAccordion,
  };

  const gridProps = {
    quotas,
    loading,
    disableSorting,
    isAccordion,
  };

  if (isError) {
    return (
      <div {...wrapperAttributes}>
        <QuotaError onRefresh={onRefresh} />
      </div>
    );
  }

  return (
    <Scroll {...wrapperAttributes} size='s'>
      <Grid {...gridProps} />
    </Scroll>
  );
}
