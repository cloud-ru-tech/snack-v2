import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import { PopupBodyProps } from '../../types';
import styles from './styles.module.scss';

/** Контейнер основного содержимого overlay'я. Принимает `content` или `children`. */
export function PopupBody({ content, children, bodyPadding = true, className, ...rest }: PopupBodyProps) {
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
