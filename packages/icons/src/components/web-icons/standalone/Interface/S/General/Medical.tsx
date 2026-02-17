// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const MedicalSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-medical';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M8.24 5.74v2.5h-5v7.52h5v5h7.52v-3.04h-1.52v1.52H9.76v-5h-5V9.76h5v-5h4.48v5h5v4.48h-2.745l-.118-.124a1.65 1.65 0 0 0-.297-.23c-.163-.096-.219-.106-.58-.106-.452 0-.548.035-.848.312a1.23 1.23 0 0 0 .1 1.891c.463.353 1.081.336 1.548-.045l.219-.178h4.241V8.24h-5v-5H8.24z' />
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
export default MedicalSVG;
