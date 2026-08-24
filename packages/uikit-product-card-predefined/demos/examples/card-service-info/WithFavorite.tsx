import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceInfo, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

export function WithFavorite() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <CardServiceInfo
      title='Мой сервис'
      description='Краткое описание сервиса для подробного режима карточки.'
      icon={<PlaceholderSVG size={24} />}
      actionsVisibility={VISIBILITY_STRATEGY.always}
      favorite={{
        enabled: true,
        checked: isFavorite,
        onChange: setIsFavorite,
      }}
    />
  );
}
