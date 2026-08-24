import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceInfo, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';

export function WithFavoriteHover() {
  return (
    <CardServiceInfo
      title='Мой сервис'
      description='Краткое описание сервиса для подробного режима карточки.'
      icon={<PlaceholderSVG size={24} />}
      actionsVisibility={VISIBILITY_STRATEGY.hover}
      favorite={{
        enabled: true,
      }}
    />
  );
}
