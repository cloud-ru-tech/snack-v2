import { Placement } from '@floating-ui/react';
import { RefObject } from 'react';

import { getArrowPositionStyles } from '../../utils';

export type ArrowProps = {
  placement: Placement;
  x?: number;
  y?: number;
  arrowContainerClassName?: string;
  arrowElementClassName?: string;
  arrowRef: RefObject<HTMLDivElement | null>;
};

export function Arrow({ placement, x, y, arrowContainerClassName, arrowElementClassName, arrowRef }: ArrowProps) {
  return (
    <div
      className={arrowContainerClassName}
      ref={arrowRef as RefObject<HTMLDivElement>}
      style={getArrowPositionStyles({ x, y, placement, ref: arrowRef })}
    >
      <svg
        className={arrowElementClassName}
        width='12'
        height='6'
        viewBox='0 0 12 6'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M0 0L12 0L6.70711 5.29289C6.31658 5.68342 5.68342 5.68342 5.29289 5.29289L0 0Z' />
      </svg>
    </div>
  );
}
