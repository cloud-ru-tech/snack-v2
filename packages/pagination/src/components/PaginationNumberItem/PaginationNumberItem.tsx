import { extractSupportProps, WithSupportProps } from '@ds/utils';
import { MouseEvent, Ref } from 'react';

import { usePaginationContext } from '../../contexts';
import styles from './styles.module.scss';

export type PaginationNumberItemProps = WithSupportProps<{
  label: number | string;
  activated?: boolean;
  onClick(event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void;
  href?: string;
  setButtonRef?: Ref<HTMLButtonElement | HTMLAnchorElement>;
}>;

export function PaginationNumberItem({
  label,
  activated,
  onClick,
  href,
  setButtonRef,
  ...rest
}: PaginationNumberItemProps) {
  const { size, variant } = usePaginationContext();

  const stateLayer = activated ? 'activatedFilled' : 'regularFilled';

  if (variant === 'link') {
    return (
      <a
        role='button'
        className={styles.root}
        onClick={onClick}
        ref={setButtonRef as Ref<HTMLAnchorElement>}
        data-size={size}
        {...extractSupportProps(rest)}
        data-activated={activated || undefined}
        href={href}
      >
        <span className={styles.stateLayer} aria-hidden data-state={stateLayer} />
        <span className={styles.textWrapper}>{label}</span>
      </a>
    );
  }

  return (
    <button
      type='button'
      className={styles.root}
      onClick={onClick}
      ref={setButtonRef as Ref<HTMLButtonElement>}
      data-size={size}
      {...extractSupportProps(rest)}
      data-activated={activated || undefined}
    >
      <span className={styles.stateLayer} aria-hidden data-state={stateLayer} />
      <span className={styles.textWrapper}>{label}</span>
    </button>
  );
}
