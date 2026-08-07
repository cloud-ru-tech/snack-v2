import { WithSupportProps } from '@ds/utils';

import { VARIANTS } from '../../constants';
import {
  PromoTagPredefinedCustomTipProps,
  PromoTagPredefinedProps,
  PromoTagPredefinedSupportTooltipProps,
} from './types';

export function hasCustomTip(
  props: PromoTagPredefinedProps,
): props is WithSupportProps<PromoTagPredefinedCustomTipProps> {
  return (
    props.variant === VARIANTS.Soon ||
    props.variant === VARIANTS.Latest ||
    props.variant === VARIANTS.Private ||
    props.variant === VARIANTS.Public
  );
}

export function isConnectingVariant(
  props: PromoTagPredefinedProps,
): props is WithSupportProps<PromoTagPredefinedSupportTooltipProps> {
  return props.variant === VARIANTS.Connecting;
}
