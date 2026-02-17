// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DropSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-drop';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M8.36 4.484a469.561 469.561 0 0 0-3.976 2.357c-.047.045.667 1.259.741 1.259.03 0 1.67-.951 3.645-2.114l3.589-2.114 3.431 2.021 3.43 2.021v8.177l-3.42 2.014c-1.881 1.108-3.445 2.005-3.476 1.994-.031-.012-1.649-.959-3.595-2.105-1.947-1.147-3.566-2.087-3.598-2.089-.036-.003-.201.235-.421.608-.306.517-.353.62-.306.663.031.028.641.394 1.356.813.715.419 2.492 1.465 3.949 2.323l2.649 1.56 4.191-2.467 4.191-2.468V7.068l-4.16-2.453c-2.288-1.348-4.187-2.452-4.22-2.452-.033 0-1.833 1.044-4 2.321m3.88 5.496v1.26H8.76v-2H3.24v5.52h5.52v-2h3.48v1.26c0 .693.014 1.26.03 1.26.017 0 .768-.738 1.67-1.64L15.58 12l-1.64-1.64c-.902-.902-1.653-1.64-1.67-1.64-.016 0-.03.567-.03 1.26' />
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
export default DropSVG;
