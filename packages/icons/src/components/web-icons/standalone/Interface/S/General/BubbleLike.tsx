// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BubbleLikeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-bubble-like';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.34 3.28a8.699 8.699 0 0 0-5.521 2.54c-1.344 1.343-2.192 3.027-2.485 4.94-.096.63-.096 1.85 0 2.48.398 2.594 1.87 4.839 4.07 6.205 1.102.684 2.511 1.152 3.836 1.273.289.026 2.146.042 4.99.042h4.53v-4.53c0-2.844-.016-4.701-.042-4.99-.21-2.299-1.336-4.47-3.064-5.911-1.795-1.495-4.009-2.214-6.314-2.049m1.892 1.576a7.25 7.25 0 0 1 3.883 2.029 7.167 7.167 0 0 1 2.064 4.167c.051.396.061 1.095.061 4.331v3.86l-4.11-.013-4.11-.013-.466-.106c-1.457-.33-2.654-.976-3.645-1.967-1.122-1.122-1.79-2.418-2.075-4.024-.071-.4-.071-1.84 0-2.24a8.832 8.832 0 0 1 .384-1.441 7.385 7.385 0 0 1 4.221-4.221c.522-.201 1.029-.32 1.861-.435.266-.037 1.615.014 1.932.073m-1.698 1.945c-.416.084-.841.406-1.047.793-.198.37-.246.653-.246 1.451l-.001.705-.63.02c-.496.015-.678.037-.854.101-.449.162-.688.373-.869.767-.174.378-.164.738.069 2.602.112.891.224 1.737.249 1.88.07.397.24.696.591 1.04.332.326.624.496.963.56.131.025 1.501.04 3.606.04h3.395v-6.519l-1.169-.01-1.168-.011-.983-1.72-.983-1.72-.378-.006a3.362 3.362 0 0 0-.545.027m1.182 3.469.85 1.49h1.674v3.48H9.997l-.154-.15-.155-.15-.227-1.814c-.124-.998-.215-1.826-.201-1.84.015-.014.583-.032 1.263-.039l1.237-.012V9.928c0-1.099.008-1.293.053-1.227.029.043.436.749.903 1.569'
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
export default BubbleLikeSVG;
