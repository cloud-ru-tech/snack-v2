// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const InlineCodeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-inline-code';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M13.26 4.85c-.075.214-3.975 13.928-3.965 13.939.042.041 1.406.405 1.427.381.034-.04 4-13.941 3.983-13.959a45 45 0 0 0-1.416-.411c-.006 0-.019.022-.029.05M4.7 10.24 2.94 12l1.77 1.77 1.77 1.77.53-.53.53-.53-1.24-1.24L5.06 12l1.24-1.24 1.239-1.24L7.02 9a10 10 0 0 0-.54-.52c-.011 0-.812.792-1.78 1.76m12.31-1.23-.53.53 1.23 1.23L18.94 12l-1.23 1.23-1.23 1.231.53.529.531.53 1.759-1.76L21.06 12l-1.76-1.76-1.76-1.76z'
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
export default InlineCodeSVG;
