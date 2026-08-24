import { CardServiceLightProps } from '@ds/uikit-product-card-predefined';
import { MouseEventHandler } from 'react';

import { InnerLink } from '../../types';
import { getLinkEmblem } from '../../utils';

type FavoriteCardData = Pick<
  CardServiceLightProps<'a'>,
  'title' | 'icon' | 'href' | 'onClick' | 'promoTag' | 'tooltip' | 'data-test-id'
>;

export function getCommonCardProps(service: InnerLink, onClick: MouseEventHandler<HTMLElement>): FavoriteCardData {
  return {
    title: service.label,
    icon: getLinkEmblem(service),
    href: service.href,
    onClick,
    promoTag: service.badge,
    'data-test-id': `header__drawer-menu__favorite-${service.id}`,
    tooltip: service.description ? { tip: service.description } : undefined,
  };
}
