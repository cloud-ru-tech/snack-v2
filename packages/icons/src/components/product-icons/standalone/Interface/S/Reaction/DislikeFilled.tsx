// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DislikeFilledSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-dislike-filled';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M6.48 3.281a2.7 2.7 0 0 0-.949.26c-.762.352-1.257.899-1.465 1.621-.035.122-.091.518-.124.88s-.205 2.161-.382 3.998c-.366 3.786-.363 3.648-.082 4.22.264.539.718.916 1.305 1.086.208.06.519.07 2.527.084l2.29.016v1.394c0 1.472.026 1.76.196 2.19.203.514.7 1.093 1.168 1.361.374.214.862.332 1.479.358l.544.022.145-.395 1.386-3.833 1.242-3.437V3.24l-4.51.006c-2.481.003-4.627.019-4.77.035M17.24 8v4.76h3.52V3.24h-3.52z' />
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
export default DislikeFilledSVG;
