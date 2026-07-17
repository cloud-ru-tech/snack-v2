import { CrossSVG } from '@ds/icons/interface/system';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { APPEARANCE, SIZE, TEST_IDS } from '../../constants';
import { TagBaseProps } from '../../types';
import { ICON_SIZE } from './constants';
import styles from './styles.module.scss';

export function TagBase({
  label,
  size = SIZE.S,
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
          data-test-id={TEST_IDS.tag.removeButton}
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
