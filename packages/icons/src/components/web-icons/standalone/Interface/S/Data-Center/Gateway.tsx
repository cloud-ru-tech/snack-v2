// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const GatewaySVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-gateway';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M3.24 7.122v3.881l-.16.167c-.446.464-.425 1.233.046 1.704.781.781 2.114.23 2.114-.874 0-.312-.119-.621-.32-.83l-.16-.167V4.76h14.48V8h1.52V3.24H3.24zm4 4.878v4.76h9.52V7.24H7.24zm5-2v1.24H8.76V8.76h3.48zm3 0v1.24h-1.48V8.76h1.48zm4.346.82c-.191.073-.42.24-.564.411-.368.437-.341 1.184.058 1.599l.16.167v6.243H4.76V16H3.24v4.76h17.52v-7.763l.16-.167c.435-.452.425-1.228-.021-1.681-.26-.263-.493-.366-.859-.378a1.3 1.3 0 0 0-.454.049M10.24 14v1.24H8.76v-2.48h1.48zm5 0v1.24h-3.48v-2.48h3.48z' />
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
export default GatewaySVG;
