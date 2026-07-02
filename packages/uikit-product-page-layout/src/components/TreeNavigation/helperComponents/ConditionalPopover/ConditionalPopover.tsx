import { PLACEMENT, Popover, TRIGGER } from '@ds/popover';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

type ConditionalPopoverProps = {
  isOpen: boolean;
  onOpenChange(value: boolean): void;
  tip: ReactNode;
  withPopover?: boolean;
  children: ReactNode;
};

export function ConditionalPopover({ tip, withPopover, isOpen, onOpenChange, children }: ConditionalPopoverProps) {
  if (withPopover) {
    return (
      <Popover
        className={styles.popover}
        open={isOpen}
        onOpenChange={nextOpen => onOpenChange(nextOpen)}
        content={tip}
        trigger={TRIGGER.Click}
        placement={PLACEMENT.BottomStart}
      >
        {children}
      </Popover>
    );
  }

  return children;
}
