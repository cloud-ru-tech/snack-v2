// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CrossSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-cross';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m7.98 8-.519.52L9.2 10.26 10.94 12l-1.73 1.73-1.73 1.73.53.53.53.53 1.73-1.73L12 13.06l1.73 1.73 1.73 1.73.53-.53.53-.53-1.73-1.73L13.06 12l1.73-1.73 1.73-1.73-.53-.53-.53-.53-1.73 1.73L12 10.94l-1.73-1.73c-.952-.952-1.74-1.73-1.751-1.73-.011 0-.254.234-.539.52'
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
export default CrossSVG;
