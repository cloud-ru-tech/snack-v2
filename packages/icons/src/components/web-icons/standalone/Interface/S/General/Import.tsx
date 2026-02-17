// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ImportSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-import';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m4.469 4.471-1.23 1.231.01 1.399L3.26 8.5h1.48l.011-1.1.01-1.1.769-.77.769-.77h11.4l.771.77.77.769v11.402l-.77.769-.771.77H6.301l-.771-.77-.77-.769V15.52H3.24v2.78l1.23 1.23 1.23 1.23h12.6l1.23-1.23 1.23-1.23V5.7l-1.23-1.23-1.23-1.23H5.7zM10.24 8.71v2.53l-3.37.01-3.37.01v1.48l3.37.01 3.37.01v5.06l2.91-2.91L16.06 12l-2.91-2.91-2.91-2.91zm2.61 4.38-1.09 1.09V9.82l1.09 1.09L13.94 12z'
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
export default ImportSVG;
