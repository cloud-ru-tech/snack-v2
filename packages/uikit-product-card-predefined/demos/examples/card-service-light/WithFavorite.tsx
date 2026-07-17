import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceLight, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

export function WithFavorite() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <CardServiceLight
      title='Мой сервис'
      icon={<PlaceholderSVG size={24} />}
      favorite={{
        enabled: true,
        visibilityStrategy: VISIBILITY_STRATEGY.always,
        checked: isFavorite,
        onChange: setIsFavorite,
      }}
    />
  );
}
