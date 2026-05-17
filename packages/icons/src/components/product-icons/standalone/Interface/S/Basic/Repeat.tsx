// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const RepeatSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-repeat';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M10.84 4.1 8.94 6l1.91 1.91 1.91 1.91V6.796l.15.024c2.371.382 4.279 1.989 5.013 4.223.236.721.293 1.1.293 1.957s-.057 1.236-.293 1.957c-.456 1.388-1.448 2.643-2.67 3.377a6.9 6.9 0 0 1-2.019.793c-.355.078-.531.091-1.234.091s-.879-.013-1.234-.091c-1.304-.285-2.368-.875-3.266-1.813a6.1 6.1 0 0 1-1.417-2.336c-.246-.736-.301-1.108-.3-2.018.002-.655.016-.847.092-1.2.293-1.365.932-2.47 1.982-3.43l.227-.207-.466-.582-.466-.581-.147.116c-.228.18-.86.834-1.107 1.144-.499.627-.956 1.48-1.234 2.305a7.54 7.54 0 0 0 .002 4.955 8 8 0 0 0 1.315 2.401c.3.367 1.024 1.064 1.38 1.327 1.515 1.118 3.415 1.672 5.212 1.518a7.4 7.4 0 0 0 1.907-.392c1.204-.405 2.186-1.032 3.101-1.979a7.36 7.36 0 0 0 1.755-2.88 7.58 7.58 0 0 0 0-4.95 7.78 7.78 0 0 0-3.056-3.983c-.795-.533-1.922-.986-2.852-1.146l-.578-.101-.089-.016-.011-1.54-.01-1.539z' />
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
export default RepeatSVG;
