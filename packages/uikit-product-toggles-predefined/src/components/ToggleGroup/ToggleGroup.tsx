import { ToggleGroup as ToggleGroupBase, ToggleGroupProps as ToggleGroupBaseProps } from '@ds/toggles';
import { excludeSupportProps, extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { CSSProperties } from 'react';

import { GAP, ORIENTATION, TEST_IDS } from '../../constants';
import { ToggleGroupProps } from '../../types';
import styles from './styles.module.scss';

/**
 * ToggleGroup — провайдер выбора + grid-раскладка карточек `ToggleCard`.
 * Состояние (controlled/uncontrolled, single/multiple) держит `@ds/toggles::ToggleGroup`;
 * обёртка добавляет ориентацию, gap и breakpoint горизонтальной раскладки.
 */
export function ToggleGroup(props: ToggleGroupProps) {
  const { children, orientation = ORIENTATION.Vertical, gap = GAP.S, breakpoint = 0, className, ...rest } = props;

  const restProps = rest as Record<string, unknown>;
  const supportProps = extractSupportProps(restProps);
  const groupProps = excludeSupportProps(restProps) as ToggleGroupBaseProps;

  return (
    <ToggleGroupBase {...groupProps}>
      <div
        className={cn(styles.toggleGroup, className)}
        style={{ '--toggle-group-breakpoint': `${breakpoint}px` } as CSSProperties}
        data-orientation={orientation}
        data-gap={gap}
        data-test-id={TEST_IDS.group}
        {...supportProps}
      >
        {children}
      </div>
    </ToggleGroupBase>
  );
}
