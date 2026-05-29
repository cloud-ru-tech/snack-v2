import { BaseItemProps, DroplistProps } from '@sbercloud/snack-v2-list';

export function wrapDroplistItemsWithClose(items: DroplistProps['items'], onClose: () => void): DroplistProps['items'] {
  return items.map(item => {
    if (!item || typeof item !== 'object' || !('onClick' in item)) {
      return item;
    }

    const baseItem = item as BaseItemProps;

    return {
      ...baseItem,
      onClick: event => {
        baseItem.onClick?.(event);
        onClose();
      },
    };
  });
}
