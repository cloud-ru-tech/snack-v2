// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SortSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-sort';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m4.73 9.21-2.25 2.25.53.53.53.53 1.35-1.35 1.35-1.35V17h1.52V9.82l1.35 1.35 1.351 1.35.529-.53.53-.531L9.27 9.21A183.053 183.053 0 0 0 7 6.96c-.011 0-1.033 1.013-2.27 2.25m11.51 1.38v3.59l-1.36-1.36-1.36-1.36-.53.53-.53.53 2.27 2.27L17 17.06l2.27-2.27 2.27-2.27-.53-.53-.53-.53-1.36 1.36-1.36 1.36V7h-1.52z'
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
export default SortSVG;
