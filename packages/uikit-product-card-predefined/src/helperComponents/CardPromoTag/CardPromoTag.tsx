import { TooltipProps } from '@ds/tooltip';
import { PromoTagPredefined, PromoTagPredefinedProps } from '@ds/uikit-product-promo-tag-predefined';
import { withInnerRefSupport } from '@ds/utils';
import { createElement, ReactElement, RefObject } from 'react';

import { CardPromoTagProps } from '../../types';

export type CardPromoTagRenderProps = {
  /** Настройки promo tag, пришедшие в карточку */
  promoTag: CardPromoTagProps;
  /** Триггер тултипа: карточка выбирает его по своему `actionsVisibility` */
  tooltipTrigger: TooltipProps['trigger'];
  /** Ref на trigger тултипа — по нему карточка водит фокус стрелками */
  innerRef?: RefObject<HTMLElement>;
  /** CSS-класс промо-тега */
  className?: string;
  /** Support prop для тестов */
  'data-test-id'?: string;
};

export function CardPromoTag({
  promoTag,
  tooltipTrigger,
  innerRef,
  className,
  'data-test-id': dataTestId,
}: CardPromoTagRenderProps): ReactElement {
  // `PromoTagPredefinedProps` — union, дискриминированный по `variant`, и `tooltip` у каждого
  // варианта свой. При спреде TS union сплющивает, связь `variant` ↔ `tooltip` теряется, поэтому
  // возвращаем её assertion'ом: значения берём из того же пропа, вариант не меняем — только
  // подставляем trigger и служебные пропы карточки. Рендер через `createElement`, потому что
  // JSX-спред union-типа TS сплющил бы заново.
  const props = {
    ...promoTag,
    as: 'span',
    tabIndex: -1,
    tooltip: { ...promoTag.tooltip, trigger: tooltipTrigger },
    innerRef,
    className,
    'data-test-id': dataTestId,
  } as PromoTagPredefinedProps;

  return createElement(PromoTagPredefined, props);
}

withInnerRefSupport(CardPromoTag);
