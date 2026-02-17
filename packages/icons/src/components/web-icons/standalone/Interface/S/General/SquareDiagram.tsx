// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SquareDiagramSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-square-diagram';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 12v8.76h17.52V3.24H3.24zm16-3.999v3.24l-1.409-.01-1.408-.011-1.202-2.109c-.66-1.159-1.21-2.108-1.221-2.108-.011 0-.821 1.405-1.8 3.122l-1.963 3.44-.183.318-.637-1.321-.637-1.321H6.77l-2.01-.001V4.76h14.48zm-4.447 3.4.772 1.359h3.675v6.48H4.76v-6.481l1.545.011 1.545.01 1.031 2.132c.567 1.173 1.046 2.134 1.065 2.136.019.003.934-1.573 2.034-3.5 1.1-1.928 2.009-3.505 2.02-3.505.011 0 .368.611.793 1.358'
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
export default SquareDiagramSVG;
