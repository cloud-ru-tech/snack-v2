import { PlaceholderSVG } from '@ds/icons';
import { CardServiceLight, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';

export function WithFavoriteHover() {
  return (
    <CardServiceLight
      title='Мой сервис'
      icon={<PlaceholderSVG size={24} />}
      favorite={{
        enabled: true,
        visibilityStrategy: VISIBILITY_STRATEGY.hover,
      }}
    />
  );
}
