// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FilterFunnelSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-filter-funnel';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M2.52 4.26c0 .011 1.512 2.036 3.36 4.5l3.36 4.48v4.48c0 2.464.009 4.48.02 4.48s1.253-.616 2.76-1.37l2.74-1.37v-6.22l3.36-4.48a664 664 0 0 0 3.36-4.5c0-.011-4.266-.02-9.48-.02s-9.48.009-9.48.02m15.931 1.55c-.022.028-1.203 1.602-2.625 3.5l-2.586 3.45v5.781l-1.22.609c-.671.336-1.229.61-1.24.61s-.02-1.575-.02-3.5v-3.5L8.174 9.31l-2.625-3.5c-.031-.04 1.265-.05 6.451-.05s6.482.01 6.451.05'
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
export default FilterFunnelSVG;
