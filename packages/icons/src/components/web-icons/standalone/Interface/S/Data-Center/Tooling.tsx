// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ToolingSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-tooling';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M8.01 5.41 5.84 7.58v5.2l-1.3 1.3-1.3 1.3v1.88l1.75 1.75 1.75 1.75h1.854l1.513-1.299 1.513-1.299 2.4-.001 2.4-.001 2.17-2.17 2.17-2.17V8.88h-2.38l-1.52 1.52-1.52 1.52h-.206c-.242 0-.112.122-1.648-1.552l-.966-1.053.001-.247V8.82l1.519-1.56 1.519-1.56.001-1.23V3.24h-5.38zm6.03-.473v.176l-1.498 1.534-1.499 1.533-.001.872-.002.872 1.59 1.735 1.59 1.735.88.003.88.003 1.52-1.52c1.264-1.264 1.538-1.52 1.63-1.52h.11v2.86l-1.73 1.73-1.73 1.73h-4.733l-1.494 1.28-1.493 1.28h-.72l-1.29-1.29-1.29-1.29v-.68l1.3-1.3 1.3-1.3v-5.2l1.71-1.71 1.71-1.71h3.26z'
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
export default ToolingSVG;
