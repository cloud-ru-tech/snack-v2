import { Tooltip } from '@ds/tooltip';
import { ReactElement, RefObject } from 'react';

import { AiFieldInputFooterButtonTooltip } from '../../types';
import styles from './styles.module.scss';

export type FooterTooltipProps = {
  tooltip?: AiFieldInputFooterButtonTooltip;
  children?: ReactElement;
  triggerRef?: RefObject<HTMLButtonElement>;
  hidden?: boolean;
};

export function FooterTooltip({ tooltip, children, triggerRef, hidden = false }: FooterTooltipProps) {
  if (!tooltip) {
    return children ?? null;
  }

  return (
    <Tooltip
      disableSpanWrapper
      triggerRef={triggerRef}
      open={hidden ? false : undefined}
      tip={
        <span className={styles.content}>
          <span>{tooltip.content}</span>
          {tooltip.shortcut && <span className={styles.shortcut}>{tooltip.shortcut}</span>}
        </span>
      }
    >
      {children}
    </Tooltip>
  );
}
