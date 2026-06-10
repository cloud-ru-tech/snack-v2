import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import { BottomSheetBodyProps } from '../../types';
import styles from './styles.module.scss';

/** Контейнер основного содержимого bottom-sheet'а. Принимает `content` или `children`. */
export function Body({ content, children, bodyPadding = true, className, ...rest }: BottomSheetBodyProps) {
  return (
    <div
      className={cn(styles.root, className)}
      {...extractSupportProps(rest)}
      data-test-id={TEST_IDS.body}
      // Figma-ось `padding=false`: контент во всю ширину (edge-to-edge).
      data-no-padding={bodyPadding === false || undefined}
    >
      {children ?? content}
    </div>
  );
}
