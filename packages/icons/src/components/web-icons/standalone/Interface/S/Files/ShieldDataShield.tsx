// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ShieldDataShieldSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-shield-data-shield';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m16.97 3.01-.53.531 1.64 1.639 1.64 1.64v12.9h1.48V6.18l-1.85-1.85-1.851-1.85zM4.2 6.62V10h1.52V4.76h6.48v4h4v9.479l-1.35.01-1.35.011v1.48l2.11.01 2.11.011V8h-.738l.259-.261.258-.26L15.5 5.48l-1.999-1.999-.27.268-.271.269V3.24H4.2zm10.24-.08.699.7H13.72v-.7c0-.385.005-.7.01-.7.006 0 .325.315.71.7M3.241 14.89c0 2.922.003 2.964.247 3.461.087.179.225.364.412.552.278.279.305.294 1.941 1.116l1.66.833 1.659-.833c1.637-.823 1.663-.838 1.939-1.117.188-.188.325-.373.413-.553.244-.499.247-.537.247-3.459l.001-2.65H3.24zm6.999.772c0 2.119.009 2.046-.276 2.249-.084.06-.674.368-1.309.684l-1.156.575-1.18-.589c-.648-.324-1.238-.633-1.309-.687-.256-.193-.25-.138-.25-2.232V13.76h5.48z'
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
export default ShieldDataShieldSVG;
