import { ViewTileSVG } from '@ds/icons/interface/product';
import { MainMenu } from '@ds/uikit-product-header';
import { useState } from 'react';

import { SERVICE_GROUPS } from '../../../stories/demoData';

export function WithSearch() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <MainMenu
      segments={[
        {
          id: 'allServices',
          label: 'Все сервисы',
          icon: <ViewTileSVG size={24} />,
          items: SERVICE_GROUPS.slice(0, 3),
        },
      ]}
      search={{ value: searchValue, onChange: setSearchValue }}
      data-test-id='header-main-menu-search'
    />
  );
}
