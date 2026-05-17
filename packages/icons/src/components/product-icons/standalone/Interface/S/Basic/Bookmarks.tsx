// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BookmarksSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-bookmarks';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M8.24 5.24v2h-4v7.56c0 4.158.011 7.56.023 7.56s1.309-.836 2.88-1.857L10 18.645l2.857 1.858a237 237 0 0 0 2.88 1.857c.012 0 .023-1.458.023-3.24s.007-3.24.016-3.24.895.549 1.968 1.22c1.074.671 1.966 1.22 1.984 1.22s.032-3.393.032-7.54V3.24H8.24zm10 4.96v5.44l-.35-.219-1.239-.77-.888-.551-.002-3.43-.001-3.43h-6V4.76h8.48zm-4 3.982c0 4.327-.01 5.417-.05 5.393a535 535 0 0 1-2.103-1.362C10.958 17.48 10.019 16.88 10 16.88s-.958.6-2.087 1.333a535 535 0 0 1-2.103 1.362c-.04.024-.05-1.066-.05-5.393V8.76h8.48z'
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
export default BookmarksSVG;
