// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const EmailSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-email';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 12v7.76h17.52V4.24H3.24zm16-5.35v.891l-3.43 1.711c-2.25 1.122-3.495 1.723-3.62 1.744a1.3 1.3 0 0 1-.38 0c-.125-.021-1.37-.622-3.62-1.744L4.76 7.541V5.76h14.48zM7.929 10.801c1.983.989 3.226 1.586 3.391 1.629.347.092 1.013.092 1.36 0 .165-.043 1.408-.64 3.391-1.629 1.722-.859 3.14-1.561 3.15-1.561s.019 2.025.019 4.5v4.5H4.76v-4.5c0-2.475.009-4.5.019-4.5s1.428.702 3.15 1.561'
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
export default EmailSVG;
