import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { Scroll } from '@ds/scroll';

import { QuotaWidgetPropsBase } from '../../types';
import { Grid } from './components/Grid';
import { QuotaError } from './components/QuotaError';
import styles from './styles.module.scss';

type QuotaCardsGridProps = Pick<
  QuotaWidgetPropsBase,
  'quotas' | 'disableSorting' | 'loading' | 'error' | 'onRefresh'
> & {
  isAccordion?: boolean;
};

export function QuotaCardsGrid({
  quotas,
  loading,
  error,
  onRefresh,
  disableSorting = false,
  isAccordion = false,
}: QuotaCardsGridProps) {
  // На мобилке bottom-sheet-виджет full-height: снимаем фикс-cap высоты (`max-height`), карточки
  // скроллятся телом листа. Для аккордеона (`QuotaWidgetMini`) это НЕ применяем — у него свой cap.
  const isMobile = isMobileLayout(useAdaptiveLayout().layoutType);

  const wrapperAttributes = {
    className: styles.wrapper,
    'data-accordion': isAccordion,
    'data-mobile': isMobile && !isAccordion,
  };

  const gridProps = {
    quotas,
    loading,
    disableSorting,
    isAccordion,
  };

  if (error) {
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
