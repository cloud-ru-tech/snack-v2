// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ShieldDatacenterSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-shield-datacenter';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.251 9.91c.012 5.141.02 5.695.08 5.939.163.653.482 1.282.895 1.763.503.585.534.603 4.304 2.491L12 21.841l3.47-1.738c3.77-1.888 3.801-1.906 4.304-2.491.413-.481.732-1.11.895-1.763.06-.244.068-.798.08-5.939l.013-5.67H3.238zM19.24 8.5v2.74h-3.48v-3H8.24v3H4.76V5.76h14.48zm-5 5.9v4.64l-1.12.56-1.12.56-1.12-.56-1.12-.56V9.76h4.48zM11 12v.76h2v-1.52h-2zm-2.76 3.521v2.76l-1.21-.606-1.21-.607-.321-.324c-.368-.37-.543-.67-.66-1.128-.071-.276-.079-.445-.079-1.582V12.76h3.48zm11-1.487c0 1.137-.008 1.306-.079 1.582-.117.458-.292.758-.66 1.128l-.321.324-1.21.607-1.21.606V12.76h3.48z'
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
export default ShieldDatacenterSVG;
