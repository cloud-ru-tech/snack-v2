import { SheetBodyProps } from '@ds/bottom-sheet';
import { BAR_HIDE_STRATEGY, Scroll } from '@ds/scroll';
import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type ModalBodyProps = SheetBodyProps;

/** Body модалки (desktop): `Scroll` со скрытым баром. */
export function ModalBody({ content, children, bodyPadding = true, className, ...rest }: ModalBodyProps) {
  return (
    <Scroll
      className={cn(styles.bodyWrapper, className)}
      data-test-id={TEST_IDS.body}
      data-no-padding={bodyPadding === false || undefined}
      barHideStrategy={BAR_HIDE_STRATEGY.Never}
      {...extractSupportProps(rest)}
    >
      {children ?? content}
    </Scroll>
  );
}
