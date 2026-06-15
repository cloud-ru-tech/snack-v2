import { Dropdown } from '@ds/dropdown';
import { DroplistProps, List } from '@ds/list';
import { PropsWithChildren } from 'react';

import { TEST_IDS } from '../constants';
import { wrapDroplistItemsWithClose } from './wrapDroplistItems';

export type DesktopDroplistProps = PropsWithChildren<
  Pick<
    DroplistProps,
    | 'items'
    | 'open'
    | 'onOpenChange'
    | 'closeDroplistOnItemClick'
    | 'size'
    | 'placement'
    | 'triggerClassName'
    | 'closeOnPopstate'
  >
>;

export function DesktopDroplist({
  items,
  open,
  onOpenChange,
  children,
  closeDroplistOnItemClick,
  size = 's',
  placement = 'bottom-start',
  triggerClassName,
  closeOnPopstate,
}: DesktopDroplistProps) {
  const handleClose = () => onOpenChange?.(false);

  const listItems = closeDroplistOnItemClick ? wrapDroplistItemsWithClose(items, handleClose) : items;

  return (
    <Dropdown
      open={open}
      onOpenChange={onOpenChange}
      placement={placement}
      widthStrategy='gte'
      outsideClick
      trigger='click'
      triggerClassName={triggerClassName}
      closeOnPopstate={closeOnPopstate}
      content={
        <div data-test-id={TEST_IDS.droplist}>
          <List items={listItems} size={size} />
        </div>
      }
    >
      {children}
    </Dropdown>
  );
}
