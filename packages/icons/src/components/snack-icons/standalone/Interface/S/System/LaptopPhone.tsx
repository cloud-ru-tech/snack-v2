// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const LaptopPhoneSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-laptop-phone';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.24 10.5v6.26l4.13-.01 4.13-.01v-1.48l-3.37-.01-3.37-.01V5.76h12.479l.01 1.37.011 1.37h1.48l.01-2.13.011-2.13H4.24zm10 5v5.26h6.52V10.24h-6.52zm5 0v3.74h-3.48v-7.48h3.48zM3 19v.76l4.75-.01 4.75-.01v-1.48l-4.75-.01L3 18.24z'
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
export default LaptopPhoneSVG;
