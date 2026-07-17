import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceSmall, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

export function WithFavorite() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <CardServiceSmall
      title='Название сервиса'
      emblem={{ icon: PlaceholderSVG }}
      favorite={{
        enabled: true,
        visibilityStrategy: VISIBILITY_STRATEGY.always,
        checked: isFavorite,
        onChange: setIsFavorite,
      }}
    />
  );
}
