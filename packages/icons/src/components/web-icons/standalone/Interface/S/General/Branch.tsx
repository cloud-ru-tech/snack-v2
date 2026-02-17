// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BranchSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-branch';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M9.24 6v2.76h2v2.48h-7v4h-2v5.52h5.52v-5.52h-2v-2.48h5.48v2.48h-2v5.52h5.52v-5.52h-2v-2.48h5.48v2.48h-2v5.52h5.52v-5.52h-2v-4h-7V8.76h2V3.24H9.24zm4 0v1.24h-2.48V4.76h2.48zm-7 12v1.24H3.76v-2.48h2.48zm7 0v1.24h-2.48v-2.48h2.48zm7 0v1.24h-2.48v-2.48h2.48z'
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
export default BranchSVG;
