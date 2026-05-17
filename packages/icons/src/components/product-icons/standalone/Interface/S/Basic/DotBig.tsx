// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DotBigSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-dot-big';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.52 6.282a5.68 5.68 0 0 0-3.576 1.662c-.817.816-1.342 1.8-1.587 2.976-.125.596-.125 1.564 0 2.16.245 1.176.77 2.16 1.587 2.976.816.817 1.8 1.342 2.976 1.587.334.07.555.088 1.08.088s.746-.018 1.08-.088c1.176-.245 2.16-.77 2.976-1.587.817-.816 1.342-1.8 1.587-2.976.07-.334.088-.555.088-1.08s-.018-.746-.088-1.08c-.246-1.178-.771-2.162-1.588-2.976a5.69 5.69 0 0 0-4.535-1.662'
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
export default DotBigSVG;
