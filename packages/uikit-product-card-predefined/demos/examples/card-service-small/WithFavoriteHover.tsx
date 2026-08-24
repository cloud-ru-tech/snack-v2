import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceSmall, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';

export function WithFavoriteHover() {
  return (
    <CardServiceSmall
      title='Название сервиса'
      emblem={{ icon: PlaceholderSVG }}
      actionsVisibility={VISIBILITY_STRATEGY.hover}
      favorite={{ enabled: true }}
    />
  );
}
