import { PlaceholderSVG } from '@ds/icons/interface/system';
import { APPEARANCE, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { CardServiceLight } from '@ds/uikit-product-card-predefined';

export function WithPromoTag() {
  return (
    <CardServiceLight
      title='Мой сервис'
      icon={<PlaceholderSVG size={24} />}
      promoTag={{
        text: 'New',
        appearance: APPEARANCE.Primary,
        role: ROLE_APPEARANCE.Accent,
        size: SIZE.Xs,
      }}
    />
  );
}
