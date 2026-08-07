import { PromoTagProps } from '@ds/promo-tag';
import { TooltipProps } from '@ds/tooltip';
import { WithSupportProps } from '@ds/utils';
import { ElementType, MouseEvent } from 'react';

import { VARIANTS } from '../../constants';
import { PreviewContext } from '../../types';

type PromoTagPredefinedBaseProps = Omit<
  PromoTagProps<ElementType>,
  'label' | 'appearance' | 'role' | 'size' | 'as' | 'onClick'
>;

type TooltipSettings = Pick<TooltipProps, 'placement' | 'trigger' | 'open' | 'onOpenChange'>;

export type PromoTagPredefinedSupportTooltipProps = {
  /** Вариант промо-тега */
  variant: typeof VARIANTS.Connecting;
  /** Настройки тултипа */
  tooltip: TooltipSettings & {
    /**
     * Клик по фразе «обратитесь в поддержку» / «please contact support» в тексте тултипа.
     */
    onSupportClick(e: MouseEvent): void;
  };
  context?: never;
} & PromoTagPredefinedBaseProps;

type PromoTagPredefinedBuiltinTooltipProps = {
  /** Вариант промо-тега */
  variant: typeof VARIANTS.Partner | typeof VARIANTS.FreeTier;
  /** Настройки тултипа */
  tooltip?: TooltipSettings;
  context?: never;
} & PromoTagPredefinedBaseProps;

type PromoTagPredefinedPreviewTooltipProps = {
  /** Вариант промо-тега */
  variant: typeof VARIANTS.Preview;
  /** Настройки тултипа */
  tooltip?: TooltipSettings;
  /** Контекст тега с вариантом "preview" */
  context?: PreviewContext;
} & PromoTagPredefinedBaseProps;

export type PromoTagPredefinedCustomTipProps = {
  /** Вариант промо-тега */
  variant: typeof VARIANTS.Soon | typeof VARIANTS.Latest | typeof VARIANTS.Private | typeof VARIANTS.Public;
  /** Настройки тултипа; если передан — `tip` обязателен. Без `tooltip` тултип не рендерится */
  tooltip?: TooltipSettings & {
    /** Содержимое тултипа (текст или разметка) */
    tip: TooltipProps['tip'];
  };
  context?: never;
} & PromoTagPredefinedBaseProps;

type PromoTagPredefinedDefaultProps = {
  /** Вариант промо-тега */
  variant: typeof VARIANTS.Default;
  context?: never;
  tooltip?: never;
} & PromoTagPredefinedBaseProps;

export type PromoTagPredefinedProps = WithSupportProps<
  | PromoTagPredefinedSupportTooltipProps
  | PromoTagPredefinedBuiltinTooltipProps
  | PromoTagPredefinedPreviewTooltipProps
  | PromoTagPredefinedCustomTipProps
  | PromoTagPredefinedDefaultProps
>;

export type Config = {
  tip?: string;
  text: string;
  appearance: PromoTagProps['appearance'];
};
