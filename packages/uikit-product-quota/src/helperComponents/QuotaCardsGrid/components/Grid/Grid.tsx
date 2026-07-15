import { QuotaWidgetCard } from '../../../../components/QuotaWidgetCard';
import { TEST_IDS } from '../../../../constants';
import { QuotaItem, QuotaWidgetPropsBase } from '../../../../types';
import { getPercent } from '../../../../utils/getPercent';
import { QuotaWidgetCardsSkeleton } from './components/QuotaWidgetCardsSkeleton';
import styles from './styles.module.scss';

function sortQuotas(quotas: QuotaItem[]): QuotaItem[] {
  return [...quotas].sort((first, second) => {
    const percentFirst = getPercent(first);
    const percentSecond = getPercent(second);

    if (percentSecond !== percentFirst) {
      return percentSecond - percentFirst;
    }

    return first.name.localeCompare(second.name);
  });
}

type GridProps = Pick<QuotaWidgetPropsBase, 'quotas' | 'loading' | 'disableSorting'> & {
  isAccordion?: boolean;
};

export function Grid({ quotas, loading, disableSorting = false, isAccordion = false }: GridProps) {
  const sortedQuotas = disableSorting ? quotas : sortQuotas(quotas);

  return (
    <div className={styles.grid} data-single={(quotas.length <= 1 && !loading) || isAccordion}>
      <QuotaWidgetCardsSkeleton loading={loading}>
        {sortedQuotas.map(quota => (
          <QuotaWidgetCard
            key={quota.name}
            quota={quota}
            data-test-id={`${TEST_IDS.quotaWidgetCard.root}--${quota.name}`}
          />
        ))}
      </QuotaWidgetCardsSkeleton>
    </div>
  );
}
