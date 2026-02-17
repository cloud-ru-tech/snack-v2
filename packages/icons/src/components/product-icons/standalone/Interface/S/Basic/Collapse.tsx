// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CollapseSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-collapse';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M18.23 4.71 16 6.94l-1.38-1.38-1.38-1.38v6.58h6.58l-1.38-1.38L17.06 8l2.24-2.24 2.239-2.24L21.02 3c-.285-.286-.528-.52-.539-.52-.012 0-1.025 1.003-2.251 2.23m-2.75 3.83.699.7H14.76v-.7c0-.385.005-.7.01-.7.006 0 .325.315.71.7m-9.92 6.08L6.94 16l-2.23 2.23-2.23 2.23.53.53.53.53 2.23-2.23L8 17.06l1.38 1.38 1.38 1.38v-6.58H4.18zm3.68.84c0 .385-.005.7-.01.7-.006 0-.325-.315-.71-.7l-.699-.7H9.24z'
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
export default CollapseSVG;
