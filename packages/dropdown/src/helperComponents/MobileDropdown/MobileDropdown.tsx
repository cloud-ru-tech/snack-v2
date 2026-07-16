import { BottomSheet } from '@ds/bottom-sheet';
import { extractSupportProps, useValueControl } from '@ds/utils';
import { cloneElement, isValidElement, KeyboardEvent, MouseEvent } from 'react';

import { DropdownProps } from '../../types';
import { DropdownBody } from '../DropdownBody';

type TriggerProps = { onClick?(event: MouseEvent<HTMLElement>): void };

/**
 * Mobile-поверхность Dropdown'а: контент уезжает в `BottomSheet` из `@ds/bottom-sheet`.
 * Триггер (`children`) клонируется для открытия sheet'а; `open`/`onOpenChange` поддерживают
 * controlled-режим. Internal — наружу не реэкспортится; рендерится адаптивным `Dropdown` по контексту.
 */
export function MobileDropdown({
  children,
  content,
  title,
  slotAfterHeadline,
  search,
  footer,
  headerDivider,
  footerDivider,
  state,
  bodyPadding,
  className,
  closeOnPopstate,
  open: openProp,
  onOpenChange,
  ...rest
}: DropdownProps) {
  const [open, setOpen] = useValueControl<boolean>({ value: openProp, defaultValue: false, onChange: onOpenChange });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let trigger = null;
  if (isValidElement<TriggerProps>(children)) {
    trigger = cloneElement(children, {
      onClick: (event: MouseEvent<HTMLElement>) => {
        children.props.onClick?.(event);
        handleOpen();
      },
    });
  } else if (children != null) {
    trigger = (
      <span
        role='button'
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(event: KeyboardEvent<HTMLSpanElement>) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleOpen();
          }
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <>
      {trigger}
      <BottomSheet
        open={open ?? false}
        onClose={handleClose}
        title={title}
        slotAfterHeadline={slotAfterHeadline}
        subHeadline={search}
        withDividers={Boolean(headerDivider || footerDivider)}
        footer={footer}
        className={className}
        closeOnPopstate={closeOnPopstate}
        bodyPadding={bodyPadding}
        content={
          // Body-инсет даёт BottomSheet — внутренний bodyWrapper его не дублирует.
          <DropdownBody state={state} bodyPadding={false}>
            {content}
          </DropdownBody>
        }
        {...extractSupportProps(rest)}
      />
    </>
  );
}
