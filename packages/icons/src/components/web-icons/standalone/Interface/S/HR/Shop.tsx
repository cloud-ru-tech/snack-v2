// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ShopSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-shop';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 6.129v2.889l1 5.845c.55 3.215 1 5.857 1 5.871s3.042.026 6.76.026 6.76-.012 6.76-.026c0-.015.45-2.657 1-5.872l1-5.844V3.24H3.24zm16 .74v2.11l-.86 5.04c-.474 2.773-.87 5.082-.881 5.131l-.021.09H6.522l-.021-.09c-.011-.049-.408-2.358-.881-5.13l-.86-5.04V4.76h14.48zM7 9v.76h10V8.24H7zm1.24 5.5V17h1.52v-5H8.24zm3 0V17h1.52v-5h-1.52zm3 0V17h1.52v-5h-1.52z'
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
export default ShopSVG;
