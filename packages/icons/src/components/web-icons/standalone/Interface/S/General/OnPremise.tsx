// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const OnPremiseSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-on-premise';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.59 5.691 3.24 8.219V19.76h3.461l.499.5.499.5h8.602l.499-.5.499-.5h3.461V8.219l-4.358-2.53c-2.397-1.391-4.382-2.528-4.41-2.527S9.982 4.301 7.59 5.691m8.072 1.299 3.574 2.07.002 4.59.002 4.59h-1.48v-1.538l-.349-.351-.349-.351.349-.351.349-.351v-2.597l-.73-.731-.729-.73h-8.6l-.731.73-.73.729v2.599l.349.351.349.351-.349.351-.349.351v1.538H4.76l.002-4.59.001-4.59 3.609-2.09c1.984-1.149 3.632-2.081 3.662-2.07s1.662.952 3.628 2.09m.307 6.039.271.269v1.4l-.269.271-.269.271h-7.4l-.271-.269-.271-.269v-1.4l.269-.271.269-.271h7.4zm0 4 .271.269v1.4l-.269.271-.269.271h-7.4l-.271-.269-.271-.269v-1.4l.269-.271.269-.271h7.4z'
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
export default OnPremiseSVG;
