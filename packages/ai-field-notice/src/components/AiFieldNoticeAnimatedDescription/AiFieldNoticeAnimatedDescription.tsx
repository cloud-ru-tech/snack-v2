import cn from 'classnames';
import { forwardRef, useImperativeHandle } from 'react';

import { TEST_IDS } from '../../constants';
import { AiFieldNoticeAnimatedDescriptionHandle, AiFieldNoticeAnimatedDescriptionProps } from '../../types';
import { AnimatedItem } from './AnimatedItem';
import { useAnimatedDescription } from './hooks';
import styles from './styles.module.scss';

export const AiFieldNoticeAnimatedDescription = forwardRef<
  AiFieldNoticeAnimatedDescriptionHandle,
  AiFieldNoticeAnimatedDescriptionProps
>(function AiFieldNoticeAnimatedDescription({ items, size, className }, ref) {
  const { currentIndex, setMouseEntered, totalTextItems } = useAnimatedDescription(items);

  useImperativeHandle(
    ref,
    () => ({
      onMouseEnter: () => setMouseEntered(true),
      onMouseLeave: () => setMouseEntered(false),
    }),
    [setMouseEntered],
  );

  return (
    <div className={cn(styles.root, className)} data-size={size} data-test-id={TEST_IDS.content}>
      <div className={styles.track}>
        {totalTextItems.map((item, index) => (
          <AnimatedItem key={index} content={item.content} itemIndex={index} currentIndex={currentIndex} />
        ))}
      </div>
    </div>
  );
});
