// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ServerSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-server';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m3.97 3.97-.73.731v3.597l.349.351.349.351-.349.351-.349.351v4.596l.349.351.349.351-.349.351-.349.351v3.599l.73.729.731.73h14.6l.729-.73.73-.731v-3.597l-.349-.351-.349-.351.349-.351.349-.351V9.702l-.349-.351L20.062 9l.349-.351.349-.351V4.699l-.73-.729-.731-.73h-14.6zm14.999 1.059.271.269v2.4l-.269.271-.269.271h-13.4l-.271-.269-.271-.269v-2.4l.269-.271.269-.271h13.4zM7 6.5v.74h1.52V5.76H7zm5 0v.74h5.56V5.76H12zm6.969 3.529.271.269v3.4l-.269.271-.269.271h-13.4l-.271-.269-.271-.269v-3.4l.269-.271.269-.271h13.4zM7 12v.762l.75-.011.75-.011v-1.48l-.75-.011-.75-.011zm5 0v.761l2.77-.011 2.77-.01v-1.48l-2.77-.01-2.77-.011zm6.969 4.029.271.269v2.4l-.269.271-.269.271h-13.4l-.271-.269-.271-.269v-2.4l.269-.271.269-.271h13.4zM7 17.5v.74h1.52v-1.48H7zm5 0v.74h5.56v-1.48H12z'
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
export default ServerSVG;
