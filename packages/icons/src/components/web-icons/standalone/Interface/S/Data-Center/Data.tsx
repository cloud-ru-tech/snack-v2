// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DataSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-data';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M5.203 4.291c-.67.577-1.254 1.098-1.298 1.158a.7.7 0 0 0-.097.349c-.015.204-.002.265.087.417.12.205.301.331.529.367.305.049.437-.024 1.138-.624l.658-.563.02 2.499.02 2.499.12.17a.744.744 0 0 0 1.24 0l.12-.17.011-3.576.011-3.577-.671.001-.671.001zM10.25 7.07l.01 3.83h5.48l.01-3.83.01-3.83h-5.52zm7.953-2.779c-.67.577-1.254 1.098-1.298 1.158a.7.7 0 0 0-.097.349c-.015.204-.002.265.087.417.12.205.301.331.529.367.305.049.437-.024 1.138-.624l.658-.563.02 2.499.02 2.499.12.17a.744.744 0 0 0 1.24 0l.12-.17.011-3.576.011-3.577-.671.001-.671.001zM14.24 7.08V9.4h-2.48V4.76h2.48zm3.931 7.081c-.665.571-1.24 1.086-1.278 1.144-.107.164-.118.529-.022.718a.64.64 0 0 0 .379.355.74.74 0 0 0 .564.007c.072-.03.418-.299.768-.599l.638-.544.02 2.489c.022 2.749.009 2.615.28 2.843.409.344 1.056.146 1.198-.365.027-.097.042-1.355.042-3.619v-3.47l-.69.001-.69.001zM3.24 17v3.76h5.52v-7.52H3.24zm7 0v3.76h5.52v-7.52h-5.52zm-3 0v2.24H4.76v-4.48h2.48zm7 0v2.24h-2.48v-4.48h2.48z'
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
export default DataSVG;
