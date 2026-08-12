import { Avatar } from '@ds/avatar';
import { CardServiceLightProps } from '@ds/uikit-product-card-predefined';
import { createElement, JSXElementConstructor, ReactNode } from 'react';

import { InnerLink } from '../types';
import { getAvatarNameFromLabel } from './getAvatarNameFromLabel';

type IconComponent = JSXElementConstructor<{
  size?: number;
  className?: string;
}>;

function createAvatarIcon(displayName: string): IconComponent {
  return function LinkAvatarIcon({ className }: { className?: string }) {
    return (
      <Avatar name={displayName} showTwoSymbols shape='squared' appearance='neutral' size='xs' className={className} />
    );
  };
}

export function getLinkEmblem(link: InnerLink): CardServiceLightProps['icon'] {
  if (!link.icon) {
    return createElement(createAvatarIcon(getAvatarNameFromLabel(link.label)));
  }

  return createElement(link.icon);
}

export function renderLinkBeforeContent(link: InnerLink): ReactNode {
  if (!link.icon) {
    return (
      <Avatar name={getAvatarNameFromLabel(link.label)} showTwoSymbols shape='squared' appearance='neutral' size='xs' />
    );
  }

  return createElement(link.icon);
}
