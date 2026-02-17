// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DotBigLineSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-dot-big-line';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.52 6.282a5.68 5.68 0 0 0-3.576 1.662c-.817.816-1.342 1.8-1.587 2.976-.125.596-.125 1.564 0 2.16.245 1.176.77 2.16 1.587 2.976.816.817 1.8 1.342 2.976 1.587.334.07.555.088 1.08.088s.746-.018 1.08-.088c1.176-.245 2.16-.77 2.976-1.587.817-.816 1.342-1.8 1.587-2.976.07-.334.088-.555.088-1.08s-.018-.746-.088-1.08c-.246-1.178-.771-2.162-1.588-2.976a5.685 5.685 0 0 0-4.535-1.662m1.218 1.541a4.247 4.247 0 0 1 3.442 3.458c.366 2.079-.878 4.114-2.921 4.774-.756.245-1.762.245-2.518 0-1.531-.495-2.646-1.763-2.918-3.317-.327-1.868.604-3.695 2.317-4.548a4.263 4.263 0 0 1 2.598-.367'
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
export default DotBigLineSVG;
