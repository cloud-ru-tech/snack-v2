// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CrossArrowsSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-cross-arrows';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 12v8.76h17.52V3.24H3.24zm16 0v7.24H4.76v-2.48h4.701l.759-1.52c.418-.836.769-1.52.78-1.52s.362.684.78 1.52l.759 1.52h2.701v2.06l1.41-1.41L18.06 16l-1.41-1.41-1.41-1.41v2.06h-1.78l-.81-1.62-.81-1.62.81-1.62.81-1.62h1.78v2.06l1.41-1.41L18.06 8l-1.41-1.41-1.41-1.41v2.06h-2.701l-.759 1.52c-.418.836-.769 1.52-.78 1.52s-.362-.684-.78-1.52l-.759-1.52H4.76V4.76h14.48zm-9.89-1.62.81 1.62-.81 1.62-.81 1.62H4.76V8.76h3.78z'
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
export default CrossArrowsSVG;
