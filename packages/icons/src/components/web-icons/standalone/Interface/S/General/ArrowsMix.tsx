// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ArrowsMixSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-arrows-mix';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M18.24 4.21v1.03l-1.57.001-1.57.001-1.8 2.697-1.8 2.696-.082-.098c-.046-.055-.865-1.269-1.82-2.698L7.86 5.241 5.93 5.24H4v1.52h3.065l1.756 2.62L10.577 12l-1.756 2.62-1.756 2.62H4v1.52h3.86l1.737-2.598a204 204 0 0 1 1.82-2.698l.083-.099 1.8 2.696 1.8 2.697 1.57.001 1.57.001v2.06l1.41-1.41L21.06 18l-1.41-1.41-1.41-1.41v2.06h-2.344l-1.756-2.62L12.384 12l1.756-2.62 1.756-2.62h2.344v2.06l1.41-1.41L21.06 6l-1.41-1.41-1.41-1.41z'
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
export default ArrowsMixSVG;
