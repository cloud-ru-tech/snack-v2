import cn from 'classnames';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import { GAP_PX, innerChipTransition, layoutSpring, outerChipTransition } from './constants';
import styles from './styles.module.scss';

export type AnimatedExpandableItemProps = {
  index: number;
  total: number;
  shown: boolean;
  children: ReactNode;
};

export function AnimatedExpandableItem({ index, total, shown, children }: AnimatedExpandableItemProps) {
  return (
    <motion.div
      layout='position'
      initial={false}
      animate={{
        width: shown ? 'auto' : 0,
        marginRight: shown ? GAP_PX : 0,
      }}
      transition={outerChipTransition(shown)}
      className={styles.outerChip}
      aria-hidden={!shown}
    >
      <motion.div
        initial={false}
        animate={{
          scale: shown ? 1 : 0,
          opacity: shown ? 1 : 0,
        }}
        transition={innerChipTransition(index, total, shown)}
        className={cn(styles.innerChip, { [styles.innerChipHidden]: !shown })}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export type AnimatedTriggerWrapProps = {
  children: ReactNode;
};

export function AnimatedTriggerWrap({ children }: AnimatedTriggerWrapProps) {
  return (
    <motion.div layout='position' transition={{ layout: layoutSpring }} className={styles.triggerWrap}>
      {children}
    </motion.div>
  );
}
