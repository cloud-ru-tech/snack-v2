// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BuildingSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-building';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.24 6.74v3.5h-8v10.52h17.52V3.24h-9.52zm8 5.26v7.24h-6.48v-4H7.24v4H4.76v-7.48h8v-7h6.48zm-3.991-4.25.011.75h1.48l.011-.75.011-.75h-1.524zm0 4 .011.75h1.48l.011-.75.011-.75h-1.524zm0 4 .011.75h1.48l.011-.75.011-.75h-1.524zM11.24 18v1.24H8.76v-2.48h2.48z'
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
export default BuildingSVG;
