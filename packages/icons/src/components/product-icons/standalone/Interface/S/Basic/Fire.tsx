// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FireSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-fire';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.368 7.229 4.24 11.778v.704c0 .387.019.901.043 1.141.344 3.484 2.834 6.281 6.212 6.976 1.979.407 4.08-.015 5.791-1.163a7.89 7.89 0 0 0 3.289-4.906c.133-.635.185-1.208.185-2.047v-.703l-2.59-3.741c-1.425-2.058-2.605-3.747-2.624-3.753s-.392.44-.829.992l-.794 1.005-1.202-1.801a116 116 0 0 0-1.214-1.802c-.006 0-1.419 2.047-3.139 4.549m4.307-.119c.619.93 1.139 1.689 1.155 1.688s.389-.459.828-1.017c.777-.99.799-1.014.86-.929l1.891 2.728 1.83 2.64v.56c-.001 1.531-.437 2.861-1.32 4.021-.386.508-1.06 1.133-1.574 1.461-.113.073-.115.073-.091-.004.118-.374.141-1.165.048-1.61a5 5 0 0 0-.162-.552c-.1-.265-3.091-5.576-3.14-5.576-.05 0-3.041 5.311-3.14 5.575-.057.152-.13.401-.162.553-.093.445-.07 1.236.048 1.61.024.077.022.077-.091.004-.517-.33-1.188-.954-1.58-1.468-.878-1.154-1.313-2.482-1.314-4.014v-.56l2.269-3.3c2.679-3.896 2.452-3.574 2.49-3.533.017.018.537.793 1.155 1.723m1.2 7.951c.47.826.881 1.587.914 1.69.085.268.086.894.002 1.169-.149.487-.638 1.021-1.109 1.209-.321.129-1.043.129-1.364 0-.471-.188-.96-.722-1.109-1.209-.084-.275-.083-.901.002-1.168.059-.185 1.743-3.192 1.788-3.192.013 0 .407.676.876 1.501'
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
export default FireSVG;
