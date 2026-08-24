import { PlaceholderSVG } from '@ds/icons/interface/system';
import { CardServiceSmall, VISIBILITY_STRATEGY } from '@ds/uikit-product-card-predefined';
import { useState } from 'react';

export function WithFavorite() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <CardServiceSmall
      title='Название сервиса'
      emblem={{ icon: PlaceholderSVG }}
      actionsVisibility={VISIBILITY_STRATEGY.always}
      favorite={{
        enabled: true,
        checked: isFavorite,
        onChange: setIsFavorite,
      }}
    />
  );
}
