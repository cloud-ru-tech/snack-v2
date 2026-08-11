import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, ElementType, MouseEvent } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

// Figma toastButtonAction (7072:173):
// .toastButtonAction → .buttonContainer (state-layer overlay) → .textWrapper (label).
// Polymorphic: `as='a'` рендерит ссылочный вариант для UserAction.action.
export type ToastButtonActionProps<As extends ElementType = 'button'> = WithSupportProps<
  {
    label: string;
    onClick?(e: MouseEvent<HTMLElement>): void;
    as?: As;
    className?: string;
  } & Omit<ComponentPropsWithoutRef<As>, 'label' | 'onClick' | 'as' | 'className'>
>;

export function ToastButtonAction<As extends ElementType = 'button'>({
  label,
  onClick,
  as,
  className,
  'data-test-id': dataTestId = TEST_IDS.systemEventButtonAction,
  ...rest
}: ToastButtonActionProps<As>) {
  const Tag = (as ?? 'button') as ElementType;
  const isNativeButton = Tag === 'button';

  return (
    <Tag
      {...rest}
      type={isNativeButton ? 'button' : undefined}
      className={cn(styles.toastButtonAction, className)}
      onClick={onClick}
      data-test-id={dataTestId}
    >
      <span className={styles.buttonContainer}>
        <span className={styles.stateLayer} aria-hidden data-state='inversionOnColor' />
        <span className={styles.textWrapper}>{label}</span>
      </span>
    </Tag>
  );
}
