// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CloudChartSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-cloud-chart';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M12.023 4.285c-1.005.08-2.027.513-2.864 1.212C7.962 6.498 7.24 8.103 7.24 9.764V10h1.509l.023-.51c.014-.305.056-.633.104-.816.353-1.357 1.322-2.381 2.632-2.781.319-.097.412-.107.992-.107s.673.01.992.107c1.292.395 2.241 1.382 2.613 2.718.085.306.107.493.129 1.089l.026.72.7.023c.79.026 1.031.075 1.554.319 1.915.895 2.744 3.188 1.883 5.211-.373.876-1.209 1.691-2.075 2.021-.623.238-.717.246-2.98.246H13.28v1.526l2.17-.018c1.348-.012 2.255-.036 2.394-.063 1.136-.224 2.121-.755 2.878-1.55.823-.865 1.31-1.879 1.481-3.09.065-.455.025-1.402-.077-1.865-.262-1.181-.832-2.167-1.698-2.935a6 6 0 0 0-1.184-.804c-.31-.155-.99-.382-1.264-.422-.239-.035-.3-.077-.3-.207 0-.133-.143-.688-.265-1.032a5.38 5.38 0 0 0-3.359-3.28c-.593-.194-1.326-.271-2.033-.215M4.24 14.88v4.88h1.52V10H4.24zm3 1v3.88h1.52V12H7.24zm3 1v2.88h1.52V14h-1.52z'
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
export default CloudChartSVG;
