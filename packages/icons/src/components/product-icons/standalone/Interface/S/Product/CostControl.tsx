// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CostControlSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-cost-control';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M5.84 4.283c-.985.105-1.921.72-2.316 1.521-.299.606-.283.226-.283 6.696l-.001 5.801.73.729.731.73h14.6l.729-.73.73-.731v-9.6l-.73-.729-.731-.73H17.76V5.699l-.73-.729-.731-.73-5.079.005c-2.794.003-5.215.02-5.38.038m10.129 1.746.271.269v.942H4.76v-.278c0-.153.022-.329.048-.39.138-.32.482-.6.902-.734.218-.07.49-.074 5.109-.076l4.879-.002zm3 3 .271.269v8.4l-.269.271-.269.271h-13.4l-.271-.269-.271-.269V8.76h13.938zm-2.692 3.253c-.776.126-1.241 1.005-.91 1.721a1.24 1.24 0 0 0 2.266 0c.08-.172.104-.287.104-.503 0-.775-.684-1.345-1.46-1.218' />
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
export default CostControlSVG;
