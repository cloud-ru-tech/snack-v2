import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';

export function WithFavoriteHover() {
  return (
    <CardServiceLight
      title='Мой сервис'
      icon={<PlaceholderSVG size={24} />}
      actionsVisibility={VISIBILITY_STRATEGY.hover}
      favorite={{
        enabled: true,
      }}
    />
  );
}
