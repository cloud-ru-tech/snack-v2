import { ChevronRightSVG } from '@ds/icons/interface/system';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ButtonHTMLAttributes, forwardRef, MouseEvent, ReactNode } from 'react';

import { SIZE } from '../AiSuggestionSimple/constants';
import { Size } from '../AiSuggestionSimple/types';
import { TEST_IDS } from './constants';
import styles from './styles.module.scss';

export type AiSuggestionParentChipProps = {
  label?: string;
  icon?: ReactNode;
  size?: Size;
  disabled?: boolean;
  expanded?: boolean;
  onExpandedChange?(expanded: boolean): void;
  chevron?: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
    onClick?(event: MouseEvent<HTMLButtonElement>): void;
  };

export const AiSuggestionParentChip = forwardRef<HTMLButtonElement, AiSuggestionParentChipProps>(
  function AiSuggestionParentChip(
    {
      label = 'Label text',
      icon,
      size = SIZE.S,
      disabled = false,
      expanded = false,
      onExpandedChange,
      chevron,
      className,
      type = 'button',
      onClick,
      ...rest
    },
    ref,
  ) {
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented || disabled) {
        return;
      }

      onExpandedChange?.(!expanded);
    };

    return (
      <button
        ref={ref}
        type={type}
        className={cn(styles.chip, className)}
        {...extractSupportProps(rest)}
        data-size={size}
        data-activated={expanded || undefined}
        data-test-id={TEST_IDS.trigger}
        disabled={disabled}
        aria-expanded={expanded}
        onClick={handleClick}
      >
        {icon !== undefined && (
          <span className={styles.icon} aria-hidden>
            {icon}
          </span>
        )}
        {label !== undefined && (
          <span className={styles.labelContainer}>
            <span className={styles.label}>{label}</span>
          </span>
        )}
        <span className={styles.chevron} data-test-id={TEST_IDS.chevron} aria-hidden>
          {chevron ?? <ChevronRightSVG className={styles.chevronIcon} size={24} />}
        </span>
      </button>
    );
  },
);
