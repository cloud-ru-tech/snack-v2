// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const AgentMemorySVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-agent-memory';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.252 4.432 5.764 5.62l-.002 1.006-.002 1.006L4.5 8.64 3.24 9.648v4.704L4.5 15.36l1.26 1.008v1.987l1.49 1.201 1.49 1.202h6.52l1.49-1.202 1.49-1.201v-1.987l1.26-1.008 1.26-1.008V9.648L19.5 8.64l-1.26-1.008-.002-1.006-.002-1.006-1.493-1.19-1.493-1.19-3.255.002-3.255.001zM11.24 9.79v5.029l-.89.891-.889.89.529.53.529.529.361-.359.36-.358v2.298H9.252l-1.006-.809-1.006-.809v-1.355l.876-1.168.876-1.168-1.236-1.235L6.52 11.46l-.53.53-.529.53.774.775.775.776-.312.414-.323.43c-.006.008-.372-.271-.811-.62l-.8-.635v-3.32l.701-.556.702-.557 1.147 1.147 1.147 1.146.529-.53.53-.531L8.38 9.32 7.24 8.181V6.368l1.005-.804L9.25 4.76h1.99zm4.515-4.226 1.005.804V8.181L15.62 9.32l-1.14 1.139.53.531.529.53 1.147-1.146 1.147-1.147.702.557.701.556v3.32l-.8.635c-.439.349-.805.628-.811.62l-.323-.43-.312-.414.775-.776.774-.775-.529-.53-.53-.53-1.236 1.236-1.236 1.235.876 1.168.876 1.168v1.355l-1.006.809-1.006.809H12.76V9.421l.95-.951.949-.95-.529-.53-.529-.529-.421.419-.42.419V4.76h1.99z'
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
export default AgentMemorySVG;
