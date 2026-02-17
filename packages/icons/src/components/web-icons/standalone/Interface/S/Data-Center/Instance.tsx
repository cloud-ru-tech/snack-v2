// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const InstanceSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-instance';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 5.62V8h1.52V4.76H8V3.24H3.24zM16 4v.76h3.24V8h1.52V3.24H16zM3.97 11.97l-.73.731v6.6l.73.729.731.73h6.6l.729-.73.73-.731v-6.6l-.73-.729-.731-.73h-6.6zm6.999 1.059.271.269v5.4l-.269.271-.269.271h-5.4l-.271-.269-.271-.269v-5.4l.269-.271.269-.271h5.4zm8.271 4.591v1.62H16v1.52h4.76V16h-1.52z'
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
export default InstanceSVG;
