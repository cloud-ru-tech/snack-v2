// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const OperationSystemSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-operation-system';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M8.34 4.24 7.1 6.237l-1.93.001-1.93.002v11.48h8v2.52H7v1.52h10v-1.52h-4.24v-2.52h8V6.241l-1.967-.011-1.967-.01-1.203-1.99-1.203-1.989-2.42.001-2.42.001zm6.201 1.106c.527.873.959 1.617.959 1.654 0 .037-.432.781-.959 1.654l-.96 1.586H10.41l-.994-1.59C8.87 7.776 8.423 7.033 8.423 7c0-.033.447-.776.993-1.65l.994-1.59H13.581zm-3.09.246c-.577.231-.93.783-.882 1.379.03.366.16.632.434.886.576.533 1.377.498 1.923-.086.64-.684.368-1.84-.509-2.169-.275-.103-.723-.107-.966-.01m.542 1.163c.03.019.048.077.04.13-.01.071-.038.095-.113.095-.075 0-.103-.024-.113-.095-.012-.082.045-.164.113-.164.011 0 .044.015.073.034M8.34 9.76l1.24 1.997 2.42.001 2.42.001 1.203-1.989 1.203-1.99 1.207-.011 1.207-.01V16.2H4.76V7.76l1.17.002 1.17.001z'
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
export default OperationSystemSVG;
