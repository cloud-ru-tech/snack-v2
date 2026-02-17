// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BookSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-book';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.25 10.87c.011 7.307.014 7.641.086 7.89.041.143.126.376.19.517.353.785 1.135 1.318 2.118 1.441.222.028 2.811.042 7.725.042h7.391V7.17l-2.13-1.865L16.5 3.44l-.248.27-.249.27-.001-.37L16 3.24H3.238zm2.99-3.39c0 1.496.009 2.72.02 2.72.011 0 .632-.306 1.38-.68L9 8.84l1.36.68c.748.374 1.369.68 1.38.68.011 0 .02-1.224.02-2.72V4.76h3.48v14.481l-4.81-.01-4.81-.011-.2-.092a1.04 1.04 0 0 1-.547-.543l-.093-.205-.01-6.81-.011-6.81H6.24zm4-1.22c0 .825-.009 1.5-.02 1.5-.012 0-.291-.135-.62-.3L9 7.159l-.6.301c-.329.165-.608.3-.62.3-.011 0-.02-.675-.02-1.5v-1.5h2.48zm7.875.58 1.122.98.001 5.71.002 5.71h-2.48V5.674l.116.093c.064.051.621.534 1.239 1.073M6.498 12.291c-.011.029-.015.366-.009.75l.011.699h7v-1.48l-3.491-.01c-2.822-.008-3.495-.001-3.511.041m0 3c-.011.029-.015.366-.009.75l.011.699h7v-1.48l-3.491-.01c-2.822-.008-3.495-.001-3.511.041'
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
export default BookSVG;
