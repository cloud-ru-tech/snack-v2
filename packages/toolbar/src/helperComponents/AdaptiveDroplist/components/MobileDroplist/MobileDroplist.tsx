import { BottomSheet } from '@ds/bottom-sheet';
import { DroplistProps, ItemId, List, OnChangeHandler } from '@ds/list';
import { usePortalContext } from '@ds/portal-context';
import { useValueControl } from '@ds/utils';
import { cloneElement, isValidElement, MouseEvent, ReactNode, useMemo, useRef } from 'react';

import styles from './styles.module.scss';

export type MobileDroplistProps = Omit<
  DroplistProps,
  'trigger' | 'placement' | 'widthStrategy' | 'triggerElemRef' | 'listRef' | 'triggerClassName'
> & {
  label?: string;
  actionButton?: ReactNode;
  slotAfterHeadline?: ReactNode;
  onBackButtonClick?(): void;
};

export function MobileDroplist({
  items,
  selection,
  open: openProp,
  onOpenChange,
  children,
  search,
  label,
  actionButton,
  slotAfterHeadline,
  onBackButtonClick,
  footer,
  virtualized,
  closeDroplistOnItemClick,
  scroll,
  ...rest
}: MobileDroplistProps) {
  const portalContext = usePortalContext();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [open = false, setIsOpen] = useValueControl({ value: openProp, onChange: onOpenChange });

  const searchable = Boolean(search);
  const needCloseOnSelectItem = selection?.mode !== 'multiple' && closeDroplistOnItemClick;

  const handleClose = () => setIsOpen(false);

  const handleSelectionChange: OnChangeHandler<ItemId | ItemId[]> = value => {
    if (needCloseOnSelectItem) {
      handleClose();
    }

    if (selection?.mode === 'multiple' && Array.isArray(value)) {
      selection.onChange?.(value);
      return;
    }

    if (selection?.mode !== 'multiple' && !Array.isArray(value)) {
      selection?.onChange?.(value);
    }
  };

  let listSelection: DroplistProps['selection'];

  if (selection) {
    listSelection = { ...selection, onChange: handleSelectionChange };
  }

  const listJsx = (
    <div className={styles.listWrapper} data-virtualized={virtualized || undefined}>
      <List
        items={items}
        selection={listSelection}
        size='l'
        search={searchable ? search : undefined}
        scrollRef={searchable || virtualized || scroll ? scrollRef : undefined}
        scroll={virtualized || scroll || undefined}
        virtualized={virtualized}
        {...rest}
      />
    </div>
  );

  const trigger = useMemo(() => {
    const handleOpen = () => setIsOpen(true);

    if (isValidElement(children)) {
      return cloneElement(children, {
        onClick: (event: MouseEvent<HTMLElement>) => {
          children.props.onClick?.(event);
          handleOpen();
        },
      } as Partial<typeof children.props>);
    }

    if (typeof children === 'function') {
      const element = children({
        onKeyDown: event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleOpen();
          }
        },
      });

      if (isValidElement(element)) {
        return cloneElement(element, {
          onClick: (event: MouseEvent<HTMLElement>) => {
            element.props.onClick?.(event);
            handleOpen();
          },
        } as Partial<typeof element.props>);
      }

      return element;
    }

    return (
      <span role='button' tabIndex={0} onClick={handleOpen}>
        {children}
      </span>
    );
  }, [children, setIsOpen]);

  const expanded = searchable || virtualized;

  return (
    <>
      {trigger}
      <BottomSheet
        container={portalContext.current ?? undefined}
        open={open}
        onClose={handleClose}
        title={label}
        onBackButtonClick={onBackButtonClick ?? (label ? handleClose : undefined)}
        actionButton={actionButton}
        slotAfterHeadline={slotAfterHeadline}
        content={listJsx}
        footer={footer}
        snapPoints={expanded ? [1] : undefined}
        withDividers={false}
        closeOnPopstate
      />
    </>
  );
}
