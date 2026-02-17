// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const StarHalfSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-star-half';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M9.947 5.953 8.554 8.267l-3.167.732c-1.742.403-3.201.745-3.242.759-.062.023.284.441 2.056 2.485 1.172 1.351 2.153 2.484 2.18 2.517.039.048-.009.724-.24 3.36a205.363 205.363 0 0 0-.277 3.315c.007.008 1.377-.564 3.046-1.27 1.668-.707 3.059-1.285 3.09-1.285.031 0 1.422.578 3.09 1.285 1.669.706 3.039 1.278 3.046 1.27.007-.008-.118-1.5-.277-3.315-.231-2.636-.279-3.312-.24-3.36.027-.033 1.008-1.166 2.18-2.517 1.772-2.044 2.118-2.462 2.056-2.485-.041-.014-1.5-.356-3.242-.759l-3.167-.732-1.393-2.314c-.766-1.272-1.406-2.313-1.422-2.313a2.74 2.74 0 0 0-.33.183L12 4.006l-.301-.183a2.74 2.74 0 0 0-.33-.183c-.016 0-.656 1.041-1.422 2.313m3.33 1.627 1.205 2 2.321.54c1.277.297 2.319.558 2.316.58-.004.022-.701.84-1.55 1.818l-1.543 1.777.009.183c.005.1.096 1.172.202 2.382.106 1.21.187 2.207.179 2.216-.008.009-.935-.374-2.061-.851a85.97 85.97 0 0 0-2.057-.856 6.127 6.127 0 0 0-.151.311l-.14.3-.004-6.238c-.002-3.764.011-6.223.034-6.2.02.021.578.938 1.24 2.038' />
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
export default StarHalfSVG;
