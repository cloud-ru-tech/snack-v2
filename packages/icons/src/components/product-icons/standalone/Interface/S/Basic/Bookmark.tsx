// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BookmarkSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-bookmark';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.24 12.28c0 4.972.008 9.04.018 9.04.01 0 1.742-1.048 3.85-2.328 2.108-1.28 3.859-2.328 3.892-2.328.033 0 1.784 1.048 3.892 2.328 2.108 1.28 3.84 2.328 3.85 2.328.01 0 .018-4.068.018-9.04V3.24H4.24zm14-.58c0 3.817-.009 6.94-.019 6.94s-1.414-.847-3.12-1.883L12 14.874l-3.101 1.883a346.643 346.643 0 0 1-3.12 1.883c-.01 0-.019-3.123-.019-6.94V4.76h12.48z'
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
export default BookmarkSVG;
