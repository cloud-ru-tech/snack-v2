// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const AttachmentSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-attachment';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m9.97 3.97-.73.731v11.6l.73.729.731.73h2.6l.729-.73.73-.731V7h-1.52v8.702l-.271.269-.271.269h-1.4l-.269-.271-.269-.271v-10.4l.271-.269.271-.269h4.4l.269.271.269.271v12.399l-.77.769-.771.77H9.301l-.771-.77-.77-.769V7H6.24v11.3l1.23 1.23 1.23 1.23h6.6l1.23-1.23 1.23-1.23V4.699l-.73-.729-.731-.73h-5.6z'
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
export default AttachmentSVG;
