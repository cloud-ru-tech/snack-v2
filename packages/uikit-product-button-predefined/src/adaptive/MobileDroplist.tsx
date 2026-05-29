import { ModalCustom } from '@ds/modal';
import { useValueControl, WithLayoutType } from '@ds/utils';
// TODO: replace with @ds/list when ready
import { DroplistProps, List } from '@sbercloud/snack-v2-list';
import { cloneElement, isValidElement, MouseEvent, PropsWithChildren, useCallback, useMemo } from 'react';

import { TEST_IDS } from '../constants';
import styles from './styles.module.scss';
import { wrapDroplistItemsWithClose } from './wrapDroplistItems';

export type MobileDroplistProps = WithLayoutType<
  PropsWithChildren<
    Pick<DroplistProps, 'items' | 'closeDroplistOnItemClick' | 'open' | 'onOpenChange'> & {
      size?: DroplistProps['size'];
    }
  >
>;

export function MobileDroplist({
  items,
  open: openProp,
  onOpenChange,
  children,
  closeDroplistOnItemClick,
}: MobileDroplistProps) {
  const [open = false, setIsOpen] = useValueControl<boolean>({ value: openProp, onChange: onOpenChange });

  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  const listItems = useMemo(
    () => (closeDroplistOnItemClick ? wrapDroplistItemsWithClose(items, handleClose) : items),
    [closeDroplistOnItemClick, handleClose, items],
  );

  const listJsx = (
    <div className={styles.listWrapper} data-test-id={TEST_IDS.droplist}>
      <List items={listItems} size='l' />
    </div>
  );

  const trigger = useMemo(() => {
    const handleOpen = () => setIsOpen(true);

    if (isValidElement(children)) {
      return cloneElement(children, {
        onClick: (event: MouseEvent<HTMLElement>) => {
          (children.props as { onClick?: (e: MouseEvent<HTMLElement>) => void }).onClick?.(event);
          handleOpen();
        },
      } as Record<string, unknown>);
    }

    return (
      <button type='button' className={styles.fallbackTrigger} onClick={handleOpen}>
        {children}
      </button>
    );
  }, [children, setIsOpen]);

  return (
    <>
      {trigger}

      {/* TODO: replace with adaptive version of @ds/modal when ready */}
      <ModalCustom open={open} onClose={handleClose} width='s'>
        <ModalCustom.Body className={styles.bodyNoPadding} content={listJsx} />
      </ModalCustom>
    </>
  );
}
