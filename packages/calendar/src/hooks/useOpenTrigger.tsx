import { cloneElement, isValidElement, KeyboardEvent, MouseEvent, ReactNode } from 'react';

type TriggerProps = { onClick?(event: MouseEvent<HTMLElement>): void };

/** Триггер открытия mobile-dropdown'а: valid element клонируется с onClick, остальное — span с Enter/Space. */
export function useOpenTrigger(children: ReactNode, onOpen: () => void): ReactNode {
  if (isValidElement<TriggerProps>(children)) {
    return cloneElement(children, {
      onClick: (event: MouseEvent<HTMLElement>) => {
        children.props.onClick?.(event);
        onOpen();
      },
    });
  }

  if (children == null) {
    return null;
  }

  return (
    <span
      role='button'
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event: KeyboardEvent<HTMLSpanElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      {children}
    </span>
  );
}
