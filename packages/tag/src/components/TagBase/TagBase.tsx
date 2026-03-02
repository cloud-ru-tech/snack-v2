import { CrossSVG } from '@design-system/icons';
import { extractSupportProps } from '@design-system/utils';
import cn from 'classnames';

import { APPEARANCE, SIZE } from '../../constants';
import type { TagBaseProps } from '../../types';
import { ICON_SIZE } from './constants';
import styles from './styles.module.scss';

export function TagBase({
  label,
  size = SIZE.Xs,
  appearance = APPEARANCE.Neutral,
  onDelete,
  className,
  tabIndex,
  ...rest
}: TagBaseProps) {
  const isRemovable = Boolean(onDelete);

  return (
    <span
      {...extractSupportProps(rest)}
      className={cn(styles.tag, className)}
      data-size={size}
      data-appearance={appearance}
      data-removable={isRemovable}
    >
      <span className={styles.textWrapper}>
        <span className={styles.label}>{label}</span>
      </span>
      {isRemovable && (
        <button
          type='button'
          className={styles.tagButton}
          onClick={onDelete}
          data-test-id='tag-remove-button'
          tabIndex={tabIndex}
        >
          <span className={styles.icon}>
            <CrossSVG size={ICON_SIZE[size]} />
          </span>
        </button>
      )}
    </span>
  );
}
