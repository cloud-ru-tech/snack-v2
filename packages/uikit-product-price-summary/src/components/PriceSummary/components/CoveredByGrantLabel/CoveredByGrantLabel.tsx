import { useLocale } from '@ds/locale';
import { PromoTag, ROLE_APPEARANCE } from '@ds/promo-tag';
import { QuestionTooltip } from '@ds/tooltip';
import cn from 'classnames';

import styles from './styles.module.scss';

export type CoveredByGrantLabelProps = {
  covered: boolean;
  className?: string;
};

export function CoveredByGrantLabel({ covered, className }: CoveredByGrantLabelProps) {
  const { t } = useLocale('PriceSummary');

  return (
    <div className={cn(styles.coveredByGrant, className)}>
      <PromoTag
        appearance={covered ? 'green' : 'neutral'}
        role={ROLE_APPEARANCE.Decor}
        text={covered ? t('coveredByGrant') : t('notCoveredByGrant')}
      />
      <QuestionTooltip
        tip={covered ? t('coveredByGrantTooltip') : t('notCoveredByGrantTooltip')}
        size='xs'
        placement='top'
        trigger='hover'
        tabIndex={-1}
      />
    </div>
  );
}
