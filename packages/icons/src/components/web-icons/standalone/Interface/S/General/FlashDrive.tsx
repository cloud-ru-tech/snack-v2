// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FlashDriveSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-flash-drive';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M13.94 3.6 12.3 5.24h-1.8L6.37 9.37 2.24 13.5v2.4l2.93 2.93 2.93 2.93h2.387l4.157-4.127 4.156-4.128V11.66l1.63-1.63 1.63-1.63-3.22-3.22a373.131 373.131 0 0 0-3.24-3.22c-.011 0-.758.738-1.66 1.64m3.84 2.64 2.16 2.16-.96.96-.96.96-2.17-2.17-2.17-2.17.95-.95c.522-.522.959-.95.97-.95.011 0 .992.972 2.18 2.16m-2.99 2.97 2.49 2.49v1.202l-3.697 3.669-3.696 3.669H8.7l-2.47-2.47-2.47-2.47v-1.2l3.67-3.669 3.67-3.669.52-.012c.286-.007.556-.017.6-.021.058-.007.771.682 2.57 2.481m-8.5 6.08-.53.531 1.2 1.199 1.2 1.2.53-.53.53-.53-1.2-1.2-1.201-1.2z'
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
export default FlashDriveSVG;
