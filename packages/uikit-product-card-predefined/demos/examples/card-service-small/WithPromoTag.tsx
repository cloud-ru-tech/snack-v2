import { PlaceholderSVG } from '@ds/icons/interface/system';
import { APPEARANCE, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { CardServiceSmall } from '@ds/uikit-product-card-predefined';

export function WithPromoTag() {
  return (
    <CardServiceSmall
      title='Название сервиса'
      emblem={{ icon: PlaceholderSVG }}
      promoBadge={{
        label: 'Promo Tag',
        appearance: APPEARANCE.Primary,
        role: ROLE_APPEARANCE.Accent,
        size: SIZE.Xs,
      }}
    />
  );
}
