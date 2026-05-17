// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DatacenterHostSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-datacenter-host';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M6.24 4.78v1.54h-3v14.44h17.52V6.32h-3V3.24H6.24zm10.01 6.35.01 6.37h1.48l.01-4.83.01-4.83h1.48v11.4H4.76V7.84h1.48l.01 4.83.01 4.83h1.48l.01-6.37.01-6.37h8.48zM9.538 6.291c-.011.029-.015.366-.009.75l.011.699h4.92V6.26l-2.451-.01c-1.975-.009-2.455-.001-2.471.041m0 3c-.011.029-.015.366-.009.75l.011.699h4.92V9.26l-2.451-.01c-1.975-.009-2.455-.001-2.471.041m2.163 3.994c-.334.048-.639.213-.932.502a1.65 1.65 0 0 0-.491 1.483c.069.401.204.66.498.954s.553.429.954.498c.326.056.699.004 1.023-.143.279-.127.699-.547.826-.826.295-.651.189-1.388-.275-1.902-.417-.46-.975-.658-1.603-.566' />
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
export default DatacenterHostSVG;
