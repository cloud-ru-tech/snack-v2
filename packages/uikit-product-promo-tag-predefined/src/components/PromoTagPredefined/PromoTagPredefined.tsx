import { Link } from '@ds/link';
import { APPEARANCE, PromoTag, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { Tooltip, TRIGGER } from '@ds/tooltip';
import { withInnerRefSupport } from '@ds/utils';
import { ReactNode, useMemo } from 'react';

import { HOVER_DELAY_OPEN_MS, PREVIEW_CONTEXT, TEST_IDS, VARIANTS } from '../../constants';
import { promoTagPredefinedLocale } from '../../locale';
import styles from './styles.module.scss';
import { Config, PromoTagPredefinedProps } from './types';
import { hasCustomTip, isConnectingVariant } from './utils';

export function PromoTagPredefined(props: PromoTagPredefinedProps) {
  const { context = PREVIEW_CONTEXT.Service, variant, tooltip, innerRef, ...rest } = props;
  const { t } = promoTagPredefinedLocale.useTranslations();

  const {
    tip: builtinTip,
    text,
    appearance,
  } = useMemo<Config>(() => {
    switch (variant) {
      case VARIANTS.Connecting:
        return {
          text: t('connecting'),
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
      case VARIANTS.FreeTier:
        return {
          text: t('freeTier'),
          tip: t('tooltipFreeTier'),
          appearance: APPEARANCE.Blue,
        };
      case VARIANTS.Soon:
        return {
          text: t('soon'),
          appearance: APPEARANCE.Violet,
        };
      case VARIANTS.Default:
        return {
          text: t('default'),
          appearance: APPEARANCE.Primary,
        };
      case VARIANTS.Latest:
        return {
          text: t('latest'),
          appearance: APPEARANCE.Primary,
        };
      case VARIANTS.Private:
        return {
          text: t('private'),
          appearance: APPEARANCE.Green,
        };
      case VARIANTS.Public:
        return {
          text: t('public'),
          appearance: APPEARANCE.Blue,
        };
      default: {
        const unsupportedVariant: never = variant;
        throw new Error(`PromoTagPredefined: unsupported variant "${unsupportedVariant}"`);
      }
    }
  }, [context, t, variant]);

  let tip: ReactNode | undefined;
  if (hasCustomTip(props)) {
    tip = props.tooltip?.tip;
  } else if (isConnectingVariant(props)) {
    tip = (
      <>
        {t('tooltipConnectingBefore')}
        <Link
          className={styles.supportLink}
          underlined
          insideText
          appearance='invertNeutral'
          label={t('tooltipConnectingSupport')}
          onClick={props.tooltip.onSupportClick}
          data-test-id={TEST_IDS.supportLink}
        />
        .
      </>
    );
  } else {
    tip = builtinTip;
  }

  const promoTag = (
    <PromoTag
      label={text}
      appearance={appearance}
      role={ROLE_APPEARANCE.Decor}
      size={SIZE.Xs}
      innerRef={innerRef}
      {...rest}
    />
  );

  if (variant === VARIANTS.Default || !tip) {
    return promoTag;
  }

  return (
    <Tooltip
      placement={tooltip?.placement}
      open={tooltip?.open}
      onOpenChange={tooltip?.onOpenChange}
      tip={<span data-test-id={TEST_IDS.tooltipContent}>{tip}</span>}
      trigger={tooltip?.trigger ?? TRIGGER.Hover}
      className={styles.tooltip}
      triggerClassName={styles.trigger}
      hoverDelayOpen={HOVER_DELAY_OPEN_MS}
    >
      {promoTag}
    </Tooltip>
  );
}

withInnerRefSupport(PromoTagPredefined);
