// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const PinnedSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-pinned';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M14.76 4.18v2l-1.53 1.53-1.53 1.53H5.699l-.879.88-.88.88 2 2 2 2-2.23 2.23-2.23 2.23.53.53.53.53 2.23-2.23L9 16.06l2 2 2 2 .88-.88.88-.879V12.3l1.53-1.53 1.53-1.529 1.99-.011 1.99-.01-3.52-3.52-3.52-3.52zm2.91 3.571-.49.011-1.59 1.589L14 10.94l-.47-.47-.47-.47 1.59-1.59 1.59-1.59v-.999l.96.959.961.96zm-5.2 3.779.77.769v5.406l-.121.116-.122.116L9.53 14.47l-3.467-3.467.116-.122.116-.121h5.404z'
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
export default PinnedSVG;
