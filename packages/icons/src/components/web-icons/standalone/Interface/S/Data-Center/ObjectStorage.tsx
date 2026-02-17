// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ObjectStorageSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-object-storage';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M3.24 12v8.76h17.52V3.24H3.24zm16 0v7.24H4.76V4.76h14.48zm-9-3v1.76h3.52V7.24h-3.52zm4.963 3.864c-.602.161-1.137.683-1.324 1.29-.099.319-.106.862-.015 1.169.19.637.631 1.109 1.234 1.316 1.169.403 2.42-.324 2.623-1.523.175-1.038-.432-1.997-1.429-2.256a2.63 2.63 0 0 0-1.089.004m-7.395 2.053a89.582 89.582 0 0 0-1.168 1.82c0 .013 1.062.023 2.36.023 1.298 0 2.36-.01 2.36-.023 0-.04-2.334-3.617-2.36-3.617-.014 0-.55.809-1.192 1.797' />
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
export default ObjectStorageSVG;
