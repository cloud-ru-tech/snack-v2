// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BankSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-bank';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.59 5.108 3.24 7.015V9.76h6v6.52H6.76v-4.76H5.24v4.76h-2v4.48h17.52v-4.48h-6V9.76h2.479l.011 2.37.01 2.37h1.48l.01-2.37.011-2.37h1.999V7.015L16.43 5.12c-2.382-1.042-4.366-1.9-4.41-1.907-.044-.006-2.037.846-4.43 1.895m8.082 1.315 3.566 1.557.001.13.001.13H4.76l.001-.13.001-.13 3.589-1.57c1.974-.864 3.626-1.564 3.672-1.557.045.007 1.687.714 3.649 1.57M13.24 13.02v3.26h-2.48V9.76h2.48zm6 5.5v.72H4.76V17.8h14.48z'
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
export default BankSVG;
