// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ZapFlashSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-zap-flash';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m9.765 8.17-3.199 4.57 3.977.01c2.187.006 3.977.021 3.977.033s-1.064 1.543-2.365 3.401c-1.301 1.859-2.356 3.388-2.346 3.398.057.057 1.17.818 1.196.818.017 0 1.471-2.057 3.23-4.57l3.199-4.57-3.977-.01c-2.187-.006-3.977-.021-3.977-.033s1.064-1.543 2.365-3.401c1.301-1.859 2.356-3.388 2.346-3.398a24 24 0 0 0-1.196-.818c-.017 0-1.471 2.057-3.23 4.57'
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
export default ZapFlashSVG;
