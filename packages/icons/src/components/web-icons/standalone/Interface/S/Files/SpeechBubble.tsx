// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SpeechBubbleSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-speech-bubble';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M6.24 5.74v1.5h-3v11.52h3.94l1.64 1.64c.902.902 1.658 1.64 1.68 1.64.022 0 .778-.738 1.68-1.64l1.64-1.64h3.94v-3h3V4.24H6.24zm13 4.26v4.24h-1.48v-7h-10V5.76h11.48zm-3 3v4.24h-3.06l-1.34 1.34-1.34 1.34-1.34-1.34-1.34-1.34H4.76V8.76h11.48zM7 11.5v.74h7v-1.48H7zm0 3v.74h7v-1.48H7z'
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
export default SpeechBubbleSVG;
