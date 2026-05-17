// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const MonitorTestSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-monitor-test';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M3.24 11v6.76h8v2.48H7v1.52h10v-1.52h-4.24v-4h-8V5.76h14.48v4.929c0 4.8-.002 4.927-.074 4.85L16.92 13.1l-2.275-2.471-.102-.111 1.138-1.139 1.138-1.139H11.24v5.579l1.122-1.119 1.123-1.12.167.188c.093.104 1.374 1.494 2.848 3.09l2.68 2.902h1.58V4.24H3.24z' />
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
export default MonitorTestSVG;
