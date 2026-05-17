// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const EnvelopeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-envelope';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.258 3.29c-.01.027-.014 3.965-.008 8.75l.01 8.7 8.75.01 8.75.01V3.24h-8.741c-6.956 0-8.745.01-8.761.05m15.98 2.9-.002 1.43-3.62 2.485-3.62 2.485-3.617-2.485L4.762 7.62l-.001-1.43-.001-1.43h14.48zM6.977 10.959c.592.408 1.082.759 1.09.781.007.022-.734.787-1.647 1.7L4.76 15.1V9.435l.57.392zm12.254 2.724-.011 1.397-1.67-1.67-1.671-1.671 1.671-1.147 1.67-1.148.011 1.421c.005.782.005 2.05 0 2.818m-8.541-.167c.677.466 1.253.855 1.28.865s.635-.386 1.35-.879l1.3-.898 2.31 2.308 2.31 2.308v2.02H4.76v-2.02l2.308-2.308c1.424-1.424 2.324-2.296 2.35-2.276.023.018.596.414 1.272.88'
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
export default EnvelopeSVG;
