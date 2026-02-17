// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const QuotaSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-quota';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.34 3.28a8.699 8.699 0 0 0-5.521 2.54c-1.344 1.343-2.192 3.027-2.485 4.94-.096.63-.096 1.85 0 2.48.398 2.594 1.87 4.839 4.07 6.205 1.518.943 3.456 1.42 5.206 1.282 2.156-.17 4.069-1.044 5.571-2.546 1.502-1.502 2.376-3.415 2.546-5.571.214-2.714-.976-5.533-3.073-7.281-1.795-1.495-4.009-2.214-6.314-2.049m1.892 1.576a7.51 7.51 0 0 1 1.525.444c.495.21 1.022.503 1.005.56-.006.022-.968 1.281-2.137 2.797a1278.066 1278.066 0 0 0-2.172 2.823c-.04.056-.005.097.238.283l.285.217-.368.012-.368.011V19.2h-.11c-.19-.001-1.026-.189-1.416-.319a8.894 8.894 0 0 1-1.447-.667c-1.591-.956-2.841-2.631-3.28-4.394-.178-.714-.206-.963-.206-1.82 0-.857.028-1.106.206-1.82.618-2.481 2.709-4.572 5.193-5.194a9.155 9.155 0 0 1 1.12-.203c.266-.037 1.615.014 1.932.073m4.074 2.214c1.041 1.15 1.687 2.514 1.874 3.96l.028.21H16.38c-1.554 0-2.821-.015-2.813-.032.025-.061 3.413-4.447 3.435-4.447.013-.001.149.139.304.309m1.877 5.9c-.201 1.543-.945 3.029-2.085 4.166a7.17 7.17 0 0 1-3.652 1.966 5.178 5.178 0 0 1-.576.098h-.11v-6.44h6.45z'
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
export default QuotaSVG;
