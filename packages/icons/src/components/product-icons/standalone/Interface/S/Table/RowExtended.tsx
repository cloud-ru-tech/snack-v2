// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const RowExtendedSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-row-extended';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M9.73 5.21 7.48 7.46l.53.53.53.53 1.73-1.73L12 5.06l1.73 1.73 1.731 1.73.529-.53.53-.531-2.25-2.249A183.053 183.053 0 0 0 12 2.96c-.011 0-1.033 1.013-2.27 2.25M5 10v.76h14V9.24H5zm0 4v.76h14v-1.52H5zm2.98 2-.519.521L9.73 18.79 12 21.06l2.27-2.27 2.27-2.27-.53-.53-.53-.53-1.74 1.74L12 18.94l-1.73-1.73c-.952-.952-1.74-1.73-1.751-1.73-.011 0-.254.234-.539.52'
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
export default RowExtendedSVG;
