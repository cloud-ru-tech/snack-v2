// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const MarketSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-market';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M2 3.999v.76l.947.01.947.011 1.246 5.98 1.246 5.98 6.106.01 6.106.01.022-.09c.089-.368 2.3-10.358 2.3-10.39q-.002-.04-6.46-.04H8v1.52h5.52c4.439 0 5.52.01 5.52.051 0 .039-1.512 6.889-1.62 7.339l-.022.09h-4.899c-2.694 0-4.899-.011-4.899-.024s-.558-2.703-1.24-5.976-1.24-5.962-1.24-5.976c0-.013-.702-.024-1.56-.024H2zm5.701 14.286c-.334.048-.639.213-.932.502a1.65 1.65 0 0 0-.491 1.483c.069.401.204.66.498.954s.553.429.954.498c.326.056.699.004 1.023-.143.279-.127.699-.547.826-.826.295-.651.189-1.388-.275-1.902-.417-.46-.975-.658-1.603-.566m8 0c-.334.048-.639.213-.932.502a1.65 1.65 0 0 0-.491 1.483c.069.401.204.66.498.954s.553.429.954.498c.326.056.699.004 1.023-.143.279-.127.699-.547.826-.826.295-.651.189-1.388-.275-1.902-.417-.46-.975-.658-1.603-.566' />
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
export default MarketSVG;
