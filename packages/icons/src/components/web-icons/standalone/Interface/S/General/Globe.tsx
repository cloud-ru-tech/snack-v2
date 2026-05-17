// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const GlobeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-globe';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.34 3.281A8.68 8.68 0 0 0 5.819 5.82c-1.344 1.343-2.192 3.027-2.485 4.94-.096.63-.096 1.85 0 2.48.398 2.594 1.87 4.839 4.07 6.205 1.518.943 3.456 1.42 5.206 1.282 2.156-.17 4.069-1.044 5.571-2.546s2.376-3.415 2.546-5.571c.214-2.714-.976-5.533-3.073-7.281-1.795-1.495-4.014-2.215-6.314-2.048m-.1 2.969V7.7L9.97 8.97 8.7 10.24H4.965l.077-.278c.644-2.325 2.726-4.359 5.078-4.963.39-.1.849-.188 1.01-.195l.11-.004zm2.234-1.345a7.26 7.26 0 0 1 3.667 2.004c1.317 1.327 2.099 3.181 2.099 4.973v.358H14.7l-1.73 1.73-1.73 1.73v3.5h-.11c-.06 0-.32-.044-.576-.098a7.17 7.17 0 0 1-3.645-1.958c-1.334-1.334-2.057-2.962-2.137-4.814l-.024-.57H9.3l1.73-1.73 1.73-1.73V4.79l.21.027c.115.015.342.055.504.088m5.481 9.145c-.287 1.039-.991 2.214-1.835 3.062a7.15 7.15 0 0 1-3.674 1.99 5 5 0 0 1-.576.098h-.11v-2.9l1.27-1.27 1.27-1.27h3.735z'
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
export default GlobeSVG;
