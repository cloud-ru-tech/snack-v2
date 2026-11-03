import { CrossSVG } from '@ds/icons/interface/system';
import { TruncateString } from '@ds/truncate-string';
import { extractSupportProps, withInnerRefSupport } from '@ds/utils';
import cn from 'classnames';

import { APPEARANCE, SIZE, TEST_IDS } from '../../constants';
import { TagBaseProps } from '../../types';
import { ICON_SIZE } from './constants';
import styles from './styles.module.scss';

export function TagBase({
  label,
  truncateVariant,
  size = SIZE.S,
  appearance = APPEARANCE.Neutral,
  onDelete,
  className,
  tabIndex,
  innerRef,
  changeRestrictTooltipState,
  hideTruncateTooltip,
  ...rest
}: TagBaseProps & { changeRestrictTooltipState?: (state: boolean) => void; hideTruncateTooltip: boolean }) {
  const isRemovable = Boolean(onDelete);

  return (
    <span
      ref={innerRef}
      {...extractSupportProps(rest)}
      className={cn(styles.tag, className)}
      data-size={size}
      data-appearance={appearance}
      data-removable={isRemovable}
    >
      <span className={styles.textWrapper}>
        <TruncateString
          className={styles.label}
          text={label}
          variant={truncateVariant}
          hideTooltip={hideTruncateTooltip}
        />
      </span>
      {isRemovable && (
        <button
          type='button'
          className={styles.tagButton}
          onClick={onDelete}
          onMouseEnter={() => changeRestrictTooltipState?.(true)}
          onMouseLeave={() => changeRestrictTooltipState?.(false)}
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

withInnerRefSupport(TagBase);
