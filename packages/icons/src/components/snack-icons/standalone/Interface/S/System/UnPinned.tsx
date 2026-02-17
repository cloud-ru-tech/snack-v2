// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const UnPinnedSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-un-pinned';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M14.76 4.18v2l-1.91 1.91L10.94 10l1.53 1.53L14 13.06l1.91-1.91 1.91-1.909 1.99-.011 1.99-.01-3.52-3.52-3.52-3.52zm2.91 3.571-.49.011-1.59 1.589L14 10.94l-.47-.47-.47-.47 1.59-1.59 1.59-1.59v-.999l.96.959.961.96zM4.98 7l-.519.521 5.999 5.999 5.999 6 .531-.53.531-.529-5.991-5.991C8.236 9.176 5.531 6.48 5.519 6.48c-.011 0-.254.234-.539.52m0 4-.519.52L6.2 13.26 7.94 15l-2.23 2.23-2.23 2.23.53.53.53.53 2.23-2.23L9 16.06l1.73 1.73 1.731 1.73.529-.53.53-.531-3.99-3.989c-2.195-2.195-3.999-3.99-4.011-3.99-.011 0-.254.234-.539.52'
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
export default UnPinnedSVG;
