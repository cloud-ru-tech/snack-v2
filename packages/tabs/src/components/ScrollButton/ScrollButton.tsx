import { Button } from '@design-system/button';
import { ChevronDownSVG, ChevronLeftSVG, ChevronRightSVG, ChevronUpSVG } from '@design-system/icons';
import { ReactElement } from 'react';

import { Direction, Orientation, Size } from '../../types';
import styles from './styles.module.scss';

const MAP_DIRECTION_TO_ICON: Record<Direction, ReactElement> = {
  left: <ChevronLeftSVG />,
  right: <ChevronRightSVG />,
  top: <ChevronUpSVG />,
  bottom: <ChevronDownSVG />,
};

export type ScrollButtonProps = {
  size: Size;
  direction: Direction;
  orientation: Orientation;
  onClick(): void;
};

export function ScrollButton({ size, onClick, direction, orientation }: ScrollButtonProps) {
  return (
    <div
      className={styles.scrollButton}
      data-direction={direction}
      data-size={size}
      data-orientation={orientation}
      data-testid={`tabs__scroll-button-${direction}`}
    >
      <Button
        tabIndex={-1}
        icon={MAP_DIRECTION_TO_ICON[direction]}
        size='s'
        view='elevated'
        appearance='neutral'
        onClick={onClick}
        aria-label={`Scroll ${direction}`}
      />
    </div>
  );
}
