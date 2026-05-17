// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const IndustrialBuildingSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-industrial-building';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M15.24 4.95v1.711L13.033 8.5a177 177 0 0 1-2.24 1.853c-.018.008-.033-.834-.033-1.87V6.6L7 9.107l-3.76 2.506v9.147h17.52V3.24h-5.52zm4 7.05v7.24h-2.48V4.76h2.48zm-4 1.94v5.3h-4.48l.001-3.45.001-3.45 2.223-1.85c1.223-1.017 2.23-1.85 2.239-1.85s.016 2.385.016 5.3m-6 .4v4.9H4.76V12.4l2.21-1.477a122 122 0 0 1 2.24-1.48c.016-.002.03 2.202.03 4.897m-3-1.08V14h1.52v-1.48H6.24zm6 0V14h1.52v-1.48h-1.52zm-6 3V17h1.52v-1.48H6.24zm6 0V17h1.52v-1.48h-1.52z'
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
export default IndustrialBuildingSVG;
