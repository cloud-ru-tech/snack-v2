// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const RowExpandedSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-row-expanded';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m7.98 4-.519.521L9.73 6.79 12 9.06l2.27-2.27 2.27-2.27-.53-.53-.53-.53-1.74 1.74L12 6.94l-1.73-1.73c-.952-.952-1.74-1.73-1.751-1.73s-.254.234-.539.52m-2.279 6.285c-.334.048-.639.213-.932.502a1.65 1.65 0 0 0-.491 1.483c.069.401.204.66.498.954s.553.429.954.498c.326.056.699.004 1.023-.143.279-.127.699-.547.826-.826.295-.651.189-1.388-.275-1.902-.417-.46-.975-.658-1.603-.566m6 0c-.334.048-.639.213-.932.502a1.65 1.65 0 0 0-.491 1.483c.069.401.204.66.498.954s.553.429.954.498c.326.056.699.004 1.023-.143.279-.127.699-.547.826-.826.295-.651.189-1.388-.275-1.902-.417-.46-.975-.658-1.603-.566m6 0c-.334.048-.639.213-.932.502a1.65 1.65 0 0 0-.491 1.483c.069.401.204.66.498.954s.553.429.954.498c.326.056.699.004 1.023-.143.279-.127.699-.547.826-.826.295-.651.189-1.388-.275-1.902-.417-.46-.975-.658-1.603-.566M6.167 11.826c.152.138.045.414-.16.414a.243.243 0 0 1-.181-.407c.083-.091.244-.094.341-.007m6 0c.152.138.045.414-.16.414a.243.243 0 0 1-.181-.407c.083-.091.244-.094.341-.007m6 0c.091.083.094.244.007.341-.138.152-.414.045-.414-.16 0-.214.248-.324.407-.181M9.73 17.21l-2.25 2.25.53.53.53.53 1.73-1.73L12 17.06l1.73 1.73 1.731 1.73.529-.53.53-.531-2.25-2.249A183 183 0 0 0 12 14.96c-.011 0-1.033 1.013-2.27 2.25'
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
export default RowExpandedSVG;
