// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const MinimizeWindowSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-minimize-window';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M12 4v.76h5.699l.771.77.77.769V12.24h-7v7H6.301l-.771-.77-.77-.769V12H3.24v6.3l1.23 1.23 1.23 1.23h15.06V5.7l-1.23-1.23-1.23-1.23H12zM4.98 5l-.519.52L6.82 7.88l2.36 2.36H7v1.52h4V11h.76V7h-1.52v2.18L7.89 6.83C6.597 5.537 5.531 4.48 5.519 4.48c-.011 0-.254.234-.539.52m14.26 11.5v2.74h-5.48v-5.48h5.48z'
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
export default MinimizeWindowSVG;
