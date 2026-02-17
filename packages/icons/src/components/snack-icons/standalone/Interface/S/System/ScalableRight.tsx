// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ScalableRightSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-scalable-right';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.47 4.47 3.24 5.7v12.6l1.23 1.23 1.23 1.23h12.6l1.23-1.23 1.23-1.23V12h-1.52V17.701l-.77.769-.771.77H6.301l-.771-.77-.77-.769V6.299l.77-.769.771-.77H12V3.24H5.7zM14 4v.76h4.18l-3.35 3.35-3.35 3.35.53.53.53.53 3.35-3.35 3.35-3.35V10h1.52V4H20v-.76h-6z'
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
export default ScalableRightSVG;
