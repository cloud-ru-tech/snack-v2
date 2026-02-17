// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const OrganizationSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-organization';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.24 4.12v1.12h-4v3h-4v12.52h17.52V8.24h-4v-3h-4V3h-1.52zm4 3.38v.74H8.76V6.76h6.48zm4 7v4.74H4.76V9.76h14.48zM7.249 12.51l.011.99h1.48l.011-.99.01-.99H7.239zm4 0 .011.99h1.48l.011-.99.01-.99h-1.522zm4 0 .011.99h1.48l.011-.99.01-.99h-1.522zm-8 4 .011.99h1.48l.011-.99.01-.99H7.239zm4 0 .011.99h1.48l.011-.99.01-.99h-1.522zm4 0 .011.99h1.48l.011-.99.01-.99h-1.522z'
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
export default OrganizationSVG;
