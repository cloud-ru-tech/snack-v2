// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const MonitoringSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-monitoring';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.47 4.47 3.24 5.7v12.6l1.23 1.23 1.23 1.23H12v-1.52H6.301l-.771-.77-.77-.769V6.299l.77-.769.771-.77h11.398l.771.77.77.769V12h1.52V5.7l-1.23-1.23-1.23-1.23H5.7zM7.24 12v5h1.52V7H7.24zm4.009-3.75.011 1.25h1.48l.011-1.25.01-1.25h-1.522zm4 0 .011 1.25h1.48l.011-1.25.01-1.25h-1.522zm-1.189 2.034c-1.406.126-2.731 1.046-3.363 2.336-.352.719-.507 1.557-.424 2.287.234 2.059 1.753 3.578 3.821 3.818.854.099 1.869-.135 2.641-.611l.198-.121 1.263 1.263 1.264 1.264.53-.53.53-.53-1.264-1.264-1.263-1.263.121-.198c.477-.775.713-1.803.61-2.657-.183-1.509-1.045-2.741-2.384-3.409-.622-.31-1.486-.456-2.28-.385m1.04 1.536c.346.072.85.318 1.134.554.986.815 1.288 2.196.729 3.326-.267.54-.75 1.031-1.256 1.278-.707.344-1.707.345-2.413 0a3.105 3.105 0 0 1-.925-.75c-1.117-1.377-.644-3.447.962-4.21a2.863 2.863 0 0 1 1.769-.198'
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
export default MonitoringSVG;
