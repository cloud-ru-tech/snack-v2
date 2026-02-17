// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SmartSearchBasedOnDataSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-smart-search-based-on-data';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m6.402 4.477-.578 1.356-1.334.571c-.734.314-1.341.581-1.348.594-.008.012.593.281 1.336.599l1.349.576.576 1.353c.318.744.586 1.353.597 1.353.011 0 .279-.609.597-1.353l.576-1.353 1.349-.576c.743-.318 1.344-.587 1.336-.599-.007-.013-.614-.28-1.349-.594l-1.336-.572-.576-1.355C7.279 3.731 7.011 3.121 7 3.121c-.011 0-.28.611-.598 1.356m5.095-1.183c-.011.027-.014.363-.008.747l.011.699.16.01c.742.046 1.364.155 1.914.334 2.474.808 4.273 2.967 4.605 5.528a6.718 6.718 0 0 1-2.239 5.959 6.662 6.662 0 0 1-4.44 1.669c-3.066 0-5.714-2.037-6.519-5.015-.105-.389-.221-1.179-.221-1.507v-.198H3.24v.13c0 .072.019.328.041.57a8.22 8.22 0 0 0 2.93 5.604c1.335 1.122 2.921 1.763 4.715 1.904 1.982.156 4.122-.501 5.674-1.743l.18-.144 1.84 1.837 1.84 1.836.54-.517.54-.517-1.849-1.85-1.85-1.85.144-.18a8.26 8.26 0 0 0 1.116-1.901 8.203 8.203 0 0 0 0-6.398c-.983-2.347-3.058-4.146-5.511-4.778-.762-.197-2.051-.338-2.093-.229M7.04 7a.04.04 0 0 1-.04.04.04.04 0 0 1-.04-.04.04.04 0 0 1 .04-.04.04.04 0 0 1 .04.04m.8 5v.762l.75-.011.75-.011v-1.48l-.75-.011-.75-.011zm3.018-.709c-.011.029-.015.366-.009.75l.011.699.75.011.75.011V11.24h-.741c-.567 0-.746.012-.761.051M13.84 12v.762l.75-.011.75-.011v-1.48l-.75-.011-.75-.011z'
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
export default SmartSearchBasedOnDataSVG;
