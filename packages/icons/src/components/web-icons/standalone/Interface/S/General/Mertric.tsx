// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const MertricSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-mertric';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M16.52 4.269c0 .017.326.356.724.755.705.706.723.728.67.824-.03.054-.566.939-1.191 1.965L15.586 9.68H14.37l-1.495-1.99L11.38 5.7l-1.42-.01-1.42-.011-1.5 3.001-1.5 3H4v1.52h2.46l1.5-3 1.5-3h1.17l1.495 1.998 1.495 1.999 1.4.001 1.4.002 1.314-2.16c.723-1.188 1.326-2.16 1.34-2.16s.324.297.686.66.673.66.69.66.026-.886.02-1.97l-.01-1.97-1.97-.01c-1.083-.006-1.97.003-1.97.019m2.72 10.511v4.66h1.52v-9.32h-1.52zm-10 .16v4.5h1.52v-9H9.24zm5 1.5v3h1.52v-6h-1.52zm-10 1v2h1.52v-4H4.24z'
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
export default MertricSVG;
