// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const MicrophoneSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-microphone';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M8.47 3.47 7.24 4.7v7.6l1.23 1.23 1.23 1.23h4.6l1.23-1.23 1.23-1.23V4.7l-1.23-1.23-1.23-1.23H9.7zm5.97 1.03.739.74H13v1.52h2.24v1.48H13v1.52h2.24v1.941l-.77.769-.771.77h-3.398l-.771-.77-.77-.769V9.76H11V8.24H8.76V6.76H11V5.24H8.821l.739-.74.739-.74h3.402zM4.24 16.38v1.38h7v2.48H9v1.52h6v-1.52h-2.24v-2.48h7V15h-1.52v1.24H5.76V15H4.24z'
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
export default MicrophoneSVG;
