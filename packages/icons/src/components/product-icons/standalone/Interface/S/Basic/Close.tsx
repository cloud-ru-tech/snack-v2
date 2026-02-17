// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CloseSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-close';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m5.98 6-.519.52L8.2 9.26 10.94 12l-2.73 2.73-2.73 2.73.53.53.53.53 2.73-2.73L12 13.06l2.73 2.73 2.73 2.73.53-.53.53-.53-2.73-2.73L13.06 12l2.74-2.74 2.74-2.74-.53-.53-.53-.53-2.74 2.74L12 10.94 9.27 8.21C7.768 6.708 6.531 5.48 6.519 5.48c-.011 0-.254.234-.539.52'
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
export default CloseSVG;
