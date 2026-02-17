// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const AiInConstructionSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-ai-in-construction';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M8.25 2.184c-.022.042-.404.925-.848 1.963l-.808 1.887-1.937.83c-1.065.456-1.937.84-1.937.853 0 .013.859.391 1.91.839 1.05.449 1.93.836 1.954.86.024.024.409.899.854 1.944.446 1.045.822 1.912.836 1.927.014.015.402-.853.862-1.928l.836-1.955 1.924-.825a75.068 75.068 0 0 0 1.951-.852c.015-.015-.851-.403-1.925-.862L9.97 6.031l-.84-1.962c-.684-1.596-.848-1.947-.88-1.885M12 4v.76h7.24v14.48h-6.48v-4H7.24v4H4.76v-8.8H3.24v10.32h17.52V3.24H12zM8.566 6.567l.259.608.608.259c.334.142.607.27.607.283 0 .014-.273.141-.606.284l-.607.259-.26.61c-.143.335-.27.61-.283.609-.013 0-.141-.274-.284-.609l-.26-.608-.61-.26c-.335-.143-.61-.271-.61-.285 0-.013.275-.141.61-.284l.61-.26.259-.607c.143-.333.27-.606.284-.606.013 0 .141.273.283.607m6.683 1.183.011.75h1.48l.011-.75.011-.75h-1.524zm0 4 .011.75h1.48l.011-.75.011-.75h-1.524zm0 4 .011.75h1.48l.011-.75.011-.75h-1.524zM11.24 18v1.24H8.76v-2.48h2.48z'
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
export default AiInConstructionSVG;
