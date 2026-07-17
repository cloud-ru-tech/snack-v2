import { Button } from '@ds/button';
import { FilterSVG } from '@ds/icons/interface/system';
import { Tooltip } from '@ds/tooltip';
import { WithSupportProps } from '@ds/utils';

import { toolbarLocale } from '../../locale';
import { TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';

type FilterButtonBaseProps = {
  /** Открыта ли строка фильтров */
  open: boolean;
  /** Колбек смены состояния открытия строки фильтров */
  onOpenChange(open: boolean): void;
  /** Количество активных фильтров для отображения в counter */
  numberOfFilters?: number;
};

export type FilterButtonProps = WithSupportProps<FilterButtonBaseProps>;

export function FilterButton({ open, onOpenChange, numberOfFilters }: FilterButtonProps) {
  const { t } = toolbarLocale.useTranslations();

  return (
    <Tooltip tip={open ? t('hideFilters') : t('showFilters')} triggerClassName={styles.trigger}>
      <Button
        view={open ? 'tonal' : 'function'}
        appearance={open ? 'primary' : 'neutral'}
        size='m'
        icon={<FilterSVG />}
        iconPosition='after'
        counter={numberOfFilters ? { value: numberOfFilters } : undefined}
        onClick={() => onOpenChange(!open)}
        aria-pressed={open}
        data-test-id={TEST_IDS.filterButton}
        data-filter-open={open || undefined}
      />
    </Tooltip>
  );
}
