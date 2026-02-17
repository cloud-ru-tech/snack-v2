// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CoffeeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-coffee';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M5.8 4v.76h10.72V3.24H5.8zM4 7v.76h14.32V6.24H4zm1.68 2.194c-.566.097-.619.113-.611.186.016.157 1.854 11.281 1.871 11.331.014.039.325.048 1.449.04l1.431-.011v-1.48l-.802-.011-.802-.011-.474-2.869-.84-5.069-.365-2.2-.118-.006c-.066-.004-.398.041-.739.1m9.908 1.036c-.119.718-.209 1.156-.239 1.166-.027.009-.256.121-.509.249a4.508 4.508 0 0 0-2.102 2.17 4.785 4.785 0 0 0-.474 2.145c-.002.573.067.96.281 1.578l.159.462c.013.038-.406.558-1.126 1.4l-1.145 1.34 3.273.012c3.293.012 3.838-.004 4.391-.133 1.647-.382 3.09-1.466 3.721-2.796.339-.717.443-1.243.41-2.088-.032-.838-.173-1.416-.498-2.048-.748-1.454-2.372-2.418-4.237-2.515-.246-.013-.465-.035-.487-.048-.025-.016.016-.352.112-.918.105-.617.138-.897.107-.907a26.577 26.577 0 0 0-1.372-.219c-.066 0-.095.126-.265 1.15m2.43 2.509c1.333.281 2.247 1.047 2.578 2.161.112.376.169 1.042.122 1.413-.05.399-.102.578-.261.893-.485.963-1.603 1.744-2.825 1.973-.275.051-.639.06-2.13.051l-1.798-.01.374-.44.431-.506c.049-.058.029-.109-.168-.425-.544-.875-.709-1.877-.465-2.817.31-1.193 1.304-2.139 2.475-2.353.287-.053 1.304-.016 1.667.06'
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
export default CoffeeSVG;
