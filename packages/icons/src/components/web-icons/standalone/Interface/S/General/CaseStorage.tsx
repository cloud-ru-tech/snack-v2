// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CaseStorageSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-case-storage';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M7.24 4.74v1.5h-4v14.52h5.12v-1.52h-3.6v-5.48H8.6v-1.52H4.76V7.76h14.479l.01 1.33.011 1.33h1.48l.01-2.09.011-2.09H16.76v-3H7.24zm8 .76v.74H8.76V4.76h6.48zM11 9.68v.76h2V8.92h-2zm-.013 3.21-.746.65v1.205l-.001 1.205.306.274.305.273-.306.282-.307.281.002 1.2.001 1.2.746.65.746.65h7.534l.746-.65.746-.65v-1.205l.001-1.205-.306-.274-.305-.273.306-.282.307-.281-.002-1.2-.001-1.2-.746-.65-.746-.65h-7.534zm7.999 1.093.254.224v1.094l-.268.23-.268.229h-6.408l-.268-.229-.268-.23v-1.093l.25-.223.25-.223 3.236-.001 3.235-.001zm-.014 3.486.268.23v1.094l-.254.224-.255.223h-6.462l-.255-.223-.254-.224v-1.094l.268-.23.268-.229h6.408z' />
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
export default CaseStorageSVG;
