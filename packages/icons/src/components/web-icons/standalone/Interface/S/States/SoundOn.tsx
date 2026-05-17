// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SoundOnSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-sound-on';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M10.224 5.559 7.708 7.76H4.24v8.48h3.468l2.516 2.201 2.516 2.201.01-4.321c.006-2.377.006-6.265 0-8.642l-.01-4.321zM15 7.005v.755h.19c.105 0 .342.027.529.06a4.245 4.245 0 0 1 3.461 3.461c.366 2.079-.878 4.114-2.921 4.774-.297.097-.796.185-1.043.185H15v1.524l.35-.026a5.8 5.8 0 0 0 3.706-1.682c.817-.816 1.342-1.8 1.587-2.976.07-.334.088-.555.088-1.08s-.018-.746-.088-1.08c-.246-1.178-.771-2.162-1.588-2.976-1.031-1.028-2.288-1.586-3.785-1.678L15 6.249zm-3.77 7.656-.01 2.661-1.46-1.28-1.46-1.279-1.27-.002-1.27-.001V9.24l1.27-.001 1.27-.002 1.46-1.279 1.46-1.28.01 2.661c.006 1.464.006 3.858 0 5.322M15 9.998v.752l.176.019c.376.043.769.334.951.703.133.27.133.787 0 1.057-.189.383-.654.711-1.009.711H15v1.529l.27-.028a2.72 2.72 0 0 0 1.666-.805c.335-.335.546-.676.692-1.116.091-.277.105-.387.105-.82s-.014-.543-.105-.82a2.76 2.76 0 0 0-2.398-1.914l-.23-.02z'
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
export default SoundOnSVG;
