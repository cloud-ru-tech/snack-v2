// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ExpandSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-expand';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M15.56 4.62 16.94 6l-2.23 2.23-2.23 2.23.53.53.53.53 2.23-2.23L18 7.06l1.38 1.38 1.38 1.38V3.24h-6.58zm3.68.84c0 .385-.005.7-.01.7-.006 0-.325-.315-.71-.7l-.699-.7h1.419zM8.23 14.71 6 16.94l-1.38-1.38-1.38-1.38v6.58h6.58l-1.38-1.38L7.06 18l2.24-2.24 2.239-2.24-.519-.52c-.285-.286-.528-.52-.539-.52-.012 0-1.025 1.003-2.251 2.23m-2.75 3.83.699.7H4.76v-.7c0-.385.005-.7.01-.7.006 0 .325.315.71.7'
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
export default ExpandSVG;
