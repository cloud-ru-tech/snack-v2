// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BridgeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-bridge';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 12v8.76h17.52V3.24H3.24zm16 0v7.24H4.76V4.76h14.48zm-13 0v5h1.514l.016-1.33c.015-1.202.025-1.362.103-1.66a4.435 4.435 0 0 1 3.157-3.14c.502-.127 1.438-.127 1.94 0 1.516.383 2.763 1.623 3.157 3.14.077.297.087.463.103 1.66l.017 1.33h1.513V7h-1.52v4.125l-.322-.292c-.884-.802-1.925-1.323-2.992-1.497a7.088 7.088 0 0 0-1.852 0c-1.067.174-2.108.695-2.992 1.497l-.322.292V7H6.24z'
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
export default BridgeSVG;
