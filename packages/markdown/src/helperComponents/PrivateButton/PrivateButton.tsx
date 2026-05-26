import { WithTooltip } from '@ds/tooltip';
import { Typography } from '@ds/typography';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ButtonHTMLAttributes, ReactNode, Ref } from 'react';

import styles from './styles.module.scss';

const PrivateChevronIcon = (
  <svg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8' fill='none' className={styles.chevron}>
    <path d='M1 3L4 6L7 3' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
  </svg>
);

type TipContentProps = { title: string; caption?: string };

function TipContent({ title, caption }: TipContentProps) {
  return (
    <>
      <Typography variant='body' size='s' weight='regular' className={styles.tipTitle}>
        {title}
      </Typography>
      {caption && (
        <Typography variant='body' size='s' weight='regular' className={styles.tipCaption}>
          {caption}
        </Typography>
      )}
    </>
  );
}

// Иконка занимает весь container, hover — stateLayer, checked=true → accent-цвет.
export type PrivateButtonProps = WithSupportProps<
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
    icon: ReactNode;
    withChevron?: boolean;
    /** active/selected состояние */
    checked?: boolean;
    /** Внешний ref, без forwardRef (см. component-api-surface.md). */
    innerRef?: Ref<HTMLButtonElement>;
    tip?: TipContentProps;
  }
>;

export function PrivateButton({
  id,
  tip,
  icon,
  checked = false,
  disabled = false,
  className,
  innerRef,
  type = 'button',
  withChevron = false,
  ...rest
}: PrivateButtonProps) {
  return WithTooltip({
    tooltip: tip
      ? {
          tip: <TipContent {...tip} />,
          triggerClassName: styles.tooltipTrigger,
        }
      : undefined,
    children: (
      <button
        data-toolbar-item={id}
        {...rest}
        data-toolbar-slot
        ref={tip ? undefined : innerRef}
        type={type}
        disabled={disabled}
        className={cn(styles.root, className)}
        data-checked={checked || undefined}
        data-disabled={disabled || undefined}
        aria-pressed={checked}
      >
        <span className={styles.stateLayer} data-state={checked ? 'activatedFilled' : 'regularFilled'} aria-hidden />
        {icon}
        {withChevron && PrivateChevronIcon}
      </button>
    ),
  });
}
