// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ShareSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-share';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.24 5.287v3.107l-1.77.018c-1.415.014-1.838.031-2.11.083-1.979.38-3.312 1.626-3.838 3.585-.255.95-.282 1.428-.282 4.994v3.023l2.09-2.083c1.15-1.145 2.234-2.196 2.41-2.335s.433-.303.57-.366c.47-.214.66-.241 1.84-.262l1.09-.019v6.788l4.91-4.91L21.06 12l-4.91-4.91-4.91-4.91zm4.61 9.803-3.09 3.09v-4.625l-1.99.014-1.99.014-.397.11a4.5 4.5 0 0 0-1.483.734c-.198.149-.762.668-1.254 1.152l-.894.881.018-1.58c.015-1.261.032-1.652.087-1.935.275-1.442.956-2.356 2.067-2.773.667-.25.768-.259 3.426-.28l2.41-.02V5.82l3.09 3.09L18.94 12z'
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
export default ShareSVG;
