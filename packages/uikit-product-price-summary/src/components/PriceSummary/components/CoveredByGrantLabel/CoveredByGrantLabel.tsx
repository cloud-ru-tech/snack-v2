import { APPEARANCE, PromoTag, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { QuestionTooltip } from '@ds/tooltip';
import cn from 'classnames';

import { priceSummaryLocale } from '../../../../locale';
import styles from './styles.module.scss';

export type CoveredByGrantLabelProps = {
  covered: boolean;
  className?: string;
};

export function CoveredByGrantLabel({ covered, className }: CoveredByGrantLabelProps) {
  const { t } = priceSummaryLocale.useTranslations();

  return (
    <div className={cn(styles.coveredByGrant, className)}>
      <PromoTag
        appearance={covered ? APPEARANCE.Primary : APPEARANCE.Neutral}
        roleAppearance={ROLE_APPEARANCE.Decor}
        size={SIZE.Xs}
        label={covered ? t('coveredByGrant') : t('notCoveredByGrant')}
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
