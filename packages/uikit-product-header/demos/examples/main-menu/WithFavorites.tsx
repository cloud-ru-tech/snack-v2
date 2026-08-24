import { ViewTileSVG } from '@ds/icons/interface/product';
import { MainMenu } from '@ds/uikit-product-header';
import { useState } from 'react';

import { SERVICE_GROUPS } from '../../../stories/demoData';

export function WithFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['inference']);

  return (
    <MainMenu
      segments={[
        {
          id: 'allServices',
          label: 'Все сервисы',
          icon: <ViewTileSVG size={24} />,
          items: SERVICE_GROUPS.slice(0, 2),
        },
      ]}
      favorite={{
        value: favoriteIds,
        onChange: productId => (addingValue: boolean) => {
          setFavoriteIds(prev => (addingValue ? [...prev, productId] : prev.filter(id => id !== productId)));
        },
      }}
      data-test-id='header-main-menu-favorites'
    />
  );
}
