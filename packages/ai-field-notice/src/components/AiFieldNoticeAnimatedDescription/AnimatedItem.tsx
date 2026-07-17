import cn from 'classnames';
import { ReactElement, ReactNode } from 'react';

import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

type AnimatedItemProps = {
  content: ReactNode;
  itemIndex: number;
  currentIndex: number;
};

export function AnimatedItem({ content, itemIndex, currentIndex }: AnimatedItemProps): ReactElement {
  let positionClassName = styles.itemPrevious;

  if (itemIndex === currentIndex) {
    positionClassName = styles.itemCurrent;
  } else if (itemIndex > currentIndex) {
    positionClassName = styles.itemNext;
  }

  return (
    <div className={cn(styles.item, positionClassName)} data-test-id={`${TEST_IDS.contentMessage}-${itemIndex}`}>
      {content}
    </div>
  );
}
