// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const MonitorTest1SVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-monitor-test1';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 10v6.76h8v2.48H7v1.52h10v-1.52h-4.24v-2.48h8V3.24H3.24zm16 0v5.24H4.76V4.76h14.48zM7.7 8.24 5.94 10l1.76 1.76 1.759 1.76.531-.53.53-.529-1.23-1.231L8.06 10 9.3 8.76l1.239-1.24L10.02 7a9.5 9.5 0 0 0-.54-.52c-.011 0-.812.792-1.78 1.76M13.98 7l-.519.52L14.7 8.76 15.94 10l-1.23 1.23-1.23 1.231.53.529.531.53 1.759-1.76L18.06 10 16.3 8.24c-.968-.968-1.769-1.76-1.78-1.76a9.5 9.5 0 0 0-.54.52'
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
export default MonitorTest1SVG;
