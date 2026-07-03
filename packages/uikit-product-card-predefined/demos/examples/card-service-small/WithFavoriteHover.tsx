import { PlaceholderSVG } from '@ds/icons';
import { CardServiceSmall, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';

export function WithFavoriteHover() {
  return (
    <CardServiceSmall
      title='Название сервиса'
      emblem={{ icon: PlaceholderSVG }}
      favorite={{
        enabled: true,
        visibilityStrategy: VISIBILITY_STRATEGY.hover,
      }}
    />
  );
}
