// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FingerprintSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-fingerprint';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M5.47 3.47 4.24 4.7v14.6l1.23 1.23 1.23 1.23h10.6l1.23-1.23 1.23-1.23V4.7l-1.23-1.23-1.23-1.23H6.7zm12 1.06.77.771v13.4l-.77.769-.771.77H7.301l-.771-.77-.77-.769v-13.4l.77-.771.769-.77h9.402zM8.24 9.12V12h1.52V7.76h4.48V10h1.52V6.24H8.24zm3 2.88v3h1.52V9h-1.52zm3 2.38v1.86H9.76v-1.72H8.24v3.24h7.52v-5.24h-1.52z'
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
export default FingerprintSVG;
