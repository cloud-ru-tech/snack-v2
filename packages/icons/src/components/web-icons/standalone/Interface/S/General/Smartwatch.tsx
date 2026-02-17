// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SmartwatchSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-smartwatch';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m7.905 3.91-.554 1.67-1.055 1.06L5.24 7.701v8.598l1.056 1.061 1.055 1.06.554 1.67.554 1.67h7.082l.554-1.67.554-1.67 1.055-1.06 1.056-1.061V10.76H20V9.24h-1.24V7.701L17.704 6.64l-1.055-1.06-.554-1.67-.554-1.67H8.459zm6.802.59.246.74H9.047l.246-.74.246-.74h4.922zm1.763 3.03.77.771v7.398l-.77.771-.769.77h-7.4l-.771-.77-.77-.769v-7.4l.77-.771.769-.77h7.402zM9 15v.76h6v-1.52H9zm5.707 4.5-.246.74H9.539l-.246-.74-.246-.74h5.906z'
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
export default SmartwatchSVG;
