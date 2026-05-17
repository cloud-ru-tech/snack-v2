// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FolderOpenSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-folder-open';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 12v7.76l8.666-.01 8.665-.01 1.213-4.24 1.215-4.25c0-.005-.503-.01-1.119-.01h-1.12v-5h-8.561l-1.499-1-1.499-1H3.24zm7.04-5.24 1.5 1h7.46v3.48l-5.906.01-5.905.01-.576 2.015a87 87 0 0 0-.565 2.023c.007.005.331.099.722.21l.71.201.078-.264.747-2.615c.019-.066.351-.07 6.24-.07h6.22l-.027.085c-.036.114-1.538 5.372-1.538 5.385 0 .005-3.303.01-7.34.01H4.76V5.76h4.02z'
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
export default FolderOpenSVG;
