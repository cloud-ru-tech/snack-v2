// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const StrikeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-strike';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M10.76 5.28Q9.512 5.4 8.565 6.3a3.74 3.74 0 0 0-1.032 1.688c-.098.321-.107.41-.107 1.012s.009.691.107 1.012c.114.371.309.798.483 1.054l.105.154-1.06.011-1.061.01v1.519l3.57.001c3.006 0 3.61.01 3.82.059.724.171 1.394.793 1.613 1.497.113.365.113 1.001 0 1.366-.216.695-.868 1.309-1.591 1.497-.279.073-2.266.085-2.755.017-.692-.096-1.428-.382-1.712-.665l-.152-.152-.657.34c-.361.187-.656.345-.656.352 0 .041.229.336.39.502.597.617 1.651 1.026 2.95 1.145.657.061 2.13.051 2.58-.017a3.6 3.6 0 0 0 1.99-.96 3.74 3.74 0 0 0 1.077-1.73c.098-.321.107-.41.107-1.012s-.009-.691-.107-1.011a5 5 0 0 0-.509-1.099l-.086-.13H18v-1.52h-3.592c-3.071 0-3.625-.009-3.823-.06-.723-.189-1.37-.798-1.589-1.497-.114-.366-.114-1 0-1.366.222-.706.89-1.326 1.614-1.497.302-.071 1.775-.083 2.257-.018.739.1 1.484.382 1.757.667l.15.156.642-.33c.353-.181.648-.346.654-.366s-.067-.145-.165-.277c-.417-.568-1.281-1.03-2.333-1.247-.693-.144-2.01-.202-2.812-.125'
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
export default StrikeSVG;
