import { APPEARANCE, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { CardSuggest } from '@ds/uikit-product-card-predefined';

export function WithPromoTag() {
  return (
    <CardSuggest
      title='Подсказка для пользователя'
      content='Краткое описание действия или функциональности'
      promoBadge={{
        text: 'New',
        appearance: APPEARANCE.Primary,
        role: ROLE_APPEARANCE.Accent,
        size: SIZE.Xs,
      }}
    />
  );
}
