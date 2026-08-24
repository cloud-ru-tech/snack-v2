import { PromoTagPredefinedProps } from '@ds/uikit-product-promo-tag-predefined';
import { ValueOf } from '@ds/utils';

import { CARD_SIZE, VISIBILITY_STRATEGY } from './constants';

export type VisibilityStrategy = ValueOf<typeof VISIBILITY_STRATEGY>;
export type CardSize = ValueOf<typeof CARD_SIZE>;

/**
 * Настройки promo tag карточки: `as` и `innerRef` карточка задаёт сама.
 *
 * Пропы запрещаем интерсекцией, а не `Omit`: `PromoTagPredefinedProps` наследует полиморфные
 * пропы `ElementType` вместе с index-signature, и `Omit` по ней вырезает все именованные пропы —
 * от типа остаётся `{ [x: string]: any }`, а `variant` пропадает.
 */
export type CardPromoTagProps = PromoTagPredefinedProps & { as?: never; innerRef?: never };

export type FavoriteProps = {
  /** Включить отображение кнопки избранного */
  enabled: boolean;
  /** Состояние избранного (controlled) */
  checked?: boolean;
  /** Колбэк изменения состояния избранного */
  onChange?(value: boolean): void;
};
