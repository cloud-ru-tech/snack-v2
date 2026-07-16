import { DroplistProps } from '@ds/list';
import { Tooltip } from '@ds/tooltip';
import { MouseEvent, ReactNode, useMemo } from 'react';

import { SidebarItem } from '../types';

const getItemsContent = (items: SidebarItem[], onSelect?: (id: string | number) => void): DroplistProps['items'] =>
  items.map(({ id, label, onClick, afterContent, beforeContent, disabledReason, disabledReasonPlacement, ...rest }) => {
    const href = 'href' in rest ? rest.href : undefined;
    const newItems = 'items' in rest ? rest.items : undefined;
    const type = 'type' in rest ? rest.type : undefined;

    const clickHandler = (event: MouseEvent<HTMLElement>) => {
      if (href && (event?.metaKey || event?.button === 1)) {
        return;
      }

      event.preventDefault();
      onClick?.(event);

      if (!items.length) {
        onSelect?.(id);
      }
    };

    if (type === 'group') {
      return {
        ...rest,
        label,
        type: 'group',
        items: getItemsContent(newItems || [], onSelect),
      };
    }

    const newItem = {
      id,
      content: {
        label: label,
      },
      itemWrapRender: (item: ReactNode) => {
        if (!disabledReason) {
          return href ? (
            <a href={href} onClick={clickHandler}>
              {item}
            </a>
          ) : (
            item
          );
        }

        return (
          <Tooltip
            hoverDelayOpen={500}
            open={disabledReason ? undefined : false}
            tip={disabledReason}
            placement={disabledReasonPlacement}
          >
            {item}
          </Tooltip>
        );
      },

      onClick: href ? undefined : clickHandler,
      afterContent,
      beforeContent,
      disabled: Boolean(disabledReason),
    };

    if (newItems?.length) {
      return {
        ...newItem,
        type: 'collapse',
        items: getItemsContent(newItems || [], onSelect),
      };
    }

    return newItem;
  });

export function useItemsContent(
  items: SidebarItem[],
  onSelect?: (id: string | number) => void,
): DroplistProps['items'] {
  return useMemo(() => getItemsContent(items, onSelect), [items, onSelect]);
}
