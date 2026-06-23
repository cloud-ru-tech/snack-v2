import { APPEARANCE, PromoTag, PromoTagProps, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { Tooltip, TooltipProps, TRIGGER } from '@ds/tooltip';
import { WithSupportProps } from '@ds/utils';
import { ElementType, useMemo } from 'react';

import { HOVER_DELAY_OPEN_MS, PREVIEW_CONTEXT, TEST_IDS, VARIANTS } from '../../constants';
import { promoTagPredefinedLocale } from '../../locale';
import { PreviewContext, Variant } from '../../types';
import styles from './styles.module.scss';

const stubFunc: NonNullable<PromoTagProps<ElementType>['onClick']> = () => {};

export type PromoTagPredefinedProps = WithSupportProps<{
  /** Вариант промо-тега */
  variant: Variant;
  /** Контекст тега с вариантом "preview" */
  context?: PreviewContext;
  /** Настройки тултипа */
  tooltip?: Pick<TooltipProps, 'placement' | 'trigger' | 'open' | 'onOpenChange'>;
}> &
  Omit<PromoTagProps<ElementType>, 'text' | 'appearance' | 'role' | 'size'>;

export function PromoTagPredefined({
  context = PREVIEW_CONTEXT.Service,
  variant,
  tooltip,
  onClick,
  as,
  innerRef,
  ...rest
}: PromoTagPredefinedProps) {
  const { t } = promoTagPredefinedLocale.useTranslations();
  const linkMode = Boolean(as);

  const { tip, text, appearance } = useMemo<{
    tip: string;
    text: string;
    appearance: PromoTagProps['appearance'];
  }>(() => {
    switch (variant) {
      case VARIANTS.Connecting:
        return {
          text: t('connecting'),
          tip: t('tooltipConnecting'),
          appearance: APPEARANCE.Neutral,
        };
      case VARIANTS.Partner:
        return {
          text: t('partner'),
          tip: t('tooltipPartner'),
          appearance: APPEARANCE.Orange,
        };
      case VARIANTS.Preview:
        return {
          text: t('preview'),
          tip: context === PREVIEW_CONTEXT.Functional ? t('tooltipPreviewFunctional') : t('tooltipPreviewService'),
          appearance: APPEARANCE.Blue,
        };
      default: {
        const unsupportedVariant: never = variant;
        throw new Error(`PromoTagPredefined: unsupported variant "${unsupportedVariant}"`);
      }
    }
  }, [context, t, variant]);

  return (
    <Tooltip
      {...tooltip}
      tip={<span data-test-id={TEST_IDS.tooltipContent}>{tip}</span>}
      trigger={tooltip?.trigger ?? TRIGGER.Hover}
      className={styles.tooltip}
      triggerClassName={styles.trigger}
      hoverDelayOpen={HOVER_DELAY_OPEN_MS}
    >
      <PromoTag
        text={text}
        appearance={appearance}
        role={ROLE_APPEARANCE.Decor}
        size={SIZE.Xs}
        as={as}
        innerRef={innerRef}
        onClick={linkMode ? onClick : (onClick ?? stubFunc)}
        {...rest}
      />
    </Tooltip>
  );
}
