// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const HistorySVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-history';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.04 3.806a9.495 9.495 0 0 0-2.77.767c-1.793.838-3.302 2.309-4.146 4.041-1.351 2.77-1.124 5.973.603 8.536.429.636 1.153 1.406 1.853 1.97.198.16.366.307.374.327.008.02-.388.431-.88.913l-.894.876 2.29.002 2.29.002v-4.488l-.849.819-.848.82-.486-.395C6.118 16.811 5.25 15.449 4.904 13.8c-.266-1.267-.152-2.77.297-3.904a9.171 9.171 0 0 1 .87-1.616c.319-.451 1.061-1.212 1.509-1.546 1.316-.983 2.759-1.459 4.42-1.459 2.04 0 3.767.718 5.2 2.161a6.939 6.939 0 0 1 1.982 3.998c.148 1.111-.001 2.424-.383 3.39a9.177 9.177 0 0 1-.87 1.616c-.317.45-1.103 1.253-1.54 1.574-1.214.891-2.422 1.32-4.079 1.449l-.31.024V20.96h.318c1.319 0 3.075-.528 4.316-1.298A9.424 9.424 0 0 0 18.78 17.8c1.391-1.669 2.116-3.91 1.949-6.03-.172-2.176-1.058-4.051-2.635-5.574-1.846-1.783-4.432-2.66-7.054-2.39M8 10.5v.74h8V9.76H8zm0 4v.74h7.92v-1.48H8z'
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
export default HistorySVG;
