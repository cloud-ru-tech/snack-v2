// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ArrowsRoundSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-arrows-round';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.04 3.806a8.815 8.815 0 0 0-5.134 2.39c-1.131 1.092-1.904 2.363-2.323 3.817a8.514 8.514 0 0 0 1.409 7.507c.328.433 1.042 1.158 1.528 1.549.231.187.425.353.432.37.006.017-.399.429-.9.916l-.91.885H9.76v-4.539l-.61.6c-.336.33-.721.705-.856.834l-.246.234-.454-.36c-1.097-.869-1.846-1.845-2.331-3.035-.549-1.347-.653-2.92-.287-4.365.188-.744.611-1.643 1.095-2.329.319-.451 1.061-1.212 1.509-1.546a7.386 7.386 0 0 1 2.602-1.25c.425-.108 1.077-.204 1.388-.205.464-.001.43.062.43-.784V3.76l-.31.005c-.17.003-.463.021-.65.041m3.2 2.214c0 1.243.014 2.26.03 2.26.017 0 .399-.369.85-.82.451-.451.83-.82.843-.82.06 0 1.05.862 1.345 1.17a7 7 0 0 1 1.609 6.95c-.163.514-.656 1.496-.986 1.96-.321.452-1.107 1.255-1.542 1.574-1.217.893-2.419 1.32-4.079 1.449l-.31.024V21.24h.318c1.319 0 3.075-.528 4.316-1.298a9.424 9.424 0 0 0 2.146-1.862c1.332-1.597 2.064-3.753 1.964-5.779-.105-2.136-.929-4.056-2.383-5.555a15.5 15.5 0 0 0-1.319-1.175c-.01-.008.386-.418.879-.913l.898-.898H14.24z'
      />
    </svg>
  ).props.children;
  const style = isCustomSize
    ? {
        ...(props.style || {}),
        width: sizePx,
        height: sizePx,
      }
    : props.style;
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={sizePx}
      height={sizePx}
      fill='currentColor'
      viewBox='0 0 24 24'
      data-test-id={'icon' + testId}
      style={style}
      {...props}
    >
      {children}
    </svg>
  );
});
export default ArrowsRoundSVG;
