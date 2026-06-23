import cn from 'classnames';

import { toolbarLocale } from '../../../../locale';
import styles from './styles.module.scss';

type SelectionLabelProps = {
  selectedCount: number;
  totalCount?: number;
  hasSelection: boolean;
  className?: string;
  placement?: 'inline' | 'headline';
};

export function SelectionLabel({
  selectedCount,
  totalCount,
  hasSelection,
  className,
  placement = 'inline',
}: SelectionLabelProps) {
  const { t } = toolbarLocale.useTranslations();

  const valueLabel =
    hasSelection && totalCount != null
      ? t('selectedCountOf', { count: selectedCount, total: totalCount })
      : t('selectedCount', { count: selectedCount });

  const label = (
    <div className={cn(styles.selectionLabel, className)} data-has-selection={hasSelection || undefined}>
      <span className={styles.selectionLabelPrefix}>{t('selectedPrefix')}</span>
      <span className={styles.selectionLabelValue}>{valueLabel}</span>
    </div>
  );

  if (placement === 'headline') {
    return (
      <div className={styles.headlinePlacement} data-headline-selection-label>
        {label}
      </div>
    );
  }

  return label;
}
