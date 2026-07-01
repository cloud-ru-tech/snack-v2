import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import { BottomSheetBodyProps } from '../../types';
import styles from './styles.module.scss';

export type SheetBodyProps = BottomSheetBodyProps;

/** Контейнер основного содержимого bottom-sheet'а. Принимает `content` или `children`. */
export function SheetBody({ content, children, bodyPadding = true, className, ...rest }: SheetBodyProps) {
  return (
    <div
      className={cn(styles.root, className)}
      {...extractSupportProps(rest)}
      data-test-id={TEST_IDS.body}
      data-no-padding={bodyPadding === false || undefined}
    >
      {children ?? content}
    </div>
  );
}
