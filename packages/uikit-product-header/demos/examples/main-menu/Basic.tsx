import { ViewTileSVG } from '@ds/icons/interface/product';
import { MainMenu } from '@ds/uikit-product-header';

import { SERVICE_GROUPS } from '../../../stories/demoData';

export function Basic() {
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
      data-test-id='header-main-menu-basic'
    />
  );
}
