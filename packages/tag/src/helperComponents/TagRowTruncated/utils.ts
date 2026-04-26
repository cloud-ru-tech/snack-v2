import { RefObject } from 'react';

export const getGapWidth = (elementRef: RefObject<HTMLDivElement | null>): number => {
  const cssValue = elementRef.current ? getComputedStyle(elementRef.current, null).getPropertyValue('gap') : '0px';

  return parseInt(cssValue, 10) || 0;
};
