// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const NoPhoneSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-no-phone';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M8 4v.76h7.728l.754.77.754.77.002 4.35.002 4.35h1.52V5.714l-1.21-1.237-1.209-1.237H8zM3.98 4l-.519.52.889.89.89.891V18.3l1.23 1.23 1.23 1.23h8.599l.851-.85.85-.849.73.729.731.73.529-.53.53-.531-7.99-7.989C8.135 7.075 4.531 3.48 4.519 3.48c-.011 0-.254.234-.539.52m12.34 14.62-.619.62H8.299l-.769-.77-.77-.771V7.82l5.09 5.09L16.939 18zM11 17v.76h2v-1.52h-2z'
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
export default NoPhoneSVG;
