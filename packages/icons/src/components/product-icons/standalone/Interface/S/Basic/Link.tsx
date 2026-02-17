// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const LinkSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-link';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M13.98 4.44 12.021 6.4l.539.54.539.54 1.701-1.7 1.7-1.7 1.71 1.71 1.71 1.71-3.41 3.408-3.41 3.407-.899-.858c-.495-.471-.911-.853-.925-.847a13.31 13.31 0 0 0-.528.532l-.502.523 1.182 1.127 1.183 1.128h1.049l3.93-3.93 3.93-3.93V6.94l-2.23-2.23-2.23-2.23h-1.12zm-3.645 3.669c-.105.013-.739.637-3.98 3.921L2.5 15.935l-.011.561-.011.561 2.231 2.232L6.94 21.52h1.12l1.96-1.96 1.959-1.96-.519-.52c-.285-.286-.537-.52-.559-.52-.022 0-.797.756-1.721 1.68L7.5 19.92l-1.718-1.718-1.717-1.717 2.478-2.507c1.362-1.379 2.873-2.912 3.357-3.407l.88-.898.895.853c.492.47.907.859.923.865.017.006.257-.23.536-.525l.505-.536-1.176-1.125-1.177-1.125-.413.006a7.836 7.836 0 0 0-.538.023'
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
export default LinkSVG;
