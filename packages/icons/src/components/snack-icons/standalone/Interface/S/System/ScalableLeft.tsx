// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ScalableLeftSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-scalable-left';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4 3.62V4h-.76v6h1.52V5.82l3.35 3.35 3.35 3.35.53-.53.53-.53-3.35-3.35-3.35-3.35H10V3.24H4zM12 4v.76h5.699l.771.77.77.769v11.402l-.77.769-.771.77H6.301l-.771-.77-.77-.769V12H3.24v6.3l1.23 1.23 1.23 1.23h12.6l1.23-1.23 1.23-1.23V5.7l-1.23-1.23-1.23-1.23H12z'
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
export default ScalableLeftSVG;
