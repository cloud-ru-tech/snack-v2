// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DocumentCheckSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-document-check';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.47 4.47 3.24 5.7v12.6l1.23 1.23 1.23 1.23H12v-1.52H6.301l-.771-.77-.77-.769V6.299l.77-.769.771-.77h11.398l.771.77.77.769v6.581h1.52V5.7l-1.23-1.23-1.23-1.23H5.7zm3.028 2.821c-.011.029-.015.366-.009.75l.011.699h9V7.26l-4.491-.01c-3.637-.008-4.495-.001-4.511.041m0 4c-.011.029-.015.366-.009.75l.011.699h9v-1.48l-4.491-.01c-3.637-.008-4.495-.001-4.511.041M18.962 16.7c-1.08 1.199-1.976 2.18-1.992 2.18s-.687-.657-1.49-1.46l-1.461-1.46-.529.53-.53.531 2.034 2.033 2.034 2.034 2.506-2.783a332 332 0 0 0 2.506-2.8c0-.023-1.069-.985-1.094-.985-.012 0-.904.981-1.984 2.18'
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
export default DocumentCheckSVG;
