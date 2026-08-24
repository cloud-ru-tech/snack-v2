import { BaseItemProps } from '@ds/list';

import { InnerLink } from '../types';
import { getLinkEmblem } from './getLinkEmblem';

export function mapInnerLinksToListItems(items: InnerLink[]): BaseItemProps[] {
  return items.map(link => ({
    id: link.id,
    content: {
      label: link.label,
    },
    beforeContent: getLinkEmblem(link),
    onClick: link.onClick,
    href: link.href,
    disabled: link.disabled,
  }));
}
