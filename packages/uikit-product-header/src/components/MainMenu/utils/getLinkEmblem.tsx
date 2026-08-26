import { CardServiceLightProps } from '@ds/uikit-product-card-predefined';
import { createElement } from 'react';

import { InnerLink } from '../types';

export function getLinkEmblem(link: Pick<InnerLink, 'icon'>): CardServiceLightProps['icon'] {
  if (!link.icon) {
    return undefined;
  }

  return createElement(link.icon);
}
