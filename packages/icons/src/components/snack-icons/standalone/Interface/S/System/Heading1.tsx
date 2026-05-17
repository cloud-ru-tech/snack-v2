// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const Heading1SVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-heading1';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M5.24 12v7h1.52v-6.24h6.48V19h1.52V5h-1.52v6.24H6.76V5H5.24zm13.76.287a1 1 0 0 0-.27.139c-.168.127-1.93 1.73-1.93 1.755 0 .016.683.783.92 1.033.067.071.082.062.425-.249l.355-.323.01 1.679.011 1.679h1.519v-2.505c0-1.867-.013-2.548-.049-2.67a.85.85 0 0 0-.587-.54c-.236-.051-.217-.051-.404.002'
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
export default Heading1SVG;
